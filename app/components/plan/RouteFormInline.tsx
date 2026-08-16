// app/components/plan/RouteFormInline.tsx
"use client";
import type React from "react";
import { RouteFormData } from "../../lib/types";
import { EV_PRESETS, getBatteryColor } from "../../lib/planHelpers";

interface Props {
  form: RouteFormData;
  setForm: React.Dispatch<React.SetStateAction<RouteFormData>>;
  preset: string;
  setPreset: (p: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

export default function RouteFormInline({
  form,
  setForm,
  preset,
  setPreset,
  loading,
  onSubmit,
}: Props) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 13,
    fontFamily: "var(--font-sans)",
    color: "var(--text)",
    outline: "none",
    transition: "border-color .15s, box-shadow .15s",
  };

  return (
    <div
      className="vq-route-form-inline"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "4px 16px 16px 16px",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 300,
        boxShadow: "0 2px 12px rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".08em",
          color: "var(--text3)",
        }}
      >
        Plan your route
      </div>

      {/* Origin */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".06em",
            color: "var(--text3)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          From
        </label>
        <input
          style={inputStyle}
          placeholder="e.g. Bengaluru, KA"
          value={form.origin}
          onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Destination */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".06em",
            color: "var(--text3)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ef4444",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          To
        </label>
        <input
          style={inputStyle}
          placeholder="e.g. Mysore, KA"
          value={form.destination}
          onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Battery slider */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: ".06em",
              color: "var(--text3)",
            }}
          >
            Battery
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 700,
              color: getBatteryColor(form.batteryPercent),
            }}
          >
            {form.batteryPercent}%
          </span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          value={form.batteryPercent}
          onChange={(e) => setForm((f) => ({ ...f, batteryPercent: parseInt(e.target.value) }))}
          style={{
            background: `linear-gradient(to right, ${getBatteryColor(form.batteryPercent)} ${form.batteryPercent}%, var(--border) ${form.batteryPercent}%)`,
          }}
        />
      </div>

      {/* Vehicle presets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".06em",
            color: "var(--text3)",
          }}
        >
          Vehicle
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
          {EV_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setPreset(p.label);
                setForm((f) => ({ ...f, vehicleRangeKm: p.range }));
              }}
              style={{
                padding: "6px 4px",
                borderRadius: 6,
                textAlign: "center",
                border: `1px solid ${preset === p.label ? "var(--green)" : "var(--border)"}`,
                background: preset === p.label ? "var(--green-dim)" : "var(--surface2)",
                color: preset === p.label ? "var(--green)" : "var(--text2)",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontWeight: preset === p.label ? 700 : 400,
                transition: "all .15s",
              }}
            >
              <div style={{ fontSize: 11, lineHeight: 1.3 }}>{p.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: 0.5, marginTop: 1 }}>
                {p.range}km
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom range */}
      {preset === "Custom" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: ".06em",
              color: "var(--text3)",
            }}
          >
            Range (km)
          </label>
          <input
            type="number"
            min={50}
            max={1000}
            value={form.vehicleRangeKm}
            onChange={(e) => {
              const parsed = parseInt(e.target.value, 10);
              setForm((f) => ({ ...f, vehicleRangeKm: Number.isNaN(parsed) ? 0 : parsed }));
            }}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>
      )}

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={loading || !form.origin || !form.destination}
        style={{
          width: "100%",
          padding: "12px 0",
          background: loading || !form.origin || !form.destination ? "var(--border)" : "var(--green)",
          color: loading || !form.origin || !form.destination ? "var(--text3)" : "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 13,
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          cursor: loading || !form.origin || !form.destination ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all .15s",
        }}
      >
        {loading ? (
          <>
            <div
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(255,255,255,.3)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "spin .7s linear infinite",
              }}
            />
            Calculating…
          </>
        ) : (
          "⚡ Calculate EV Range"
        )}
      </button>
    </div>
  );
}