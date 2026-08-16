// app/components/plan/TabAnalytics.tsx
"use client";
import { RoutePlanResult } from "../../lib/types";
import SectionTitle from "./SectionTitle";

export default function TabAnalytics({ result }: { result: RoutePlanResult }) {
  const { battery, route } = result;
  const mfrRange = Math.round(battery.effectiveRange * 1.27);

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Range reality check */}
      <div>
        <SectionTitle>Range Reality Check</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text3)", textDecoration: "line-through" }}>{mfrRange}km</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)", textTransform: "uppercase", marginTop: 2 }}>Manufacturer</div>
            </div>
            <div style={{ fontSize: 16, color: "var(--text3)" }}>→</div>
            <div style={{ flex: 1, textAlign: "center", background: "var(--green-dim)", border: "1px solid var(--green-border)", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--green)" }}>{battery.effectiveRange}km</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--green)", opacity: 0.7, textTransform: "uppercase", marginTop: 2 }}>Real predicted</div>
            </div>
          </div>
          <div
            style={{
              background: "rgba(220,38,38,.06)",
              border: "1px solid rgba(220,38,38,.15)",
              borderRadius: 6,
              padding: "6px 10px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#dc2626",
            }}
          >
            −{mfrRange - battery.effectiveRange}km gap due to weather, style &amp; battery age
          </div>
        </div>
      </div>

      {/* Driving style */}
      <div>
        <SectionTitle>Driving Style Analysis</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Acceleration aggressiveness", pct: 72, val: "−18%", color: "#dc2626" },
            { label: "Hard braking frequency", pct: 48, val: "−7%", color: "#d97706" },
            { label: "Speed consistency", pct: 85, val: "+4%", color: "#16a34a" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text2)", minWidth: 170, flexShrink: 0 }}>{row.label}</div>
              <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: row.color, minWidth: 32, textAlign: "right" }}>{row.val}</div>
            </div>
          ))}
          <div
            style={{
              marginTop: 4,
              background: "rgba(217,119,6,.07)",
              border: "1px solid rgba(217,119,6,.2)",
              borderRadius: 6,
              padding: "7px 10px",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#92400e",
              lineHeight: 1.5,
            }}
          >
            Your style reduces range by 18%. Smooth acceleration saves ~26km.
          </div>
        </div>
      </div>

      {/* Energy breakdown */}
      <div>
        <SectionTitle>Energy Breakdown</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Distance load", pct: 48, color: "#2563eb" },
            { label: "Weather drag", pct: 28, color: "#d97706" },
            { label: "Traffic stops", pct: 15, color: "#dc2626" },
            { label: "Driving style", pct: 18, color: "#7c3aed" },
            { label: "Other", pct: 7, color: "var(--text3)" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text2)", minWidth: 120 }}>{row.label}</div>
              <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", minWidth: 28, textAlign: "right" }}>{row.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Consumption grid */}
      <div>
        <SectionTitle>Consumption Details</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[
            { val: `${battery.totalBatteryUsed}%`, key: "Used", color: "#dc2626" },
            { val: `${Math.max(0, battery.remainingBattery)}%`, key: "Remaining", color: "#16a34a" },
            { val: `${battery.effectiveRange}km`, key: "Eff. Range", color: "#2563eb" },
            { val: `${battery.safetyBuffer}%`, key: "Buffer", color: "#7c3aed" },
            { val: `${route.distanceKm}km`, key: "Distance", color: "#d97706" },
            { val: `${route.durationMin}m`, key: "ETA", color: "#16a34a" },
          ].map((s) => (
            <div key={s.key} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--text3)",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  marginTop: 3,
                }}
              >
                {s.key}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}