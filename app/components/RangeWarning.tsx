"use client";
import { BatteryPrediction, RouteInfo } from "../lib/types";
import { formatDuration, formatDistance } from "../lib/routeUtils";

interface Props { battery: BatteryPrediction; route: RouteInfo; }

export default function RangeWarning({ battery, route }: Props) {
  const remaining = Math.max(0, battery.remainingBattery);
  const isOk = battery.willReachDestination;

  const summaryItems = [
    { icon: "📍", label: "Distance",  value: formatDistance(route.distanceKm) },
    { icon: "⏱️", label: "ETA",       value: formatDuration(route.durationMin) },
    { icon: "⛰️", label: "Elevation", value: `+${route.elevationGainM}m` },
    { icon: "🔋", label: "Eff. Range",value: `${battery.effectiveRange} km` },
  ];

  const breakdowns = [
    { label: "🌤️ Weather",   value: battery.breakdowns.weatherImpact },
    { label: "🏎️ Speed",     value: battery.breakdowns.speedImpact },
    { label: "⛰️ Elevation", value: battery.breakdowns.elevationImpact },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Summary grid */}
      <div className="grid grid-cols-2 gap-2">
        {summaryItems.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3 flex flex-col gap-1"
            style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{s.icon}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{s.label}</span>
            </div>
            <div className="font-syne font-bold text-base" style={{ color: "var(--text-primary)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Impact breakdown */}
      <div
        className="rounded-xl p-4 flex flex-col gap-3"
        style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Battery Impact Factors
        </div>
        <div className="flex flex-col gap-2">
          {breakdowns.map((b) => {
            const isZero = b.value.startsWith("0%");
            return (
              <div key={b.label} className="flex items-center justify-between">
                <span className="font-syne text-sm" style={{ color: "var(--text-secondary)" }}>{b.label}</span>
                <span
                  className="font-mono text-sm font-semibold"
                  style={{ color: isZero ? "var(--text-muted)" : "#f87171" }}
                >
                  {b.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verdict */}
      <div
        className="rounded-xl p-4 flex items-start gap-3"
        style={{
          background: isOk ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
          border: `1px solid ${isOk ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
        }}
      >
        <span className="text-2xl flex-shrink-0 mt-0.5">{isOk ? "✅" : "⚠️"}</span>
        <div>
          <div className="font-syne font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            {isOk
              ? `Arriving with ${remaining.toFixed(0)}% battery`
              : `Not enough charge — ${Math.abs(remaining).toFixed(0)}% short`}
          </div>
          <div className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {isOk
              ? `Safety buffer: ${battery.safetyBuffer}% · Trip looks good!`
              : "Please charge before departing or find a stop en route"}
          </div>
        </div>
      </div>
    </div>
  );
}