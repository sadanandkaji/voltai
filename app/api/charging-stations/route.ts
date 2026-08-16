// app/api/charging-stations/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import crypto from "crypto";
import { webSearch } from "../../lib/search";
import { cleanHtml } from "../../lib/clean";
import { aicredits } from "../../lib/aicredits";
import { pLimit, retryWithBackoff } from "../../lib/limit";
import { prisma } from "../../lib/prisma";

interface RawSource {
  url: string;
  title: string;
  text: string;
  success: boolean;
}

interface RoutePoint {
  lat: number;
  lon: number;
}

interface GeoCenter {
  lat: number;
  lon: number;
  radiusKm?: number;
}

interface RouteSegment {
  index: number;
  midpoint: RoutePoint;
  points: RoutePoint[];
  startKm: number;
  endKm: number;
  radiusKm: number;
}

interface LocalityInfo {
  specific: string | null;
  broad: string | null;
}

// ── Known Indian EV charging network providers ─────────────────────────────
interface ProviderConfig {
  name: string;
  domain: string;
  apiUrl?: (lat: number, lon: number, radiusKm: number) => string;
}

const PROVIDERS: ProviderConfig[] = [
  { name: "Statiq",        domain: "statiq.in" },
  { name: "Tata Power EZ", domain: "tatapower.com" },
  { name: "ChargeZone",    domain: "chargezone.in" },
  { name: "Ather Grid",    domain: "atherenergy.com" },
  { name: "Jio-bp Pulse",  domain: "jiobp.com" },
  { name: "Kazam",         domain: "kazam.in" },
  { name: "Zeon",          domain: "zeon.club" },
  { name: "PlugShare",     domain: "plugshare.com" },
  { name: "ChargeGrid",    domain: "chargegrid.in" },
];

const legacyTlsAgent = new https.Agent({
  minVersion: "TLSv1",
  rejectUnauthorized: true,
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const segmentLimit = pLimit(3);
const crawlLimit   = pLimit(4);
const aiLimit      = pLimit(2);

const STATION_CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
// Empty-result TTL kept short — an empty result is very often caused by a
// transient upstream failure (search-provider budget errors, rate limits,
// etc.) rather than "there really is nothing here". A long TTL on an empty
// result just re-serves that false negative for the rest of the day.
const EMPTY_RESULT_TTL_MS  = 30 * 60 * 1000; // 30 minutes

async function crawlOne(url: string, title: string, snippet: string): Promise<RawSource> {
  return crawlLimit(async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await axios.get(url, {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      });
      clearTimeout(timeout);
      const text = cleanHtml(res.data);
      return { url, title, text: text.length > 100 ? text : snippet, success: true };
    } catch (err: any) {
      const isTlsError = /ssl|tls|handshake|EPROTO/i.test(err.message || "");
      if (isTlsError) {
        try {
          const controller2 = new AbortController();
          const timeout2 = setTimeout(() => controller2.abort(), 8000);
          const res2 = await axios.get(url, {
            signal: controller2.signal,
            httpsAgent: legacyTlsAgent,
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
          });
          clearTimeout(timeout2);
          const text2 = cleanHtml(res2.data);
          return { url, title, text: text2.length > 100 ? text2 : snippet, success: true };
        } catch (err2: any) {
          console.error(`Crawl failed (retry with legacy TLS) for ${url}:`, err2.message);
        }
      } else {
        console.error(`Crawl failed for ${url}:`, err.message);
      }
      return { url, title, text: snippet, success: !!snippet };
    }
  });
}

async function extractStationsFromBatch(
  locationHint: string,
  sources: RawSource[]
): Promise<any[]> {
  if (sources.length === 0) return [];

  const context = sources
    .map((s, i) => `[${i + 1}] ${s.title} (${s.url})\n${s.text.slice(0, 1800)}`)
    .join("\n\n---\n\n");

  return aiLimit(async () => {
    try {
      const completion = await retryWithBackoff(
        () =>
          aicredits.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  'Extract EVERY distinct EV charging station listing you can find in the sources below. ' +
                  'Return ONLY valid JSON in this exact shape: ' +
                  '{"stations":[{"name":"","address":"","connectors":2,"fastCharge":true,"powerKw":50,"network":""}]}. ' +
                  "Include a station only if it has a real, usable address or landmark description " +
                  "(street, area, or well-known location — not just a city name) so it can be geocoded. " +
                  "Do not skip stations just because some fields (connectors, powerKw, network) are unknown — " +
                  "use your best estimate or omit that field rather than dropping the station. " +
                  "Extract up to 30 stations from these sources — include every distinct listing you find, " +
                  "not just the first few. If nothing relevant is found, return {\"stations\":[]}.",
              },
              {
                role: "user",
                content: `Location: ${locationHint}\n\nSources:\n${context}`,
              },
            ],
            response_format: { type: "json_object" },
          }),
        { retries: 3, baseDelayMs: 1500 }
      );

      const parsed = JSON.parse(completion.choices[0].message.content || "{}");
      return Array.isArray(parsed.stations) ? parsed.stations : [];
    } catch (err: any) {
      console.error(`AI station extraction failed for "${locationHint}":`, err.message);
      return [];
    }
  });
}

