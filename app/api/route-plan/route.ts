// app/api/route-plan/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      origin,
      destination,
      batteryPercent,
      vehicleRangeKm = 400,
    } = await req.json();

    const BASE =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 1. Geocode origin + destination
    const [originGeo, destGeo] = await Promise.all([
      fetch(
        `${BASE}/api/geocode?address=${encodeURIComponent(origin)}`
      ).then((r) => r.json()),

      fetch(
        `${BASE}/api/geocode?address=${encodeURIComponent(destination)}`
      ).then((r) => r.json()),
    ]);

    if (originGeo.error || destGeo.error) {
      return NextResponse.json(
        { error: "Could not geocode locations" },
        { status: 400 }
      );
    }

    // 2. ORS route fetch with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let routeData: any;

    try {
      const orsRes = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car/json",
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            Authorization: process.env.ORS_API_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [
              [originGeo.lon, originGeo.lat],
              [destGeo.lon, destGeo.lat],
            ],
            elevation: true,
          }),
        }
      );

      clearTimeout(timeout);

      if (!orsRes.ok) {
        const text = await orsRes.text();
        throw new Error(`ORS error: ${text}`);
      }

      routeData = await orsRes.json();
    } catch (err) {
      console.error("ORS failed:", err);

      return NextResponse.json(
        {
          error:
            "Unable to fetch route from OpenRouteService. Check API key or internet connection.",
        },
        { status: 500 }
      );
    }

    if (!routeData.routes?.[0]) {
      return NextResponse.json(
        { error: "No route found" },
        { status: 400 }
      );
    }

    const route = routeData.routes[0];
    const segment = route.segments[0];

    const distanceKm = segment.distance / 1000;
    const durationMin = segment.duration / 60;
    const elevationGain = route.ascent || 0;

    // 3. Weather midpoint
    const midLat = (originGeo.lat + destGeo.lat) / 2;
    const midLon = (originGeo.lon + destGeo.lon) / 2;

    const weatherData = await fetch(
      `${BASE}/api/weather?lat=${midLat}&lon=${midLon}`
    ).then((r) => r.json());

    // 4. Battery prediction
    const prediction = await fetch(`${BASE}/api/battery-predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        distanceKm,
        batteryPercent,
        vehicleRangeKm,
        weatherFactor: weatherData.weatherFactor || 1,
        elevationGainM: elevationGain,
      }),
    }).then((r) => r.json());

    // 5. Charging station sampling
    const consumptionRatePerKm =
      prediction.totalBatteryUsed / distanceKm;

    const sampleFractions = [0.2, 0.35, 0.5, 0.65, 0.8];
    const addressHint = `${origin} to ${destination}`;

    const stationFetches = sampleFractions.map(async (frac) => {
      const lat =
        originGeo.lat + (destGeo.lat - originGeo.lat) * frac;

      const lon =
        originGeo.lon + (destGeo.lon - originGeo.lon) * frac;

      const kmHere = distanceKm * frac;
      const batteryHere =
        batteryPercent - consumptionRatePerKm * kmHere;

      try {
        const data = await fetch(
          `${BASE}/api/charging-stations?lat=${lat}&lon=${lon}&radius=15000&address=${encodeURIComponent(
            addressHint
          )}`
        ).then((r) => r.json());

        return {
          stations: data.stations || [],
          frac,
          batteryHere,
          kmHere,
        };
      } catch {
        return {
          stations: [],
          frac,
          batteryHere,
          kmHere,
        };
      }
    });

    const stationResults = await Promise.all(stationFetches);

    // 6. Annotate charging stations
    const seen = new Set<string>();
    const chargingStations: any[] = [];

    for (const result of stationResults) {
      for (const s of result.stations) {
        const key = `${Math.round(s.lat * 100)}_${Math.round(
          s.lon * 100
        )}`;

        if (seen.has(key)) continue;
        seen.add(key);

        const batteryLow = result.batteryHere < 25;

        chargingStations.push({
          ...s,
          routeFraction: result.frac,
          batteryAtPoint: Math.round(result.batteryHere),
          isNeeded:
            !prediction.willReachDestination && batteryLow,
          isCritical:
            !prediction.willReachDestination &&
            result.batteryHere < 15,
        });
      }
    }

    // 7. Default AI insights
    const aiInsights = getDefaultInsights(
      prediction,
      weatherData,
      distanceKm
    );

    return NextResponse.json({
      origin: originGeo,
      destination: destGeo,
      route: {
        distanceKm: Math.round(distanceKm),
        durationMin: Math.round(durationMin),
        elevationGainM: Math.round(elevationGain),
      },
      weather: weatherData,
      battery: prediction,
      chargingStations,
      aiInsights,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getDefaultInsights(
  prediction: any,
  weather: any,
  distanceKm: number
) {
  const ok = prediction.willReachDestination;

  return {
    summary: ok
      ? `Trip possible. Estimated remaining battery ${prediction.remainingBattery?.toFixed(
          0
        )}% after ${Math.round(distanceKm)} km.`
      : `Trip requires charging stop. Battery deficit ${Math.abs(
          prediction.remainingBattery
        )?.toFixed(0)}%.`,

    verdict: ok ? "go" : "charge_enroute",

    tips: ok
      ? [
          "Maintain 80-100 km/h",
          "Use regenerative braking",
          "Avoid sudden acceleration",
        ]
      : [
          "Charge at recommended stop",
          "Drive slower for efficiency",
          "Avoid AC overuse",
        ],

    optimalSpeed: 90,

    chargingAdvice: ok
      ? "No charging stop needed."
      : "Charge before battery drops below 15%.",

    riskLevel: prediction.remainingBattery > 20
      ? "low"
      : prediction.remainingBattery > 0
      ? "medium"
      : "high",
  };
}