"use client";
import { ChargingStation } from "../lib/types";

interface Props { stations: ChargingStation[]; }

export default function ChargingStopCard({ stations }: Props) {
  if (!stations.length) return null;

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-4"
      style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.2)" }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">⚡</span>
        <div>
          <div className="font-syne font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            Charging Stops Needed
          </div>
          <div className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {stations.length} station{stations.length > 1 ? "s" : ""} near midpoint
          </div>
        </div>
        <div
          className="ml-auto flex-shrink-0 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
          style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}
        >
          Required
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
            <div
              className="flex-shrink-0 mt-0.5 rounded-lg px-2 py-1 font-mono text-xs"
              style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              #{i + 1}
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
                  {s.connectors} connector{s.connectors !== 1 ? "s" : ""}
                </span>
                {s.fastCharge && (
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}
                  >
                    ⚡ Fast Charge
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}