// app/api/route-plan/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { origin, destination, batteryPercent, vehicleRangeKm = 400 } = await req.json();
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // ── 1. Geocode both locations ──────────────────────────────────────────────
  const [originGeo, destGeo] = await Promise.all([
    fetch(`${BASE}/api/geocode?address=${encodeURIComponent(origin)}`).then(r => r.json()),
    fetch(`${BASE}/api/geocode?address=${encodeURIComponent(destination)}`).then(r => r.json()),
  ]);

  if (originGeo.error || destGeo.error) {
    return NextResponse.json({ error: "Could not geocode one or both locations." }, { status: 400 });
  }

  // ── 2. Get driving route ──────────────────────────────────────────────────
  const orsRes = await fetch("https://api.openrouteservice.org/v2/directions/driving-car/json", {
    method: "POST",
    headers: { "Authorization": process.env.ORS_API_KEY!, "Content-Type": "application/json" },
    body: JSON.stringify({
      coordinates: [[originGeo.lon, originGeo.lat], [destGeo.lon, destGeo.lat]],
      elevation: true,
    }),
  });

  const routeData = await orsRes.json();
  if (!routeData.routes?.[0]) {
    return NextResponse.json({ error: "Route not found between these locations." }, { status: 400 });
  }

  const segment       = routeData.routes[0].segments[0];
  const distanceKm    = segment.distance / 1000;
  const durationMin   = segment.duration / 60;
  const elevationGain = routeData.routes[0].ascent || 0;

  // ── 3. Weather at midpoint ────────────────────────────────────────────────
  const midLat = (originGeo.lat + destGeo.lat) / 2;
  const midLon = (originGeo.lon + destGeo.lon) / 2;
  const weatherData = await fetch(`${BASE}/api/weather?lat=${midLat}&lon=${midLon}`).then(r => r.json());

  // ── 4. Battery prediction ────────────────────────────────────────────────
  const prediction = await fetch(`${BASE}/api/battery-predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      distanceKm, batteryPercent, vehicleRangeKm,
      weatherFactor: weatherData.weatherFactor,
      elevationGainM: elevationGain,
    }),
  }).then(r => r.json());

  // ── 5. Sample 5 evenly-spaced points along the route ────────────────────
  // Fetch stations at each point in parallel
  const consumptionRatePerKm = prediction.totalBatteryUsed / distanceKm; // %/km
  const sampleFractions = [0.2, 0.35, 0.5, 0.65, 0.8];
  const addressHint = `${origin} to ${destination}`;

  const stationFetches = sampleFractions.map(frac => {
    const lat = originGeo.lat + (destGeo.lat - originGeo.lat) * frac;
    const lon = originGeo.lon + (destGeo.lon - originGeo.lon) * frac;
    const kmHere = distanceKm * frac;
    const batteryHere = batteryPercent - consumptionRatePerKm * kmHere;

    return fetch(
      `${BASE}/api/charging-stations?lat=${lat}&lon=${lon}&radius=15000&address=${encodeURIComponent(addressHint)}`
    )
      .then(r => r.json())
      .then(data => ({ stations: (data.stations || []) as any[], frac, batteryHere, kmHere }))
      .catch(() => ({ stations: [], frac, batteryHere, kmHere }));
  });

  const stationResults = await Promise.all(stationFetches);

  // ── 6. Merge + deduplicate + annotate isNeeded / isCritical ─────────────
  const seen = new Set<string>();
  const allAnnotated: any[] = [];

  // The km at which battery runs out (without charging)
  const rangeRunsOutAtKm = (batteryPercent / 100) * vehicleRangeKm * weatherData.weatherFactor;

  for (const result of stationResults) {
    for (const s of result.stations) {
      // Deduplicate by proximity
      const key = `${Math.round(s.lat * 100)}_${Math.round(s.lon * 100)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const batteryHere = result.batteryHere;
      const kmHere      = result.kmHere;

      // NEEDED: battery will be critically low at this point AND there's still charge to drive here
      const willBeStranded = !prediction.willReachDestination && kmHere <= rangeRunsOutAtKm;
      const batteryLow     = batteryHere < 25 && batteryHere > 5;

      const isNeeded   = (willBeStranded && batteryHere > 5) || (batteryLow && !prediction.willReachDestination);
      const isCritical = isNeeded && batteryHere < 20 && batteryHere > 5;

      allAnnotated.push({
        ...s,
        routeFraction:  result.frac,
        batteryAtPoint: Math.round(batteryHere * 10) / 10,
        isNeeded,
        isCritical,
      });
    }
  }

  // Sort: critical → needed → informational, then by route order within each group
  allAnnotated.sort((a, b) => {
    const rankA = a.isCritical ? 0 : a.isNeeded ? 1 : 2;
    const rankB = b.isCritical ? 0 : b.isNeeded ? 1 : 2;
    if (rankA !== rankB) return rankA - rankB;
    return a.routeFraction - b.routeFraction;
  });

  // Keep all needed/critical + up to 8 informational (to limit map clutter)
  const needed     = allAnnotated.filter(s => s.isNeeded);
  const optional   = allAnnotated.filter(s => !s.isNeeded).slice(0, Math.max(2, 10 - needed.length));
  const chargingStations = [...needed, ...optional];

  // ── 7. OpenRouter AI insights ────────────────────────────────────────────
  let aiInsights = getDefaultInsights(prediction, weatherData, distanceKm, batteryPercent);
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  if (openRouterKey) {
    try {
      const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type":  "application/json",
          "HTTP-Referer":  BASE,
          "X-Title":       "EV Range Predictor",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          max_tokens: 600,
          messages: [
            { role: "system", content: "You are an expert EV trip analyst. Respond ONLY with valid JSON, no markdown." },
            { role: "user",   content: buildInsightPrompt({ origin, destination, distanceKm, durationMin, batteryPercent, vehicleRangeKm, elevationGain, weatherData, prediction, chargingStations }) },
          ],
        }),
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        const raw    = aiData.choices?.[0]?.message?.content || "";
        aiInsights   = JSON.parse(raw.replace(/```json|```/g, "").trim());
      }
    } catch (err) { console.error("OpenRouter error:", err); }
  }

  return NextResponse.json({
    origin: originGeo, destination: destGeo,
    route: {
      distanceKm:     Math.round(distanceKm),
      durationMin:    Math.round(durationMin),
      elevationGainM: Math.round(elevationGain),
    },
    weather: weatherData, battery: prediction, chargingStations, aiInsights,
  });
}

