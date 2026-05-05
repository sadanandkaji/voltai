// app/api/charging-stations/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");
  const radius = req.nextUrl.searchParams.get("radius") || "10000"; // 10km

  // OpenChargeMap free API
  const url = `https://api.openchargemap.io/v3/poi?output=json&latitude=${lat}&longitude=${lon}&distance=${parseInt(radius)/1000}&distanceunit=km&maxresults=5&key=${process.env.OPEN_CHARGE_MAP_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const stations = data.map((s: any) => ({
    id: s.ID,
    name: s.AddressInfo.Title,
    address: s.AddressInfo.AddressLine1,
    lat: s.AddressInfo.Latitude,
    lon: s.AddressInfo.Longitude,
    connectors: s.Connections?.length || 0,
    fastCharge: s.Connections?.some((c: any) => c.PowerKW > 50),
  }));

  return NextResponse.json({ stations });
}