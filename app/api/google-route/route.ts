import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const originLat  = req.nextUrl.searchParams.get("originLat");
  const originLng  = req.nextUrl.searchParams.get("originLng");
  const destLat    = req.nextUrl.searchParams.get("destLat");
  const destLng    = req.nextUrl.searchParams.get("destLng");

  if (!originLat || !originLng || !destLat || !destLng) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 });
  }

  // Google Directions API — returns polyline + steps + distance/duration
  const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
  url.searchParams.set("origin",      `${originLat},${originLng}`);
  url.searchParams.set("destination", `${destLat},${destLng}`);
  url.searchParams.set("mode",        "driving");
  url.searchParams.set("units",       "metric");
  url.searchParams.set("key",         key);

  const res  = await fetch(url.toString());
  const data = await res.json();

  if (data.status !== "OK") {
    return NextResponse.json(
      { error: `Google Directions error: ${data.status} — ${data.error_message ?? ""}` },
      { status: 400 }
    );
  }

  const leg = data.routes[0].legs[0];

  return NextResponse.json({
    // Encoded polyline — decoded client-side by @googlemaps/polyline-codec
    encodedPolyline: data.routes[0].overview_polyline.points,
    distanceM:       leg.distance.value,
    durationS:       leg.duration.value,
    distanceText:    leg.distance.text,
    durationText:    leg.duration.text,
    // Turn-by-turn steps for the info panel
    steps: leg.steps.map((s: any) => ({
      instruction: s.html_instructions.replace(/<[^>]+>/g, ""),
      distanceText: s.distance.text,
      durationText: s.duration.text,
      maneuver: s.maneuver ?? null,
    })),
    bounds: data.routes[0].bounds,
  });
}