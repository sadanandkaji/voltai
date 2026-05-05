export interface GeoLocation {
  lat: number;
  lon: number;
  display_name: string;
}

export interface WeatherData {
  temperature: number;
  wind_speed: number;
  precipitation: number;
  weatherFactor: number;
  conditions: string;
}

export interface BatteryPrediction {
  totalBatteryUsed: number;
  remainingBattery: number;
  effectiveRange: number;
  willReachDestination: boolean;
  safetyBuffer: number;
  breakdowns: {
    weatherImpact: string;
    speedImpact: string;
    elevationImpact: string;
  };
}

export interface RouteInfo {
  distanceKm: number;
  durationMin: number;
  elevationGainM: number;
}

export interface ChargingStation {
  id: number;
  name: string;
  address: string;
  lat: number;
  lon: number;
  connectors: number;
  fastCharge: boolean;
}

export interface RoutePlanResult {
  origin: GeoLocation;
  destination: GeoLocation;
  route: RouteInfo;
  weather: WeatherData;
  battery: BatteryPrediction;
  chargingStations: ChargingStation[];
}

export interface RouteFormData {
  origin: string;
  destination: string;
  batteryPercent: number;
  vehicleRangeKm: number;
}