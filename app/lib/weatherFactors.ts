//app\lib\weatherFactors.ts
export interface WeatherFactorBreakdown {
  tempFactor: number;
  windFactor: number;
  rainFactor: number;
  combined: number;
  label: string;
  emoji: string;
}

export function calcWeatherFactor(
  temp: number,
  windKmh: number,
  rainMm: number
): WeatherFactorBreakdown {
  let tempFactor = 1.0;
  if (temp < -10) tempFactor = 0.62;
  else if (temp < 0) tempFactor = 0.70;
  else if (temp < 10) tempFactor = 0.85;
  else if (temp >= 10 && temp <= 25) tempFactor = 1.0;
  else if (temp > 35) tempFactor = 0.90;

  const windFactor = windKmh > 80 ? 0.85 : windKmh > 50 ? 0.90 : 1.0;
  const rainFactor = rainMm > 10 ? 0.93 : rainMm > 2 ? 0.97 : 1.0;

  const combined = Math.max(tempFactor * windFactor * rainFactor, 0.5);

  let label = "Ideal";
  let emoji = "☀️";
  if (combined < 0.65) { label = "Severe Impact"; emoji = "🥶"; }
  else if (combined < 0.75) { label = "Heavy Impact"; emoji = "❄️"; }
  else if (combined < 0.85) { label = "Moderate Impact"; emoji = "🌧️"; }
  else if (combined < 0.95) { label = "Mild Impact"; emoji = "🌤️"; }

  return { tempFactor, windFactor, rainFactor, combined, label, emoji };
}

export function getTempDescription(temp: number): string {
  if (temp < 0) return "Freezing – battery heavily affected";
  if (temp < 10) return "Cold – reduced range expected";
  if (temp > 35) return "Very hot – AC increases drain";
  return "Comfortable temperature";
}