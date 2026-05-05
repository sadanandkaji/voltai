"use client";
import { WeatherData } from "../lib/types";

interface Props { weather: WeatherData; }

const CONDITION_ICONS: Record<string, string> = {
  "Ideal": "☀️", "Cold": "🌤️", "Freezing": "❄️",
  "Heavy Rain": "🌧️", "High Winds": "💨", "Very Hot": "🔆",
};

export default function WeatherCard({ weather }: Props) {
  const pct    = Math.round((1 - weather.weatherFactor) * 100);
  const icon   = CONDITION_ICONS[weather.conditions] || "🌡️";
  const isGood = weather.weatherFactor >= 0.95;
  const badgeColor = isGood ? "good" : pct > 15 ? "bad" : "warn";

  const badgeStyles = {
    good: { bg: "rgba(34,197,94,0.12)", color: "#4ade80",  border: "rgba(34,197,94,0.25)"  },
    warn: { bg: "rgba(245,158,11,0.12)",color: "#fbbf24",  border: "rgba(245,158,11,0.25)" },
    bad:  { bg: "rgba(239,68,68,0.12)", color: "#f87171",  border: "rgba(239,68,68,0.25)"  },
  }[badgeColor];

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-4"
      style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
        >
          <span className="text-2xl leading-none">{icon}</span>
        </div>
        <div>
          <div className="font-syne font-bold text-base" style={{ color: "var(--text-primary)" }}>
            {weather.conditions}
          </div>
          <div className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {pct === 0 ? "No range impact" : `−${pct}% range impact`}
          </div>
        </div>
        <div
          className="ml-auto rounded-full px-3 py-1 font-syne font-bold text-sm flex-shrink-0"
          style={{ background: badgeStyles.bg, color: badgeStyles.color, border: `1px solid ${badgeStyles.border}` }}
        >
          {Math.round(weather.weatherFactor * 100)}%
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: "🌡️", label: "Temp",  value: `${weather.temperature}°C` },
          { icon: "💨", label: "Wind",  value: `${weather.wind_speed} km/h` },
          { icon: "🌧️", label: "Rain",  value: `${weather.precipitation} mm` },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-2 text-center"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
          >
            <div className="text-base mb-0.5">{m.icon}</div>
            <div className="font-syne font-bold text-sm" style={{ color: "var(--text-primary)" }}>{m.value}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--text-muted)" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Efficiency bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          <span>Efficiency</span>
          <span style={{ color: isGood ? "#4ade80" : "#f87171" }}>
            {Math.round(weather.weatherFactor * 100)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${weather.weatherFactor * 100}%`,
              background: isGood ? "#22c55e" : pct > 15 ? "#ef4444" : "#f59e0b",
            }}
          />
        </div>
      </div>
    </div>
  );
}