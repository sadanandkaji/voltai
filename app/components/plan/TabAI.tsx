// app/components/plan/TabAI.tsx
"use client";
import { RoutePlanResult } from "../../lib/types";
import SectionTitle from "./SectionTitle";

export default function TabAI({ result }: { result: RoutePlanResult }) {
  const { aiInsights } = result;

  if (!aiInsights)
    return (
      <div style={{ padding: 48, textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
        AI analysis not available for this trip.
      </div>
    );

  const verdictCfg: Record<string, { icon: string; label: string; color: string; bg: string; border: string }> = {
    go: { icon: "✅", label: "Good to Go", color: "#16a34a", bg: "rgba(16,185,129,.07)", border: "rgba(16,185,129,.2)" },
    charge_first: { icon: "🔋", label: "Charge Before Leaving", color: "#d97706", bg: "rgba(217,119,6,.07)", border: "rgba(217,119,6,.2)" },
    charge_enroute: { icon: "⚡", label: "Charge En Route", color: "#dc2626", bg: "rgba(220,38,38,.07)", border: "rgba(220,38,38,.2)" },
  };
  const v = verdictCfg[aiInsights.verdict] ?? verdictCfg.go;

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Verdict */}
      <div style={{ background: v.bg, border: `1px solid ${v.border}`, borderRadius: 12, padding: 14, display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>{v.icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: v.color }}>{v.label}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 4, lineHeight: 1.5 }}>{aiInsights.summary}</div>
        </div>
      </div>

      {/* Optimal speed */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            flexShrink: 0,
            background: "var(--green-dim)",
            border: "1px solid var(--green-border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--green)", lineHeight: 1, letterSpacing: -1 }}>{aiInsights.optimalSpeed}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--green)", opacity: 0.6, textTransform: "uppercase", letterSpacing: ".05em" }}>km/h</div>
        </div>
        <div>
          <SectionTitle>Optimal Speed</SectionTitle>
          <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>Drive at {aiInsights.optimalSpeed} km/h for maximum range efficiency on this route</div>
        </div>
      </div>

      {/* Charging advice */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
        <SectionTitle>⚡ Charging Strategy</SectionTitle>
        <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{aiInsights.chargingAdvice}</div>
      </div>

      {/* AI badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 10px",
            borderRadius: 20,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".06em",
            background: "rgba(124,58,237,.08)",
            color: "#7c3aed",
            border: "1px solid rgba(124,58,237,.2)",
          }}
        >
          🤖 Claude · AI Analysis
        </div>
      </div>

      {/* Tips */}
      <div>
        <SectionTitle>Smart Tips</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {aiInsights.tips.map((tip: string, i: number) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  flexShrink: 0,
                  marginTop: 1,
                  background: "var(--green-dim)",
                  border: "1px solid var(--green-border)",
                  color: "var(--green)",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.55 }}>{tip}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trip score */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
        <SectionTitle>Trip Score</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, color: "var(--green)", lineHeight: 1 }}>B+</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 4 }}>78 / 100</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Speed control", pct: 82, color: "#16a34a" },
              { label: "Braking", pct: 65, color: "#d97706" },
              { label: "Regen use", pct: 78, color: "#2563eb" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", minWidth: 90 }}>{row.label}</div>
                <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", minWidth: 22, textAlign: "right" }}>{row.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}