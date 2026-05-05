import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  try {
    const address = req.nextUrl.searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address required" },
        { status: 400 }
      );
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`;

    const res = await fetchWithTimeout(
      url,
      {
        headers: {
          "User-Agent": "EVRangePredictor/1.0",
        },
        cache: "no-store",
      },
      7000
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Geocoding service unavailable" },
        { status: 500 }
      );
    }

    const text = await res.text();

    if (!text) {
      return NextResponse.json(
        { error: "Empty geocode response" },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);

    if (!data.length) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
      display_name: data[0].display_name,
    });
  } catch (error) {
    console.error("Geocode error:", error);

    return NextResponse.json(
      { error: "Failed to geocode location" },
      { status: 500 }
    );
  }
}