// ── Geocode a real address via Nominatim — NEVER fabricate coordinates ────
// Two-tier strategy:
//  1. Try the extracted address itself, bounded to a GENEROUS viewbox
//     around the segment. Nominatim's fuzzy text match frequently can't
//     resolve vague/rural Indian addresses inside a tight box at all, so
//     the box here is deliberately wider than the actual acceptance
//     radius — final acceptance is still enforced later by the strict
//     maxRoadDist / route-bounds check in GET(), so widening this box only
//     helps Nominatim FIND a candidate, it never relaxes what gets kept.
//  2. If that fails, geocode the known LOCALITY NAME itself (still
//     bounded) as an approximate stand-in location. This used to fall back
//     to an UNBOUNDED address search instead, which just matched the text
//     to whatever place resembled it best anywhere in the world — often
//     hundreds of km away — and got silently discarded by the bounds
//     filter downstream, losing the station entirely even though the
//     search had correctly found it. Falling back to the locality name is
//     an honest "somewhere near <locality>" pin on a real, resolvable
//     place instead of either a wrong-place guess or a lost result.
async function geocodeAddress(
  address: string,
  cityHint?: string,
  center?: GeoCenter
): Promise<{ lat: number; lon: number; approx?: boolean } | null> {
  if (!address || address.length < 4) return null;

  const attempts = [address];
  if (cityHint && !address.toLowerCase().includes(cityHint.toLowerCase())) {
    attempts.push(`${address}, ${cityHint}`);
  }

  let viewbox = "";
  if (center) {
    // Floor of 60km / 2x the segment radius — generous on purpose, see
    // comment above. The real filter is applied later in GET().
    const r = Math.max((center.radiusKm ?? 40) * 2, 60);
    const latPad = r / 111;
    const lonPad = r / (111 * Math.cos((center.lat * Math.PI) / 180) || 1);
    viewbox =
      `&viewbox=${center.lon - lonPad},${center.lat + latPad},${center.lon + lonPad},${center.lat - latPad}` +
      `&bounded=1`;
  }

  const tryQuery = async (q: string): Promise<{ lat: number; lon: number } | null> => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1${viewbox}`,
        { signal: controller.signal, headers: { "User-Agent": "VoltIQ/1.0" }, cache: "no-store" }
      );
      clearTimeout(timeout);
      if (!res.ok) return null;
      const data = await res.json();
      if (data.length) return { lat: Number(data[0].lat), lon: Number(data[0].lon) };
    } catch {
      // fall through
    }
    return null;
  };

  // Pass 1 — the extracted address itself, bounded to the segment's area.
  for (const q of attempts) {
    const hit = await tryQuery(q);
    if (hit) return hit;
  }

  // Pass 2 — address didn't resolve. Fall back to the known locality name
  // (a real, resolvable place) instead of guessing via unbounded search.
  if (cityHint) {
    const hit = await tryQuery(cityHint);
    if (hit) return { ...hit, approx: true };
  }

  return null;
}

async function reverseGeocode(lat: number, lon: number): Promise<LocalityInfo> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=13`,
      { signal: controller.signal, headers: { "User-Agent": "VoltIQ/1.0" }, cache: "no-store" }
    );
    clearTimeout(timeout);
    if (!res.ok) return { specific: null, broad: null };
    const data = await res.json();
    const a = data.address || {};

    const specific = a.town || a.city || a.suburb || a.village || a.municipality || null;
    const broad = a.county || a.state_district || a.city || a.state || null;

    return { specific, broad: broad && broad !== specific ? broad : null };
  } catch {
    return { specific: null, broad: null };
  }
}

function distanceToRoute(lat: number, lon: number, route: RoutePoint[]): number {
  let min = Infinity;
  for (const p of route) {
    const d = haversine(lat, lon, p.lat, p.lon);
    if (d < min) min = d;
  }
  return min;
}

