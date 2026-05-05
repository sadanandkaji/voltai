"use client";
import { useEffect, useRef } from "react";
import { getBatteryColor, getBatteryStatus } from "../lib/routeUtils";

interface Props {
  before: number;
  after: number;
  used: number;
  willReach: boolean;
  safetyBuffer: number;
}

export default function BatteryGauge({ before, after, used, willReach, safetyBuffer }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const afterClamped = Math.max(0, after);
  const beforeColor = getBatteryColor(before);
  const afterColor  = getBatteryColor(afterClamped);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(cx, cy) - 12;
    const start = Math.PI * 0.75, end = Math.PI * 2.25;
    const range = end - start;

    ctx.clearRect(0, 0, W, H);

    // Track
    ctx.beginPath(); ctx.arc(cx, cy, R, start, end);
    ctx.strokeStyle = "#1e2a1e"; ctx.lineWidth = 16; ctx.lineCap = "round"; ctx.stroke();

    // Before dim arc
    const beforeAngle = start + (before / 100) * range;
    ctx.beginPath(); ctx.arc(cx, cy, R, start, beforeAngle);
    ctx.strokeStyle = "#1e3a1e"; ctx.lineWidth = 16; ctx.lineCap = "round"; ctx.stroke();

    // After colored arc
    if (afterClamped > 0) {
      const afterAngle = start + (afterClamped / 100) * range;
      const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, afterColor); grad.addColorStop(1, beforeColor);
      ctx.beginPath(); ctx.arc(cx, cy, R, start, afterAngle);
      ctx.strokeStyle = grad; ctx.lineWidth = 16; ctx.lineCap = "round"; ctx.stroke();
    }

    // Used zone (red fade)
    if (used > 0 && afterClamped < before) {
      const aA = start + (afterClamped / 100) * range;
      const bA = start + (before / 100) * range;
      ctx.beginPath(); ctx.arc(cx, cy, R, aA, bA);
      ctx.strokeStyle = "rgba(239,68,68,0.3)"; ctx.lineWidth = 16; ctx.lineCap = "round"; ctx.stroke();
    }
  }, [before, afterClamped, used, beforeColor, afterColor]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Canvas gauge */}
      <div className="relative w-[220px] h-[220px]">
        <canvas ref={canvasRef} width={220} height={220} className="block" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pt-5">
          <span className="font-syne font-extrabold text-5xl leading-none transition-colors duration-500" style={{ color: afterColor }}>
            {afterClamped.toFixed(1)}%
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            remaining
          </span>
          <span className="font-syne font-semibold text-sm mt-0.5" style={{ color: afterColor }}>
            {getBatteryStatus(afterClamped)}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="flex items-center w-full rounded-xl overflow-hidden"
        style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
      >
        {[
          { val: `${before}%`,         key: "Started",  color: "#60a5fa" },
          { val: `${used.toFixed(1)}%`,key: "Used",     color: "#f87171" },
          { val: `${safetyBuffer}%`,   key: "Buffer",   color: "#4ade80" },
        ].map((s, i) => (
          <div key={s.key} className="flex-1 flex flex-col items-center py-3 px-2 gap-0.5 relative">
            {i > 0 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10" style={{ background: "var(--border)" }} />
            )}
            <span className="font-syne font-bold text-base" style={{ color: s.color }}>{s.val}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{s.key}</span>
          </div>
        ))}
      </div>

      {/* Reach badge */}
      <div
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-syne font-semibold text-sm"
        style={{
          background: willReach ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          border: `1px solid ${willReach ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          color: willReach ? "#4ade80" : "#f87171",
        }}
      >
        {willReach ? <><span>✓</span> Will reach destination</> : <><span>✗</span> Charging stop needed</>}
      </div>
    </div>
  );
}