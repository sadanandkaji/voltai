// app/api/battery-predict/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    distanceKm,
    batteryPercent,       // current battery %
    vehicleRangeKm = 400, // max range on full charge
    weatherFactor = 1.0,
    elevationGainM = 0,   // positive = uphill
    speedKmh = 100,
    passengers = 1,
    cargoKg = 0,
  } = body;

  // Base consumption per km (% per km)
  const baseConsumptionPerKm = 100 / vehicleRangeKm;

  // Speed factor: efficiency drops above 100 km/h
  const speedFactor = speedKmh > 100
    ? 1 + ((speedKmh - 100) / 100) * 0.3
    : speedKmh < 60 ? 1.05 : 1.0;

  // Elevation factor: 100m gain ≈ +3% extra consumption
  const elevationFactor = 1 + (elevationGainM / 100) * 0.03;

  // Load factor
  const loadFactor = 1 + (passengers - 1) * 0.02 + (cargoKg / 500) * 0.05;

  // Final consumption
  const adjustedConsumptionPerKm =
    baseConsumptionPerKm * speedFactor * elevationFactor * loadFactor * (1 / weatherFactor);

  const totalBatteryUsed = adjustedConsumptionPerKm * distanceKm;
  const remainingBattery = batteryPercent - totalBatteryUsed;
  const effectiveRange = (batteryPercent / 100) * vehicleRangeKm * weatherFactor;

  return NextResponse.json({
    totalBatteryUsed: Math.round(totalBatteryUsed * 10) / 10,
    remainingBattery: Math.round(remainingBattery * 10) / 10,
    effectiveRange: Math.round(effectiveRange),
    willReachDestination: remainingBattery > 5, // 5% safety buffer
    safetyBuffer: Math.max(0, Math.round(remainingBattery - 5)),
    breakdowns: {
      weatherImpact: `${Math.round((1 - weatherFactor) * 100)}% reduction`,
      speedImpact: `${Math.round((speedFactor - 1) * 100)}% increase`,
      elevationImpact: `${Math.round((elevationFactor - 1) * 100)}% increase`,
    },
  });
}