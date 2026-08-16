// app/components/plan/TabNavigate.tsx
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { RoutePlanResult } from "../../lib/types";
import SectionTitle from "./SectionTitle";
import StatCard from "./StatCard";

const RouteMap = dynamic(() => import("../RouteMap"), { ssr: false });

interface Props {
  result: RoutePlanResult;
  startBat: number;
  dark: boolean;
}

export default function TabNavigate({ result, startBat, dark }: Props) {
  const { origin, destination, route, weather, battery, chargingStations } = result;
  const [subTab, setSubTab] = useState<"map" | "details">("map");

  const weatherIcon =
    weather.conditions === "Ideal"
      ? "☀️"
      : weather.conditions.includes("Rain")
      ? "🌧️"
      : weather.conditions.includes("Cold")
      ? "❄️"
      : weather.conditions.includes("Wind")
      ? "💨"
      : "🌡️";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Sub-tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", background: "var(--surface)", flexShrink: 0 }}>
        {([["map", "🗺 Map"], ["details", "📋 Details"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setSubTab(id as any)}
            style={{
              padding: "9px 18px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: ".06em",
              color: subTab === id ? "var(--green)" : "var(--text3)",
              border: "none",
              background: "none",
              cursor: "pointer",
              borderBottom: `2px solid ${subTab === id ? "var(--green)" : "transparent"}`,
              marginBottom: -1,
              transition: "all .15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Map */}
      {subTab === "map" && (
        <div style={{ flex: 1, overflow: "hidden" }}>
          <RouteMap
            origin={origin}
            destination={destination}
            chargingStations={chargingStations}
            batteryPercent={startBat}
            remainingBattery={battery.remainingBattery}
            theme={dark ? "dark" : "light"}
          />
        </div>
      )}

      {/* Details */}
      {subTab === "details" && (
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Route options */}
          <div>
            <SectionTitle>Route Options</SectionTitle>
            <div className="vq-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[
                { label: "Eco ⭐", dist: route.distanceKm, bat: battery.totalBatteryUsed, isMain: true },
                { label: "Fastest", dist: Math.round(route.distanceKm * 0.89), bat: Math.round(battery.totalBatteryUsed * 1.42), isMain: false },
                { label: "Shortest", dist: Math.round(route.distanceKm * 0.81), bat: Math.round(battery.totalBatteryUsed * 1.76), isMain: false },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    background: "var(--surface)",
                    border: `1px solid ${r.isMain ? "var(--green)" : "var(--border)"}`,
                    borderRadius: 12,
                    padding: 12,
                    borderTop: r.isMain ? `2px solid var(--green)` : undefined,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      color: r.isMain ? "var(--green)" : "var(--text3)",
                      marginBottom: 4,
                    }}
                  >
                    {r.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>
                    {r.dist}
                    <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 2 }}>km</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", marginTop: 2 }}>−{r.bat}% bat</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="vq-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <StatCard label="Predicted range" value={`${battery.effectiveRange} km`} sub="After weather & style" />
            <StatCard
              label="ETA"
              value={`${Math.floor(route.durationMin / 60)}h ${route.durationMin % 60}m`}
              sub={chargingStations.length > 0 ? "Incl. charge stop" : "No charge stop"}
            />
          </div>

          {/* Weather */}
          <div>
            <SectionTitle>Weather Impact</SectionTitle>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{weatherIcon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{weather.conditions}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
                    {Math.round((1 - weather.weatherFactor) * 100)}% range reduction
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--green)" }}>{Math.round(weather.weatherFactor * 100)}%</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)" }}>efficiency</div>
                </div>
              </div>
              <div className="vq-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                {[
                  { val: `${weather.temperature}°C`, key: "Temp" },
                  { val: `${weather.wind_speed}km/h`, key: "Wind" },
                  { val: weather.precipitation > 0 ? `${weather.precipitation}mm` : "Dry", key: "Rain" },
                ].map((w) => (
                  <div
                    key={w.key}
                    style={{
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "8px 4px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{w.val}</div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        marginTop: 2,
                      }}
                    >
                      {w.key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Power mode */}
          <div>
            <SectionTitle>Power Mode</SectionTitle>
            <div className="vq-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
              {[
                { icon: "🌿", label: "Eco", active: true },
                { icon: "🏎", label: "Sport", active: false },
                { icon: "🌙", label: "Night", active: false },
                { icon: "💾", label: "Save", active: false },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    padding: "10px 4px",
                    borderRadius: 8,
                    textAlign: "center",
                    cursor: "pointer",
                    background: m.active ? "var(--green-dim)" : "var(--surface2)",
                    border: `1px solid ${m.active ? "var(--green-border)" : "var(--border)"}`,
                  }}
                >
                  <div style={{ fontSize: 18 }}>{m.icon}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: ".05em",
                      marginTop: 4,
                      color: m.active ? "var(--green)" : "var(--text3)",
                      fontWeight: m.active ? 700 : 400,
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text3)",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "8px 12px",
                lineHeight: 1.5,
              }}
            >
              Eco mode active — range extended ~18km. Regenerative braking on.
            </div>
          </div>

          <button
            style={{
              width: "100%",
              padding: 11,
              background: "var(--green)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Start Navigation →
          </button>
        </div>
      )}
    </div>
  );
}