function isWithinRouteBounds(lat: number, lon: number, route: RoutePoint[], bufferKm: number): boolean {
  const lats = route.map((p) => p.lat);
  const lons = route.map((p) => p.lon);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLon = Math.min(...lons), maxLon = Math.max(...lons);
  const latPad = bufferKm / 111;
  const avgLat = (minLat + maxLat) / 2;
  const lonPad = bufferKm / (111 * Math.cos((avgLat * Math.PI) / 180) || 1);
  return lat >= minLat - latPad && lat <= maxLat + latPad && lon >= minLon - lonPad && lon <= maxLon + lonPad;
}

function buildSegments(
  route: RoutePoint[],
  targetSegmentKm: number,
  minSegments: number,
  maxSegments: number,
  maxRoadDistKm: number
): RouteSegment[] {
  if (route.length < 2) {
    return [{ index: 0, midpoint: route[0], points: route, startKm: 0, endKm: 0, radiusKm: Math.max(maxRoadDistKm, 8) }];
  }

  const cum: number[] = [0];
  for (let i = 1; i < route.length; i++) {
    cum.push(cum[i - 1] + haversine(route[i - 1].lat, route[i - 1].lon, route[i].lat, route[i].lon));
  }
  const totalKm = cum[cum.length - 1];

  let segCount = Math.round(totalKm / targetSegmentKm) || minSegments;
  segCount = Math.max(minSegments, Math.min(maxSegments, segCount));

  const segments: RouteSegment[] = [];
  for (let s = 0; s < segCount; s++) {
    const startKm = (totalKm / segCount) * s;
    const endKm = (totalKm / segCount) * (s + 1);

    let segPoints = route.filter((_, i) => cum[i] >= startKm && cum[i] <= endKm);
    if (segPoints.length === 0) {
      const midKm = (startKm + endKm) / 2;
      let nearestIdx = 0, minDiff = Infinity;
      for (let i = 0; i < cum.length; i++) {
        const diff = Math.abs(cum[i] - midKm);
        if (diff < minDiff) { minDiff = diff; nearestIdx = i; }
      }
      segPoints = [route[nearestIdx]];
    }

    const midpoint = segPoints[Math.floor(segPoints.length / 2)];
    const segLenKm = endKm - startKm;

    segments.push({
      index: s,
      midpoint,
      points: segPoints,
      startKm,
      endKm,
      radiusKm: Math.max(maxRoadDistKm, segLenKm / 2 + 4),
    });
  }
  return segments;
}

function offsetPerpendicular(
  point: RoutePoint,
  bearingPoint: RoutePoint,
  offsetKm: number,
  side: "left" | "right"
): RoutePoint {
  const dLat = bearingPoint.lat - point.lat;
  const dLon = bearingPoint.lon - point.lon;

  const perp = side === "left" ? { lat: -dLon, lon: dLat } : { lat: dLon, lon: -dLat };
  const mag = Math.sqrt(perp.lat ** 2 + perp.lon ** 2) || 1;

  const kmPerDegLat = 111;
  const kmPerDegLon = 111 * Math.cos((point.lat * Math.PI) / 180) || 1;

  return {
    lat: point.lat + (perp.lat / mag) * (offsetKm / kmPerDegLat),
    lon: point.lon + (perp.lon / mag) * (offsetKm / kmPerDegLon),
  };
}

