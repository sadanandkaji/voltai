//app\components\AIInsightsCard.tsx
"use client";
import { AIInsights } from "../lib/types";

interface Props { insights: AIInsights; }

const VERDICT_CONFIG = {
  go:            { icon: "✅", label: "Good to Go",          color: "#4ade80", bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)"  },
  charge_first:  { icon: "🔋", label: "Charge Before Leaving", color: "#fbbf24", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  charge_enroute:{ icon: "⚡", label: "Charge En Route",     color: "#f87171", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)"  },
};

const RISK_CONFIG = {
  low:    { label: "Low Risk",    color: "#4ade80", bg: "rgba(34,197,94,0.1)"  },
  medium: { label: "Medium Risk", color: "#fbbf24", bg: "rgba(245,158,11,0.1)" },
  high:   { label: "High Risk",   color: "#f87171", bg: "rgba(239,68,68,0.1)"  },
};

export default function AIInsightsCard({ insights }: Props) {
  const verdict = VERDICT_CONFIG[insights.verdict] ?? VERDICT_CONFIG.go;
  const risk    = RISK_CONFIG[insights.riskLevel] ?? RISK_CONFIG.low;

  return (
    <div className="flex flex-col gap-4">

      {/* AI Badge */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
          style={{ background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}
        >
          <span>🤖</span> AI Analysis · Claude via OpenRouter
        </div>
        <div
          className="ml-auto rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
          style={{ background: risk.bg, color: risk.color }}
        >
          {risk.label}
        </div>
      </div>

      {/* Verdict banner */}
      <div
        className="rounded-xl p-4 flex items-center gap-3"
        style={{ background: verdict.bg, border: `1px solid ${verdict.border}` }}
      >
        <span className="text-2xl flex-shrink-0">{verdict.icon}</span>
        <div>
          <div className="font-syne font-bold text-sm" style={{ color: verdict.color }}>
            {verdict.label}
          </div>
          <div className="font-mono text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {insights.summary}
          </div>
        </div>
      </div>

      {/* Charging advice */}
      <div
        className="rounded-xl p-3 flex items-start gap-2"
        style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
      >
        <span className="text-base flex-shrink-0 mt-0.5">⚡</span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
            Charging Strategy
          </div>
          <div className="font-syne text-sm" style={{ color: "var(--text-secondary)" }}>
            {insights.chargingAdvice}
          </div>
        </div>
      </div>

      {/* Optimal speed */}
      <div
        className="rounded-xl p-3 flex items-center gap-3"
        style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
          style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
        >
          <span className="font-syne font-extrabold text-lg leading-none text-green-400">
            {insights.optimalSpeed}
          </span>
          <span className="font-mono text-[8px] text-green-400/60 uppercase">km/h</span>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Optimal Speed
          </div>
          <div className="font-syne text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
            Drive at {insights.optimalSpeed} km/h for maximum range efficiency
          </div>
        </div>
      </div>

      {/* AI Tips */}
      <div className="flex flex-col gap-2">
        <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Smart Tips
        </div>
        {insights.tips.map((tip, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl p-3"
            style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 font-mono text-[10px] text-green-400 font-bold mt-0.5"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              {i + 1}
            </div>
            <span className="font-syne text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}