"use client";
import { ChargingStation } from "../lib/types";

interface Props {
  stations: ChargingStation[];
  willReach?: boolean;
}

export default function ChargingStopCard({ stations, willReach = false }: Props) {
  if (!stations.length) return null;

  const fastCount = stations.filter(s => s.fastCharge).length;

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-4"
      style={{
        background: willReach ? "rgba(59,130,246,0.04)" : "rgba(239,68,68,0.04)",
        border: `1px solid ${willReach ? "rgba(59,130,246,0.2)" : "rgba(239,68,68,0.2)"}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{willReach ? "📍" : "⚡"}</span>
        <div>
          <div className="font-syne font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            {willReach ? "Nearby Stations Along Route" : "Charging Stop Required"}
          </div>
          <div className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {stations.length} station{stations.length > 1 ? "s" : ""} found · {fastCount} fast DC charger{fastCount !== 1 ? "s" : ""}
          </div>
        </div>
        <div
          className="ml-auto flex-shrink-0 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
          style={{
            background: willReach ? "rgba(59,130,246,0.12)" : "rgba(239,68,68,0.12)",
            color: willReach ? "#60a5fa" : "#f87171",
            border: `1px solid ${willReach ? "rgba(59,130,246,0.25)" : "rgba(239,68,68,0.25)"}`,
          }}
        >
          {willReach ? "Optional" : "Required"}
        </div>
      </div>

      {/* Station list */}
      <div className="flex flex-col gap-2">
        {stations.map((s, i) => (
          <div
            key={s.id}
            className="flex gap-3 items-start rounded-xl p-3"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
          >
            {/* Index / fast badge */}
            <div
              className="flex-shrink-0 mt-0.5 rounded-lg px-2 py-1 font-mono text-xs min-w-[28px] text-center"
              style={{
                background: s.fastCharge ? "rgba(245,158,11,0.1)" : "var(--input-bg)",
                border: `1px solid ${s.fastCharge ? "rgba(245,158,11,0.3)" : "var(--border)"}`,
                color: s.fastCharge ? "#fbbf24" : "var(--text-muted)",
              }}
            >
              {s.fastCharge ? "⚡" : `#${i + 1}`}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-syne font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                {s.name}
              </div>
              <div className="font-mono text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>
                {s.address || "Address unavailable"}
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  🔌 {s.connectors} port{s.connectors !== 1 ? "s" : ""}
                </span>
                {s.fastCharge && (
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#fbbf24" }}
                  >
                    ⚡ Fast DC
                  </span>
                )}
                {s.powerKw ? (
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}
                  >
                    {s.powerKw}kW
                  </span>
                ) : null}
                {s.network ? (
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa" }}
                  >
                    {s.network}
                  </span>
                ) : null}
              </div>
            </div>

            {/* Source badge */}
            <div className="flex-shrink-0 text-right">
              <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                {s.source === "tavily" ? "📡 AI" : "📍 OCM"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!willReach && (
        <div
          className="rounded-xl px-3 py-2.5 flex items-start gap-2"
          style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <span className="text-sm flex-shrink-0 mt-0.5">💡</span>
          <span className="font-mono text-xs leading-relaxed" style={{ color: "#fbbf24" }}>
            Tap a charger pin on the map above for directions and live connector info
          </span>
        </div>
      )}
    </div>
  );
}