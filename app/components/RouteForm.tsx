"use client";
import { useState } from "react";
import { RouteFormData } from "../lib/types";

interface Props {
  onSubmit: (data: RouteFormData) => void;
  loading: boolean;
}

const EV_PRESETS = [
  { label: "Tesla Model 3", range: 560 },
  { label: "Tesla Model Y", range: 531 },
  { label: "Hyundai Ioniq 6", range: 614 },
  { label: "Tata Nexon EV", range: 465 },
  { label: "MG ZS EV", range: 461 },
  { label: "Custom", range: 0 },
];

function getBatteryColor(pct: number) {
  if (pct > 50) return "#22c55e";
  if (pct > 25) return "#f59e0b";
  return "#ef4444";
}

export default function RouteForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<RouteFormData>({
    origin: "",
    destination: "",
    batteryPercent: 80,
    vehicleRangeKm: 400,
  });
  const [selectedPreset, setSelectedPreset] = useState("Custom");

  const handlePreset = (preset: { label: string; range: number }) => {
    setSelectedPreset(preset.label);
    if (preset.range > 0) setForm((f) => ({ ...f, vehicleRangeKm: preset.range }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.origin || !form.destination) return;
    onSubmit(form);
  };

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm font-syne outline-none transition-all duration-200 " +
    "placeholder:opacity-40 focus:ring-2 focus:ring-green-500/20 focus:border-green-500";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Origin */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
          Starting Point
        </label>
        <input
          type="text"
          placeholder="e.g. Mumbai, Maharashtra"
          value={form.origin}
          onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
          required
          className={inputClass}
          style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
      </div>

      {/* Connector */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        <div
          className="font-mono text-sm px-3 py-1 rounded-md"
          style={{ color: "var(--text-muted)", background: "var(--card-bg)", border: "1px solid var(--border)" }}
        >
          ↓
        </div>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* Destination */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
          Destination
        </label>
        <input
          type="text"
          placeholder="e.g. Pune, Maharashtra"
          value={form.destination}
          onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
          required
          className={inputClass}
          style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
      </div>

      <div className="h-px" style={{ background: "var(--border)" }} />

      {/* Battery slider */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Current Battery
          <span className="ml-auto text-sm font-bold" style={{ color: getBatteryColor(form.batteryPercent) }}>
            {form.batteryPercent}%
          </span>
        </label>
        <input
          type="range"
          min={5}
          max={100}
          step={1}
          value={form.batteryPercent}
          onChange={(e) => setForm((f) => ({ ...f, batteryPercent: parseInt(e.target.value) }))}
          className="w-full h-1.5 rounded-full outline-none"
          style={{
            background: `linear-gradient(to right, #22c55e ${form.batteryPercent}%, rgba(34,197,94,0.12) ${form.batteryPercent}%)`,
          }}
        />
        <div className="flex justify-between font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          <span>5%</span><span>50%</span><span>100%</span>
        </div>
      </div>

      {/* EV Presets */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Vehicle Model
        </label>
        <div className="grid grid-cols-3 gap-2">
          {EV_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePreset(p)}
              className="flex flex-col items-center gap-0.5 rounded-xl py-2.5 px-2 text-xs font-syne cursor-pointer transition-all duration-200"
              style={{
                background: selectedPreset === p.label ? "rgba(34,197,94,0.08)" : "var(--input-bg)",
                border: `1px solid ${selectedPreset === p.label ? "#22c55e" : "var(--border)"}`,
                color: selectedPreset === p.label ? "#22c55e" : "var(--text-secondary)",
              }}
            >
              <span className="text-center leading-tight font-semibold">{p.label}</span>
              {p.range > 0 && (
                <span
                  className="font-mono text-[10px]"
                  style={{ color: selectedPreset === p.label ? "rgba(34,197,94,0.7)" : "var(--text-muted)" }}
                >
                  {p.range}km
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom range input */}
      {selectedPreset === "Custom" && (
        <div className="flex flex-col gap-2">
          <label className="flex items-center font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Max Vehicle Range
            <span className="ml-auto font-bold text-sm" style={{ color: "var(--text-secondary)" }}>
              {form.vehicleRangeKm} km
            </span>
          </label>
          <input
            type="number"
            min={50}
            max={1000}
            value={form.vehicleRangeKm}
            onChange={(e) => setForm((f) => ({ ...f, vehicleRangeKm: parseInt(e.target.value) }))}
            className={inputClass}
            style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl py-3.5 font-syne font-bold text-base tracking-wide transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ background: "#22c55e", color: "#060c0a" }}
        onMouseEnter={(e) => { if (!loading) (e.currentTarget.style.background = "#4ade80"); }}
        onMouseLeave={(e) => { (e.currentTarget.style.background = "#22c55e"); }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="w-4 h-4 border-2 border-black/20 border-t-black/80 rounded-full animate-spin"
            />
            Calculating Route…
          </span>
        ) : (
          "⚡ Calculate EV Range"
        )}
      </button>
    </form>
  );
}