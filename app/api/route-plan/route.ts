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

  // ── 2. Get driving route from OpenRouteService ────────────────────────────
  const orsRes = await fetch("https://api.openrouteservice.org/v2/directions/driving-car/json", {
    method: "POST",
    headers: {
      "Authorization": process.env.ORS_API_KEY!,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      coordinates: [
        [originGeo.lon, originGeo.lat],
        [destGeo.lon,   destGeo.lat],
      ],
      elevation: true,
    }),
  });

  const routeData = await orsRes.json();
  if (!routeData.routes?.[0]) {
    return NextResponse.json({ error: "Route not found between these locations." }, { status: 400 });
  }

  const segment     = routeData.routes[0].segments[0];
  const distanceKm  = segment.distance / 1000;
  const durationMin = segment.duration / 60;
  const elevationGain = routeData.routes[0].ascent || 0;

  // ── 3. Get weather at route midpoint ─────────────────────────────────────
  const midLat = (originGeo.lat + destGeo.lat) / 2;
  const midLon = (originGeo.lon + destGeo.lon) / 2;

  const weatherData = await fetch(
    `${BASE}/api/weather?lat=${midLat}&lon=${midLon}`
  ).then(r => r.json());

  // ── 4. Predict battery ────────────────────────────────────────────────────
  const prediction = await fetch(`${BASE}/api/battery-predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      distanceKm,
      batteryPercent,
      vehicleRangeKm,
      weatherFactor:  weatherData.weatherFactor,
      elevationGainM: elevationGain,
    }),
  }).then(r => r.json());

  // ── 5. Always fetch nearby charging stations (for map display) ────────────
  // Fetch along the route: try 1/3 and 2/3 points for better coverage
  const oneThirdLat = originGeo.lat + (destGeo.lat - originGeo.lat) / 3;
  const oneThirdLon = originGeo.lon + (destGeo.lon - originGeo.lon) / 3;
  const twoThirdsLat = originGeo.lat + 2 * (destGeo.lat - originGeo.lat) / 3;
  const twoThirdsLon = originGeo.lon + 2 * (destGeo.lon - originGeo.lon) / 3;

  // Pick the best midpoint based on whether charge is needed
  const stationQueryLat = prediction.willReachDestination ? midLat : oneThirdLat;
  const stationQueryLon = prediction.willReachDestination ? midLon : oneThirdLon;
  const addressHint     = `${origin} to ${destination}`;

  const [midStations, altStations] = await Promise.all([
    fetch(
      `${BASE}/api/charging-stations?lat=${stationQueryLat}&lon=${stationQueryLon}&radius=20000&address=${encodeURIComponent(addressHint)}`
    ).then(r => r.json()),
    // Also fetch near 2/3 point if charge is needed
    !prediction.willReachDestination
      ? fetch(
          `${BASE}/api/charging-stations?lat=${twoThirdsLat}&lon=${twoThirdsLon}&radius=20000&address=${encodeURIComponent(addressHint)}`
        ).then(r => r.json())
      : Promise.resolve({ stations: [] }),
  ]);

  // Merge and deduplicate stations from both fetch points
  const allStations = [...(midStations.stations || [])];
  const existingIds = new Set(allStations.map((s: any) => s.id));
  for (const s of (altStations.stations || [])) {
    if (!existingIds.has(s.id)) {
      allStations.push(s);
      existingIds.add(s.id);
    }
  }
  const chargingStations = allStations.slice(0, 6);

  // ── 6. OpenRouter AI: Smart insights & suggestions ────────────────────────
  let aiInsights = getDefaultInsights(prediction, weatherData, distanceKm, batteryPercent);

  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    try {
      const prompt = buildInsightPrompt({
        origin, destination, distanceKm, durationMin, batteryPercent,
        vehicleRangeKm, elevationGain, weatherData, prediction, chargingStations,
      });

      const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type":  "application/json",
          "HTTP-Referer":  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
          "X-Title":       "EV Range Predictor",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content: "You are an expert EV trip analyst. Respond ONLY with a valid JSON object — no markdown, no explanation, no preamble.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        const raw = aiData.choices?.[0]?.message?.content || "";
        // Strip any accidental markdown fences
        const cleaned = raw.replace(/```json|```/g, "").trim();
        const parsed  = JSON.parse(cleaned);
        aiInsights = parsed;
      }
    } catch (err) {
      console.error("OpenRouter AI error:", err);
      // Keep default insights
    }
  }

  // ── 7. Return combined result ─────────────────────────────────────────────
  return NextResponse.json({
    origin:           originGeo,
    destination:      destGeo,
    route: {
      distanceKm:     Math.round(distanceKm),
      durationMin:    Math.round(durationMin),
      elevationGainM: Math.round(elevationGain),
    },
    weather:          weatherData,
    battery:          prediction,
    chargingStations,
    aiInsights,
  });
}

// ── AI prompt builder ──────────────────────────────────────────────────────

function buildInsightPrompt(ctx: any): string {
  return `
Analyse this EV trip and respond with a JSON object matching exactly this schema:
{
  "summary": "2-sentence trip summary mentioning key factors",
  "verdict": "go" | "charge_first" | "charge_enroute",
  "tips": ["tip1", "tip2", "tip3"],
  "optimalSpeed": number,  // recommended speed in km/h for max range
  "chargingAdvice": "1-sentence charging recommendation",
  "riskLevel": "low" | "medium" | "high"
}

Trip data:
- Route: ${ctx.origin} → ${ctx.destination}
- Distance: ${Math.round(ctx.distanceKm)} km, ETA: ${Math.round(ctx.durationMin)} min
- Current battery: ${ctx.batteryPercent}% of ${ctx.vehicleRangeKm}km range vehicle
- Remaining after trip: ${ctx.prediction.remainingBattery}%
- Will reach destination: ${ctx.prediction.willReachDestination}
- Weather: ${ctx.weatherData.conditions}, ${ctx.weatherData.temperature}°C, wind ${ctx.weatherData.wind_speed}km/h, rain ${ctx.weatherData.precipitation}mm
- Weather efficiency factor: ${Math.round(ctx.weatherData.weatherFactor * 100)}%
- Elevation gain: ${Math.round(ctx.elevationGain)}m
- Nearby chargers found: ${ctx.chargingStations.length} (${ctx.chargingStations.filter((s: any) => s.fastCharge).length} fast chargers)
- Battery breakdowns: ${JSON.stringify(ctx.prediction.breakdowns)}

Return ONLY the JSON object. No markdown, no explanation.`.trim();
}

// ── Default fallback insights (no OpenRouter key) ─────────────────────────

function getDefaultInsights(prediction: any, weather: any, distanceKm: number, battery: number) {
  const ok = prediction.willReachDestination;
  return {
    summary: ok
      ? `Your EV can complete this ${Math.round(distanceKm)}km trip comfortably with ${prediction.remainingBattery.toFixed(0)}% battery to spare. Current weather conditions have ${Math.round((1 - weather.weatherFactor) * 100)}% impact on range.`
      : `This ${Math.round(distanceKm)}km trip requires a charging stop — you'd arrive ${Math.abs(prediction.remainingBattery).toFixed(0)}% short. Plan a charge break along the route.`,
    verdict:        ok ? "go" : "charge_enroute",
    tips: ok
      ? ["Maintain 80-100 km/h for optimal efficiency", "Pre-condition your cabin while plugged in", "Use regenerative braking on descents"]
      : ["Charge to at least 80% before departing", "Use the nearest fast charger along the route", "Reduce speed to 80 km/h to stretch your range"],
    optimalSpeed:     90,
    chargingAdvice:  ok
      ? `No charging needed. You'll arrive with a ${prediction.safetyBuffer}% buffer.`
      : "Stop at a fast charger at the midpoint and top up to 80%.",
    riskLevel: prediction.remainingBattery > 20 ? "low" : prediction.remainingBattery > 0 ? "medium" : "high",
  };
}