function buildInsightPrompt(ctx: any) {
  const neededCount = ctx.chargingStations.filter((s: any) => s.isNeeded).length;
  return `Analyse this EV trip and return ONLY this JSON:
{"summary":"2-sentence summary","verdict":"go"|"charge_first"|"charge_enroute","tips":["tip1","tip2","tip3"],"optimalSpeed":number,"chargingAdvice":"1 sentence","riskLevel":"low"|"medium"|"high"}

Route: ${ctx.origin} → ${ctx.destination}, ${Math.round(ctx.distanceKm)}km, ${Math.round(ctx.durationMin)}min
Battery: ${ctx.batteryPercent}% start, ${ctx.prediction.remainingBattery}% remaining, reach=${ctx.prediction.willReachDestination}
Weather: ${ctx.weatherData.conditions} ${ctx.weatherData.temperature}°C wind=${ctx.weatherData.wind_speed}km/h efficiency=${Math.round(ctx.weatherData.weatherFactor*100)}%
Elevation: +${Math.round(ctx.elevationGain)}m
Chargers: ${ctx.chargingStations.length} found, ${neededCount} recommended stops`;
}

function getDefaultInsights(prediction: any, weather: any, distanceKm: number, battery: number) {
  const ok = prediction.willReachDestination;
  return {
    summary: ok
      ? `Your EV completes this ${Math.round(distanceKm)}km trip with ${prediction.remainingBattery.toFixed(0)}% remaining. Weather reduces range by ${Math.round((1-weather.weatherFactor)*100)}%.`
      : `This ${Math.round(distanceKm)}km trip needs a charge stop — you'd be ${Math.abs(prediction.remainingBattery).toFixed(0)}% short. Use a highlighted charger on the map.`,
    verdict: ok ? "go" : "charge_enroute",
    tips: ok
      ? ["Maintain 80-100 km/h for optimal efficiency","Pre-condition cabin while still plugged in","Use regenerative braking on descents"]
      : ["Stop at a red/amber charger pin on the map","Aim to top up to 80% at the stop","Drive at 80 km/h to stretch remaining range"],
    optimalSpeed: 90,
    chargingAdvice: ok ? `No stop needed — ${prediction.safetyBuffer}% safety buffer.` : "Stop at the nearest highlighted charger before battery drops below 15%.",
    riskLevel: prediction.remainingBattery > 20 ? "low" : prediction.remainingBattery > 0 ? "medium" : "high",
  };
}