// app/components/plan/TabChargers.tsx
"use client";
import { RoutePlanResult } from "../../lib/types";
import SectionTitle from "./SectionTitle";

export default function TabChargers({ result }: { result: RoutePlanResult }) {
  const { chargingStations, battery } = result;

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SectionTitle>{battery.willReachDestination ? "Nearby Chargers" : "Required Stops"}</SectionTitle>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            background: "var(--green-dim)",
            color: "var(--green)",
            border: "1px solid var(--green-border)",
            padding: "2px 8px",
            borderRadius: 20,
            marginTop: -8,
          }}
        >
          {chargingStations.length} found
        </div>
      </div>

      {chargingStations.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 32, textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
          No charging stations found along this route.
        </div>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {chargingStations.map((s: any, i: number) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                gap: 10,
                padding: 14,
                borderBottom: i < chargingStations.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "flex-start",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  padding: "3px 6px",
                  borderRadius: 4,
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  flexShrink: 0,
                  marginTop: 1,
                  background: s.isCritical ? "rgba(220,38,38,.1)" : s.isNeeded ? "rgba(217,119,6,.1)" : s.fastCharge ? "rgba(217,119,6,.08)" : "var(--surface2)",
                  color: s.isCritical ? "#dc2626" : s.isNeeded ? "#d97706" : s.fastCharge ? "#d97706" : "var(--text3)",
                  border: `1px solid ${s.isCritical ? "rgba(220,38,38,.25)" : s.isNeeded ? "rgba(217,119,6,.25)" : "var(--border)"}`,
                }}
              >
                {s.isCritical ? "🛑 STOP" : s.isNeeded ? "⚡ GO" : s.fastCharge ? "⚡ DC" : "AC"}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                {s.address && (
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 6 }}>{s.address}</div>
                )}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "var(--surface2)", color: "var(--text3)", border: "1px solid var(--border)" }}>
                    🔌 {s.connectors} port{s.connectors !== 1 ? "s" : ""}
                  </span>
                  {s.powerKw && (
                    <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "var(--green-dim)", color: "var(--green)", border: "1px solid var(--green-border)" }}>
                      {s.powerKw}kW
                    </span>
                  )}
                  {s.network && (
                    <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "rgba(124,58,237,.08)", color: "#7c3aed", border: "1px solid rgba(124,58,237,.2)" }}>
                      {s.network}
                    </span>
                  )}
                  {s.batteryAtPoint !== undefined && (
                    <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "rgba(37,99,235,.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,.2)" }}>
                      🔋 {s.batteryAtPoint.toFixed(0)}% on arrival
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alerts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 8, padding: "9px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#065f46", lineHeight: 1.5 }}>
          Auto-stop planned at first charger along eco route.
        </div>
        {!battery.willReachDestination && (
          <div style={{ background: "rgba(220,38,38,.07)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 8, padding: "9px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", lineHeight: 1.5 }}>
            ⚠️ Battery insufficient — a charging stop is required to complete this journey.
          </div>
        )}
      </div>
    </div>
  );
}