async function fetchOcmForSegment(seg: RouteSegment, ocsKey: string | undefined): Promise<any[]> {
  const results: any[] = [];

  const bearingPoint = seg.points.length > 1 ? seg.points[seg.points.length - 1] : seg.midpoint;
  const sideOffsetKm = Math.max(3, seg.radiusKm * 0.6);

  const queryPoints: { point: RoutePoint; label: string }[] = [
    { point: seg.midpoint, label: "center" },
    { point: offsetPerpendicular(seg.midpoint, bearingPoint, sideOffsetKm, "left"), label: "left" },
    { point: offsetPerpendicular(seg.midpoint, bearingPoint, sideOffsetKm, "right"), label: "right" },
  ];

  for (const { point, label } of queryPoints) {
    try {
      const ocsUrl = ocsKey
        ? `https://api.openchargemap.io/v3/poi?output=json&latitude=${point.lat}&longitude=${point.lon}&distance=${seg.radiusKm}&distanceunit=km&maxresults=25&compact=true&verbose=false&key=${ocsKey}`
        : `https://api.openchargemap.io/v3/poi?output=json&latitude=${point.lat}&longitude=${point.lon}&distance=${seg.radiusKm}&distanceunit=km&maxresults=25&compact=true&verbose=false`;

      const ocsRes = await fetch(ocsUrl, { headers: { "User-Agent": "EVRangePredictor/2.0" } });
      if (!ocsRes.ok) continue;

      const ocsData = await ocsRes.json();
      for (const s of ocsData) {
        if (!s.AddressInfo?.Latitude || !s.AddressInfo?.Longitude) continue;
        const id = `ocm-${s.ID ?? `${s.AddressInfo.Latitude}-${s.AddressInfo.Longitude}`}`;
        results.push({
          id,
          name:       s.AddressInfo.Title || "EV Charging Station",
          address:    [s.AddressInfo.AddressLine1, s.AddressInfo.Town, s.AddressInfo.StateOrProvince]
                        .filter(Boolean).join(", "),
          lat:        s.AddressInfo.Latitude,
          lon:        s.AddressInfo.Longitude,
          connectors: s.Connections?.length || 1,
          fastCharge: s.Connections?.some((c: any) => (c.PowerKW || 0) > 50) ?? false,
          powerKw:    Math.max(...(s.Connections?.map((c: any) => c.PowerKW || 0) ?? [0])),
          network:    s.OperatorInfo?.Title || "Unknown",
          source:     "openchargemap",
          segmentIndex: seg.index,
          querySide:  label,
        });
      }
    } catch (err) {
      console.error(`OCM failed for segment ${seg.index} (${label}):`, err);
    }
  }

  const seen = new Set<string>();
  return results.filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
}

