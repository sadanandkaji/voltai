// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  // Open-Meteo: completely free, no API key
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation&hourly=temperature_2m&wind_speed_unit=kmh&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  const temp = data.current.temperature_2m;
  const wind = data.current.wind_speed_10m;
  const rain = data.current.precipitation;

  // Weather impact factor (1.0 = no impact)
  let weatherFactor = 1.0;
  if (temp < 0)  weatherFactor -= 0.30;   // Severe cold: -30%
  else if (temp < 10) weatherFactor -= 0.15; // Cold: -15%
  else if (temp > 35) weatherFactor -= 0.10; // Hot (AC load): -10%
  if (wind > 50)  weatherFactor -= 0.10;   // High wind: -10%
  if (rain > 2)   weatherFactor -= 0.05;   // Rain drag: -5%

  return NextResponse.json({
    temperature: temp,
    wind_speed: wind,
    precipitation: rain,
    weatherFactor: Math.max(weatherFactor, 0.5), // floor at 50%
    conditions: getConditionLabel(temp, wind, rain),
  });
}

function getConditionLabel(temp: number, wind: number, rain: number): string {
  if (rain > 5) return "Heavy Rain";
  if (temp < 0) return "Freezing";
  if (temp < 10) return "Cold";
  if (wind > 50) return "High Winds";
  if (temp > 35) return "Very Hot";
  return "Ideal";
}