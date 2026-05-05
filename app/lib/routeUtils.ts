export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m} min`;
  return `${h}h ${m}m`;
}

export function formatDistance(km: number): string {
  return km >= 1000 ? `${(km / 1000).toFixed(1)}k km` : `${km} km`;
}

export function getBatteryColor(percent: number): string {
  if (percent > 50) return "#22c55e";
  if (percent > 20) return "#f59e0b";
  if (percent > 10) return "#ef4444";
  return "#dc2626";
}

export function getBatteryStatus(percent: number): string {
  if (percent > 60) return "Excellent";
  if (percent > 40) return "Good";
  if (percent > 20) return "Low";
  if (percent > 10) return "Critical";
  return "Empty";
}

export function midpoint(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): { lat: number; lon: number } {
  return {
    lat: (lat1 + lat2) / 2,
    lon: (lon1 + lon2) / 2,
  };
}

export function haversineKm(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}