async function runSearchQuery(
  query: string,
  locationHint: string,
  tag: string,
  center?: GeoCenter
): Promise<any[]> {
  const results = await webSearch(query);
  const topResults = results.slice(0, 10);
  if (topResults.length === 0) {
    console.log(`[${tag}] 0 results for "${query}"`);
    return [];
  }

  const crawled = await Promise.all(topResults.map((r) => crawlOne(r.url, r.title, r.snippet)));
  const validSources = crawled.filter((c) => c.text && c.text.length > 50);
  if (validSources.length === 0) return [];

  const aiStations = await extractStationsFromBatch(locationHint, validSources);

  const geocoded = await Promise.all(
    aiStations.map(async (s: any) => {
      if (!s.address) return null;
      const coords = await geocodeAddress(s.address, locationHint, center);
      if (!coords) return null;
      return { ...s, ...coords };
    })
  );

  return geocoded
    .filter((s): s is any => !!s)
    .map((s) => ({
      id:         `search-${crypto.randomUUID()}`,
      name:       (s.name || "EV Charging Station").slice(0, 60),
      address:    s.address,
      lat:        s.lat,
      lon:        s.lon,
      connectors: Number.isFinite(s.connectors) ? s.connectors : 1,
      fastCharge: !!s.fastCharge,
      powerKw:    Number.isFinite(s.powerKw) ? s.powerKw : (s.fastCharge ? 50 : 22),
      network:    s.network || "Unknown",
      source:     tag,
      // True when the exact address couldn't be geocoded and we fell back
      // to the locality's center as an approximate pin — see geocodeAddress.
      approxLocation: !!s.approx,
    }));
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Bumped to v4 alongside the locality-fallback geocoding fix — v3 cached
// entries may still contain empty results caused by the old unbounded-
// fallback behavior (or budget-exceeded search failures) and should not be
// trusted just because they haven't expired yet.
const CACHE_VERSION = "v4";

function localityKeyFor(name: string): string {
  return `${CACHE_VERSION}:${name.trim().toLowerCase()}`;
}

async function getCachedStations(locality: string): Promise<any[] | null> {
  try {
    const row = await prisma.stationSearchCache.findUnique({
      where: { locality: localityKeyFor(locality) },
    });
    if (!row) return null;

    const data = row.data as unknown as any[];
    const isEmpty = Array.isArray(data) && data.length === 0;
    const ttl = isEmpty ? EMPTY_RESULT_TTL_MS : STATION_CACHE_TTL_MS;
    const age = Date.now() - row.createdAt.getTime();
    if (age > ttl) return null;

    return data;
  } catch (err) {
    console.error("StationSearchCache read failed:", err);
    return null;
  }
}

async function saveCachedStations(locality: string, data: any[]): Promise<void> {
  try {
    await prisma.stationSearchCache.upsert({
      where: { locality: localityKeyFor(locality) },
      create: { locality: localityKeyFor(locality), data: data as any },
      update: { data: data as any, createdAt: new Date() },
    });
  } catch (err) {
    console.error("StationSearchCache write failed:", err);
  }
}

async function searchLocality(
  locality: LocalityInfo,
  fallbackHint: string,
  center: GeoCenter,
  skipCache = false
): Promise<any[]> {
  const primaryHint = locality.specific || fallbackHint;

  if (!skipCache) {
    const cached = await getCachedStations(primaryHint);
    if (cached) {
      console.log(`searchLocality: ${cached.length} stations for "${primaryHint}" (cached, $0)`);
      return cached;
    }
  }

  const collected: any[] = [];
  const seenIds = new Set<string>();
  const addAll = (arr: any[]) => {
    for (const s of arr) {
      if (!seenIds.has(s.id)) {
        seenIds.add(s.id);
        collected.push(s);
      }
    }
  };

  try {
    const tier1 = await runSearchQuery(`EV charging stations near ${primaryHint}`, primaryHint, "websearch", center);
    addAll(tier1);

    if (locality.broad) {
      const tier2 = await runSearchQuery(`EV charging stations near ${locality.broad}`, locality.broad, "websearch", center);
      addAll(tier2);
    }

    const areaHint = locality.broad || primaryHint;
    const batches = chunk(PROVIDERS, 3);
    const providerResults = await Promise.all(
      batches.map((batch) => {
        const siteFilters = batch.map((p) => `site:${p.domain}`).join(" OR ");
        const brandNames = batch.map((p) => p.name).join(" OR ");
        const query = `(${siteFilters}) charging station ${areaHint}`;
        return runSearchQuery(query, areaHint, "provider", center).then((r) => {
          if (r.length === 0) {
            return runSearchQuery(`${brandNames} EV charging station ${areaHint}`, areaHint, "provider", center);
          }
          return r;
        });
      })
    );
    addAll(providerResults.flat());
  } catch (err) {
    console.error(`Web search failed for locality "${primaryHint}":`, err);
  }

  await saveCachedStations(primaryHint, collected);
  return collected;
}

export async function GET(req: NextRequest) {
  const lat          = req.nextUrl.searchParams.get("lat");
  const lon          = req.nextUrl.searchParams.get("lon");
  const address      = req.nextUrl.searchParams.get("address") || "";
  const pathParam    = req.nextUrl.searchParams.get("path");

  const maxRoadDistKmParam = req.nextUrl.searchParams.get("maxRoadDistKm");
  const radiusParam        = req.nextUrl.searchParams.get("radius");
  const maxRoadDist = maxRoadDistKmParam
    ? parseFloat(maxRoadDistKmParam)
    : radiusParam
    ? parseFloat(radiusParam) / 1000
    : 12;

  const limit        = Math.min(parseInt(req.nextUrl.searchParams.get("limit") || "80", 10), 150);
  const targetSegKm  = parseFloat(req.nextUrl.searchParams.get("segmentKm") || "15");
  const minSegments  = Math.max(1, parseInt(req.nextUrl.searchParams.get("minSegments") || "6", 10));
  const maxSegments  = Math.min(14, parseInt(req.nextUrl.searchParams.get("maxSegments") || "10", 10));
  const crawlEnabled = req.nextUrl.searchParams.get("crawl") !== "false";
  const useOcm       = req.nextUrl.searchParams.get("ocm") !== "false";
  const skipCache    = req.nextUrl.searchParams.get("fresh") === "true";

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon required" }, { status: 400 });
  }

  const ocsKey = process.env.OPEN_CHARGE_MAP_KEY;
  const baseLat = parseFloat(lat);
  const baseLon = parseFloat(lon);

  let route: RoutePoint[] = [{ lat: baseLat, lon: baseLon }];
  if (pathParam) {
    try {
      const parsed = JSON.parse(pathParam);
      if (Array.isArray(parsed) && parsed.length > 0) {
        route = parsed
          .filter((p: any) => typeof p?.lat === "number" && typeof p?.lon === "number")
          .map((p: any) => ({ lat: p.lat, lon: p.lon }));
      }
    } catch {
      // fall back to single point
    }
  }
  if (route.length === 0) route = [{ lat: baseLat, lon: baseLon }];

  const segments = buildSegments(route, targetSegKm, minSegments, maxSegments, maxRoadDist);

  const localityInfos: LocalityInfo[] = [];
  for (const seg of segments) {
    const info = await reverseGeocode(seg.midpoint.lat, seg.midpoint.lon);
    localityInfos.push(info);
    await sleep(250);
  }

  const fallbackHint = address || `${lat},${lon}`;

  const ocmResultsPerSegment = useOcm
    ? await Promise.all(segments.map((seg) => fetchOcmForSegment(seg, ocsKey)))
    : segments.map(() => [] as any[]);
  const totalOcm = ocmResultsPerSegment.reduce((sum, r) => sum + r.length, 0);

  const localityKeyToSegments = new Map<string, number[]>();
  segments.forEach((seg, i) => {
    const key = localityInfos[i].specific || fallbackHint;
    if (!localityKeyToSegments.has(key)) localityKeyToSegments.set(key, []);
    localityKeyToSegments.get(key)!.push(i);
  });

  const uniqueLocalities = crawlEnabled
    ? Array.from(localityKeyToSegments.entries()).map(([key, segIdxs]) => {
        const seg = segments[segIdxs[0]];
        return {
          key,
          info: localityInfos[segIdxs[0]],
          center: { lat: seg.midpoint.lat, lon: seg.midpoint.lon, radiusKm: seg.radiusKm } as GeoCenter,
        };
      })
    : [];

  console.log(
    `charging-stations: ${segments.length} segments, ${localityKeyToSegments.size} unique localities, ` +
    `${uniqueLocalities.length} will be searched (OCM: ${useOcm ? "on, center+left+right" : "off"}, maxRoadDistKm: ${maxRoadDist})`
  );

  const webResultsByKey = new Map<string, any[]>();
  await Promise.all(
    uniqueLocalities.map(({ key, info, center }) =>
      segmentLimit(async () => {
        const stations = await searchLocality(info, fallbackHint, center, skipCache);
        webResultsByKey.set(key, stations);
      })
    )
  );

  const totalWeb = Array.from(webResultsByKey.values()).reduce((sum, arr) => sum + arr.length, 0);

  const stationsById = new Map<string, any>();

  ocmResultsPerSegment.forEach((stations) => {
    for (const s of stations) if (!stationsById.has(s.id)) stationsById.set(s.id, s);
  });

  segments.forEach((seg, i) => {
    const key = localityInfos[i].specific || fallbackHint;
    const webStations = webResultsByKey.get(key);
    if (!webStations) return;
    for (const s of webStations) {
      if (!stationsById.has(s.id)) {
        stationsById.set(s.id, { ...s, segmentIndex: seg.index });
      }
    }
  });

  const boundsBufferKm = maxRoadDist;

  let stations = Array.from(stationsById.values())
    .map((s) => ({
      ...s,
      distanceKm: distanceToRoute(s.lat, s.lon, route),
      routeProgressKm: segments[s.segmentIndex]?.startKm ?? 0,
    }))
    .filter((s) => s.distanceKm <= maxRoadDist)
    .filter((s) => isWithinRouteBounds(s.lat, s.lon, route, boundsBufferKm))
    .sort((a, b) => a.routeProgressKm - b.routeProgressKm);

  if (stations.length < segments.length * 2) {
    stations = Array.from(stationsById.values())
      .map((s) => ({
        ...s,
        distanceKm: distanceToRoute(s.lat, s.lon, route),
        routeProgressKm: segments[s.segmentIndex]?.startKm ?? 0,
      }))
      .filter((s) => isWithinRouteBounds(s.lat, s.lon, route, boundsBufferKm * 1.5))
      .sort((a, b) => a.routeProgressKm - b.routeProgressKm);
  }

  console.log(
    `charging-stations: ${segments.length} segments (${localityInfos.map((l) => l.specific).filter(Boolean).join(", ")}), ` +
    `${totalOcm} from OCM, ${totalWeb} from web/provider search, ${stations.length} within bounds, ` +
    `returning ${Math.min(stations.length, limit)}`
  );

  return NextResponse.json({
    stations: stations.slice(0, limit),
    count:    Math.min(stations.length, limit),
    segments: segments.map((s, i) => ({
      index: s.index,
      locality: localityInfos[i].specific,
      broadArea: localityInfos[i].broad,
      startKm: Math.round(s.startKm),
      endKm: Math.round(s.endKm),
    })),
    sources:  { openchargemap: totalOcm, websearch: totalWeb },
    source:   useOcm ? "openchargemap+websearch+segmented" : "websearch+provider+segmented",
  });
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}