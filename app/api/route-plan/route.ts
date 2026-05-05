// app/api/route-plan/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { origin, destination, batteryPercent, vehicleRangeKm = 400 } = await req.json();
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // 1. Geocode both locations
  const [originGeo, destGeo] = await Promise.all([
    fetch(`${BASE}/api/geocode?address=${encodeURIComponent(origin)}`).then(r => r.json()),
    fetch(`${BASE}/api/geocode?address=${encodeURIComponent(destination)}`).then(r => r.json()),
  ]);

  // 2. Get route from OpenRouteService
  const orsRes = await fetch("https://api.openrouteservice.org/v2/directions/driving-car/json", {
    method: "POST",
    headers: {
      "Authorization": process.env.ORS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinates: [
        [originGeo.lon, originGeo.lat],
        [destGeo.lon, destGeo.lat],
      ],
      elevation: true,
    }),
  });
  const routeData = await orsRes.json();
  const segment = routeData.routes[0].segments[0];
  const distanceKm = segment.distance / 1000;
  const durationMin = segment.duration / 60;
  const elevationGain = routeData.routes[0].ascent || 0;

  // 3. Get weather at midpoint
  const midLat = (originGeo.lat + destGeo.lat) / 2;
  const midLon = (originGeo.lon + destGeo.lon) / 2;
  const weatherData = await fetch(`${BASE}/api/weather?lat=${midLat}&lon=${midLon}`).then(r => r.json());

  // 4. Predict battery
  const prediction = await fetch(`${BASE}/api/battery-predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      distanceKm,
      batteryPercent,
      vehicleRangeKm,
      weatherFactor: weatherData.weatherFactor,
      elevationGainM: elevationGain,
    }),
  }).then(r => r.json());

  // 5. Get charging stations if needed
  let chargingStations = [];
  if (!prediction.willReachDestination) {
    const stationsRes = await fetch(`${BASE}/api/charging-stations?lat=${midLat}&lon=${midLon}&radius=15000`);
    const stationsData = await stationsRes.json();
    chargingStations = stationsData.stations;
  }

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
  });
}