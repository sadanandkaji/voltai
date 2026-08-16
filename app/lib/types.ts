// app/lib/types.ts

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
  source?: "google" | "open-meteo";
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
    loadImpact?: string;
  };
}

export interface RouteInfo {
  distanceKm: number;
  durationMin: number;
  elevationGainM: number;
}

export interface ChargingStation {
  id: number | string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  connectors: number;
  fastCharge: boolean;
  powerKw?: number;
  network?: string;
  source?: "websearch" | "provider" | "openchargemap";
  // Battery-aware annotation fields (set by route-plan API)
  batteryAtPoint?: number;  // estimated battery % when arriving at this station
  isNeeded?: boolean;       // true = driver SHOULD stop here based on battery
  isCritical?: boolean;     // true = driver MUST stop here (battery critically low)
  routeFraction?: number;   // 0–1 position along the route
}

export interface AIInsights {
  summary: string;
  verdict: "go" | "charge_first" | "charge_enroute";
  tips: string[];
  optimalSpeed: number;
  chargingAdvice: string;
  riskLevel: "low" | "medium" | "high";
}

export interface RoutePlanResult {
  origin: GeoLocation;
  destination: GeoLocation;
  route: RouteInfo;
  weather: WeatherData;
  battery: BatteryPrediction;
  chargingStations: ChargingStation[];
  aiInsights?: AIInsights;
  savedRouteId: string | null;
  creditsRemaining: number;
}

export interface RouteFormData {
  origin: string;
  destination: string;
  batteryPercent: number;
  vehicleRangeKm: number;
}