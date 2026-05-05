export interface BatteryInput {
  distanceKm: number;
  batteryPercent: number;
  vehicleRangeKm?: number;
  weatherFactor?: number;
  elevationGainM?: number;
  speedKmh?: number;
  passengers?: number;
  cargoKg?: number;
}

export interface BatteryOutput {
  totalBatteryUsed: number;
  remainingBattery: number;
  effectiveRange: number;
  willReachDestination: boolean;
  safetyBuffer: number;
  consumptionPer100km: number;
  breakdowns: {
    weatherImpact: string;
    speedImpact: string;
    elevationImpact: string;
    loadImpact: string;
  };
}

export function predictBattery(input: BatteryInput): BatteryOutput {
  const {
    distanceKm,
    batteryPercent,
    vehicleRangeKm = 400,
    weatherFactor = 1.0,
    elevationGainM = 0,
    speedKmh = 100,
    passengers = 1,
    cargoKg = 0,
  } = input;

  const baseConsumptionPerKm = 100 / vehicleRangeKm;

  // Speed factor: penalty above 100 km/h, slight penalty under 60 (stop-start)
  const speedFactor =
    speedKmh > 130 ? 1 + ((speedKmh - 100) / 100) * 0.45
    : speedKmh > 100 ? 1 + ((speedKmh - 100) / 100) * 0.30
    : speedKmh < 60 ? 1.05
    : 1.0;

  // Elevation: every 100m gain adds ~3% extra draw
  const elevationFactor = 1 + (Math.max(0, elevationGainM) / 100) * 0.03;

  // Load factor
  const loadFactor = 1 + (passengers - 1) * 0.02 + (cargoKg / 500) * 0.05;

  // Weather penalizes range (denominator = reduces effective km per %)
  const adjustedPerKm =
    baseConsumptionPerKm * speedFactor * elevationFactor * loadFactor * (1 / weatherFactor);

  const totalBatteryUsed = adjustedPerKm * distanceKm;
  const remainingBattery = batteryPercent - totalBatteryUsed;
  const effectiveRange = Math.round((batteryPercent / 100) * vehicleRangeKm * weatherFactor);
  const consumptionPer100km = Math.round(adjustedPerKm * 100 * 10) / 10;

  return {
    totalBatteryUsed: Math.round(totalBatteryUsed * 10) / 10,
    remainingBattery: Math.round(remainingBattery * 10) / 10,
    effectiveRange,
    willReachDestination: remainingBattery > 5,
    safetyBuffer: Math.max(0, Math.round(remainingBattery - 5)),
    consumptionPer100km,
    breakdowns: {
      weatherImpact: `${Math.round((1 - weatherFactor) * 100)}% reduction`,
      speedImpact: `${Math.round((speedFactor - 1) * 100)}% increase`,
      elevationImpact: `${Math.round((elevationFactor - 1) * 100)}% increase`,
      loadImpact: `${Math.round((loadFactor - 1) * 100)}% increase`,
    },
  };
}