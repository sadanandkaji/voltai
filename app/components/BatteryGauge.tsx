"use client";
import { useEffect, useRef } from "react";

function getBatteryColor(p: number) {
  if (p > 50) return "#16a34a";
  if (p > 25) return "#d97706";
  return "#dc2626";
}
function getBatteryStatus(p: number) {
  if (p > 80) return "Excellent";
  if (p > 50) return "Good";
  if (p > 25) return "Low";
  if (p > 10) return "Critical";
  return "Empty";
}

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
    const R = Math.min(cx, cy) - 14;
    const start = Math.PI * 0.75, end = Math.PI * 2.25;
    const range = end - start;

    ctx.clearRect(0, 0, W, H);

    // Track
    ctx.beginPath(); ctx.arc(cx, cy, R, start, end);
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.stroke();

    // Before dim
    const beforeAngle = start + (before / 100) * range;
    ctx.beginPath(); ctx.arc(cx, cy, R, start, beforeAngle);
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.stroke();

    // After arc
    if (afterClamped > 0) {
      const afterAngle = start + (afterClamped / 100) * range;
      const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, afterColor); grad.addColorStop(1, beforeColor);
      ctx.beginPath(); ctx.arc(cx, cy, R, start, afterAngle);
      ctx.strokeStyle = grad; ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.stroke();
    }

    // Used zone
    if (used > 0 && afterClamped < before) {
      const aA = start + (afterClamped / 100) * range;
      const bA = start + (before / 100) * range;
      ctx.beginPath(); ctx.arc(cx, cy, R, aA, bA);
      ctx.strokeStyle = "rgba(220,38,38,0.2)";
      ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.stroke();
    }
  }, [before, afterClamped, used, beforeColor, afterColor]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[200px] h-[200px]">
        <canvas ref={canvasRef} width={200} height={200} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pt-4">
          <span className="text-4xl font-bold transition-colors duration-500" style={{ color: afterColor }}>{afterClamped.toFixed(1)}%</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--text3)]" style={{ fontFamily: "var(--font-mono)" }}>remaining</span>
          <span className="text-sm font-semibold mt-0.5" style={{ color: afterColor }}>{getBatteryStatus(afterClamped)}</span>
        </div>
      </div>

      <div className="flex w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface2)]">
        {[
          { val: `${before}%`,           key: "Started",   color: "#3b82f6" },
          { val: `${used.toFixed(1)}%`,  key: "Used",      color: "#ef4444" },
          { val: `${safetyBuffer}%`,     key: "Buffer",    color: "#16a34a" },
        ].map((s, i) => (
          <div key={s.key} className="flex-1 flex flex-col items-center py-3 gap-0.5 relative">
            {i > 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[var(--border)]" />}
            <span className="font-bold text-sm" style={{ color: s.color }}>{s.val}</span>
            <span className="text-[9px] uppercase tracking-wider text-[var(--text3)]" style={{ fontFamily: "var(--font-mono)" }}>{s.key}</span>
          </div>
        ))}
      </div>

      <div className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold border ${
        willReach
          ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400"
          : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400"
      }`}>
        {willReach ? "✓ Will reach destination" : "✗ Charging stop needed"}
      </div>
    </div>
  );
}