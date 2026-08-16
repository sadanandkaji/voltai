//app\api\geocode\route.ts
import { NextRequest, NextResponse } from "next/server";
import { aicredits } from "../../lib/aicredits";
import { prisma } from "../../lib/prisma";

// How long a cached geocode result stays trusted before we re-resolve it.
// Addresses don't move, so this can be long — mainly here so a bad AI
// normalization from months ago doesn't stick around forever.
const GEOCODE_CACHE_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

async function fetchWithTimeout(url: string, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "VoltIQ/1.0",
      },
    });

    clearTimeout(id);
    return res;
  } catch (error) {
    clearTimeout(id);
    console.error("Geocode fetch failed:", error);
    return null; // instead of throw
  }
}

// ── Query Nominatim once with a given search string ────────────────────────
async function tryNominatim(query: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=1`;

  const res = await fetchWithTimeout(
    url,
    {
      headers: { "User-Agent": "EVRangePredictor/1.0" },
      cache: "no-store",
    },
    7000
  );

  if (!res || !res.ok) return null;

  const text = await res.text();
  if (!text) return null;

  try {
    const data = JSON.parse(text);
    if (!data.length) return null;
    return {
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
      display_name: data[0].display_name,
    };
  } catch {
    return null;
  }
}

// Type-guard filter: this is what actually lets TypeScript narrow
// (string | null)[] -> string[]. A plain `.filter(Boolean)` removes the
// null values at runtime but TS can't see that unless the predicate is
// a type guard (`x is NonNullable<T>`), so we spell it out explicitly.
function chunkFallback<T>(arr: T[]): NonNullable<T>[] {
  return arr.filter((x): x is NonNullable<T> => Boolean(x));
}

async function tryNominatimCascade(
  candidates: string[]
): Promise<{ lat: number; lon: number; display_name: string; matchedQuery: string } | null> {
  for (const q of candidates) {
    if (!q) continue;
    const result = await tryNominatim(q);
    if (result) return { ...result, matchedQuery: q };
  }
  return null;
}

interface AICandidates {
  fullName: string | null;
  shortName: string | null;
  areaOnly: string | null;
}

// ── AI normalization — returns a ladder of candidates, never coordinates ──
// LLMs hallucinate lat/lon for real places as readily as they hallucinate
// URLs, so the model's ONLY job here is producing better search strings.
// Nominatim still resolves the actual coordinates for every candidate tried.
async function getAICandidates(rawAddress: string): Promise<AICandidates | null> {
  try {
    const completion = await aicredits.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 200,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "The user gave a casual or abbreviated location in India. " +
            "Return ONLY a JSON object with three fields, each a geocodable " +
            "search string, from most to least specific: " +
            '{"fullName": "official full name + city, state, India", ' +
            '"shortName": "common short form or abbreviation expanded + city, state, India", ' +
            '"areaOnly": "just the neighbourhood or nearby well-known area + city, state, India, ' +
            "with NO institution/building name at all — this must be a place " +
            'that definitely exists on a map"}. ' +
            "If you don't know a specific field confidently, still make your " +
            "best reasonable guess rather than leaving it null — areaOnly especially " +
            "should almost always be fillable even if the exact place is obscure.",
        },
        { role: "user", content: rawAddress },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    return {
      fullName: typeof parsed.fullName === "string" ? parsed.fullName.trim() : null,
      shortName: typeof parsed.shortName === "string" ? parsed.shortName.trim() : null,
      areaOnly: typeof parsed.areaOnly === "string" ? parsed.areaOnly.trim() : null,
    };
  } catch (err: any) {
    console.error("AI candidate generation failed:", err.message);
    return null;
  }
}

// ── Prisma-backed cache helpers ─────────────────────────────────────────────
function cacheKeyFor(address: string): string {
  return address.trim().toLowerCase();
}

async function getCachedGeocode(address: string) {
  try {
    const row = await prisma.geocodeCache.findUnique({
      where: { query: cacheKeyFor(address) },
    });
    if (!row) return null;

    const age = Date.now() - row.createdAt.getTime();
    if (age > GEOCODE_CACHE_TTL_MS) return null; // stale — treat as a miss

    return row;
  } catch (err) {
    console.error("GeocodeCache read failed:", err);
    return null; // fail open — cache errors shouldn't break geocoding
  }
}

async function saveGeocodeCache(
  address: string,
  result: { lat: number; lon: number; display_name: string },
  source: string
) {
  try {
    await prisma.geocodeCache.upsert({
      where: { query: cacheKeyFor(address) },
      create: {
        query: cacheKeyFor(address),
        lat: result.lat,
        lon: result.lon,
        displayName: result.display_name,
        source,
      },
      update: {
        lat: result.lat,
        lon: result.lon,
        displayName: result.display_name,
        source,
        createdAt: new Date(), // refresh the TTL clock on update
      },
    });
  } catch (err) {
    console.error("GeocodeCache write failed:", err);
    // Non-fatal — the geocode result is still returned to the caller
  }
}

export async function GET(req: NextRequest) {
  try {
    const address = req.nextUrl.searchParams.get("address");
    const useAI = req.nextUrl.searchParams.get("ai") !== "false";
    const skipCache = req.nextUrl.searchParams.get("cache") === "false";

    if (!address) {
      return NextResponse.json({ error: "Address required" }, { status: 400 });
    }

    // 0. Check the persistent cache first — this is what makes repeat
    // lookups (Bengaluru, Mysore, etc. showing up on almost every trip)
    // cost $0 and skip the network entirely, and survives server restarts
    // unlike an in-memory Map.
    if (!skipCache) {
      const cached = await getCachedGeocode(address);
      if (cached) {
        return NextResponse.json({
          lat: cached.lat,
          lon: cached.lon,
          display_name: cached.displayName,
          source: cached.source,
          cached: true,
        });
      }
    }

    // 1. Try the raw input first — cheapest path, works for anything
    //    already well-formed ("Mysore, Karnataka").
    const direct = await tryNominatim(address);
    if (direct) {
      await saveGeocodeCache(address, direct, "direct");
      return NextResponse.json({ ...direct, source: "direct", cached: false });
    }

    if (!useAI) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    // 2. Direct lookup failed — ask AI for a ladder of candidates and try
    //    each, most specific first, falling back toward the general area.
    const candidates = await getAICandidates(address);
    if (!candidates) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const orderedQueries = chunkFallback([
      candidates.fullName,
      candidates.shortName,
      candidates.areaOnly,
    ]);

    console.log(`Geocode: "${address}" -> trying AI candidates: ${JSON.stringify(orderedQueries)}`);

    const match = await tryNominatimCascade(orderedQueries);
    if (!match) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    console.log(`Geocode: "${address}" -> matched via "${match.matchedQuery}"`);

    const source =
      match.matchedQuery === candidates.fullName ? "ai-full" :
      match.matchedQuery === candidates.shortName ? "ai-short" : "ai-area";

    const resolved = { lat: match.lat, lon: match.lon, display_name: match.display_name };
    await saveGeocodeCache(address, resolved, source);

    return NextResponse.json({ ...resolved, source, cached: false });
  } catch (error) {
    console.error("Geocode error:", error);
    return NextResponse.json({ error: "Failed to geocode location" }, { status: 500 });
  }
}