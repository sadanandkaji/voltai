// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_WEATHER_API_KEY;

  let temp = 22, wind = 10, rain = 0;
  let conditionCode = "";

  if (apiKey) {
    try {
      // Google Weather API (v1) — currentConditions endpoint
      const url = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${lon}&unitsSystem=METRIC`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();

        // Extract temperature (°C)
        temp = data.temperature?.degrees ?? 22;

        // Extract wind speed (km/h)
        wind = data.wind?.speed?.value ?? 10;
        // Google returns wind in m/s, convert to km/h
        wind = Math.round(wind * 3.6);

        // Extract precipitation (mm/hr from precipitation probability or qpf)
        rain = data.precipitation?.qpf?.quantity ?? 0;

        // Condition code / description
        conditionCode = data.weatherCondition?.description?.text ?? "";
      }
    } catch (err) {
      console.error("Google Weather API error:", err);
      // Fallback to Open-Meteo below
    }
  }

  // Fallback: Open-Meteo (no API key required)
  if (!apiKey || temp === 22) {
    try {
      const fallbackUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation&wind_speed_unit=kmh&timezone=auto`;
      const fallRes = await fetch(fallbackUrl);
      if (fallRes.ok) {
        const fallData = await fallRes.json();
        temp = fallData.current.temperature_2m ?? 22;
        wind = fallData.current.wind_speed_10m ?? 10;
        rain = fallData.current.precipitation ?? 0;
      }
    } catch (err) {
      console.error("Open-Meteo fallback error:", err);
    }
  }

  // ---- Compute weather factor ----
  let weatherFactor = 1.0;
  if (temp < 0)        weatherFactor -= 0.30; // Freezing: -30%
  else if (temp < 10)  weatherFactor -= 0.15; // Cold: -15%
  else if (temp > 35)  weatherFactor -= 0.10; // Hot (AC load): -10%
  if (wind > 80)       weatherFactor -= 0.15; // Very high wind
  else if (wind > 50)  weatherFactor -= 0.10; // High wind: -10%
  if (rain > 10)       weatherFactor -= 0.07; // Heavy rain
  else if (rain > 2)   weatherFactor -= 0.05; // Light rain: -5%

  weatherFactor = Math.max(weatherFactor, 0.5); // floor at 50%

  return NextResponse.json({
    temperature: Math.round(temp * 10) / 10,
    wind_speed:  Math.round(wind),
    precipitation: Math.round(rain * 10) / 10,
    weatherFactor: Math.round(weatherFactor * 100) / 100,
    conditions: conditionCode || getConditionLabel(temp, wind, rain),
    source: apiKey ? "google" : "open-meteo",
  });
}

function getConditionLabel(temp: number, wind: number, rain: number): string {
  if (rain > 10) return "Heavy Rain";
  if (rain > 2)  return "Light Rain";
  if (temp < 0)  return "Freezing";
  if (temp < 10) return "Cold";
  if (wind > 80) return "Storm Winds";
  if (wind > 50) return "High Winds";
  if (temp > 35) return "Very Hot";
  return "Ideal";
}