// app/components/plan/TabBattery.tsx
"use client";
import dynamic from "next/dynamic";
import { RoutePlanResult } from "../../lib/types";
import SectionTitle from "./SectionTitle";

const BatteryGauge = dynamic(() => import("../BatteryGauge"), { ssr: false });

interface Props {
  result: RoutePlanResult;
  startBat: number;
}

export default function TabBattery({ result, startBat }: Props) {
  const { battery } = result;
  const remaining = Math.max(0, battery.remainingBattery);
  const isOk = battery.willReachDestination;

  // Trips loaded from history may predate the `breakdowns` field, or the
  // saved-route table simply doesn't persist it — never let a missing/partial
  // object crash the tab, fall back to "—" for anything not available.
  const breakdowns = {
    weatherImpact: battery.breakdowns?.weatherImpact ?? "—",
    speedImpact: battery.breakdowns?.speedImpact ?? "—",
    elevationImpact: battery.breakdowns?.elevationImpact ?? "—",
  };

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Gauge */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
        <SectionTitle>Battery Prediction</SectionTitle>
        <BatteryGauge
          before={startBat}
          after={battery.remainingBattery}
          used={battery.totalBatteryUsed}
          willReach={battery.willReachDestination}
          safetyBuffer={battery.safetyBuffer}
        />
      </div>

      {/* Verdict */}
      <div
        style={{
          borderRadius: 10,
          padding: 14,
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          background: isOk ? "rgba(16,185,129,.07)" : "rgba(220,38,38,.07)",
          border: `1px solid ${isOk ? "rgba(16,185,129,.2)" : "rgba(220,38,38,.2)"}`,
        }}
      >
        <span style={{ fontSize: 20, flexShrink: 0 }}>{isOk ? "✅" : "⚠️"}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: isOk ? "#16a34a" : "#dc2626" }}>
            {isOk ? `Arriving with ${remaining.toFixed(0)}% battery` : `${Math.abs(battery.remainingBattery).toFixed(0)}% short — charge stop needed`}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 4, lineHeight: 1.4 }}>
            {isOk ? `Safety buffer: ${battery.safetyBuffer}%` : "Charge before departing or stop en route"}
          </div>
        </div>
      </div>

      {/* Impact factors */}
      <div>
        <SectionTitle>Impact Factors</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {[
            { icon: "🌤", label: "Weather", val: breakdowns.weatherImpact, color: "#dc2626" },
            { icon: "🏎", label: "Speed", val: breakdowns.speedImpact, color: "#d97706" },
            { icon: "⛰", label: "Elevation", val: breakdowns.elevationImpact, color: "var(--text3)" },
          ].map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: 16 }}>{row.icon}</span>
              <span style={{ fontSize: 13, color: "var(--text2)", flex: 1 }}>{row.label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: row.color }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Warning note */}
      <div
        style={{
          background: "rgba(217,119,6,.07)",
          border: "1px solid rgba(217,119,6,.2)",
          borderRadius: 8,
          padding: "10px 12px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "#92400e",
          lineHeight: 1.6,
        }}
      >
        💡 Avoid draining below 15% — real usable range ends ~5km past the 15% mark.
      </div>
    </div>
  );
}