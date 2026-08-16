//app\components\RangeWarning.tsx
"use client";
import { useState } from "react";
import { BatteryPrediction, RouteInfo, GeoLocation } from "../lib/types";
import { formatDuration, formatDistance } from "../lib/routeUtils";

interface Props {
  battery: BatteryPrediction;
  route: RouteInfo;
  origin: GeoLocation;
  destination: GeoLocation;
}

export default function RangeWarning({ battery, route, origin, destination }: Props) {
  const remaining = Math.max(0, battery.remainingBattery);
  const isOk = battery.willReachDestination;

  const summaryItems = [
    { icon: "📍", label: "Distance",  value: formatDistance(route.distanceKm) },
    { icon: "⏱️", label: "ETA",       value: formatDuration(route.durationMin) },
    { icon: "⛰️", label: "Elevation", value: `+${route.elevationGainM}m` },
    { icon: "🔋", label: "Eff. Range",value: `${battery.effectiveRange} km` },
  ];

  const breakdowns = [
    { label: "🌤️ Weather",   value: battery.breakdowns.weatherImpact },
    { label: "🏎️ Speed",     value: battery.breakdowns.speedImpact },
    { label: "⛰️ Elevation", value: battery.breakdowns.elevationImpact },
  ];

  const [voiceLoading, setVoiceLoading] = useState(false);
  const [voiceError, setVoiceError]     = useState<string | null>(null);

  function buildSummaryText(): string {
    let text = `Your trip from ${origin.display_name} to ${destination.display_name} is `;
    text += isOk ? `looking good! You'll arrive with around ${remaining.toFixed(0)}% battery remaining. ` : "a bit tricky. ";

    if (!isOk) {
      text += `You're predicted to be ${Math.abs(remaining).toFixed(0)}% short on charge. `;
      text += "I recommend charging up before you leave or finding a stop along the way. ";
    }

    text += `The total distance is ${formatDistance(route.distanceKm)}, `;
    text += `and your ETA is ${formatDuration(route.durationMin)}. `;

    text += "A few things impacting your battery: ";
    breakdowns.forEach((b) => {
      if (!b.value.startsWith("0%")) {
        text += `${b.label} ${b.value}, `;
      }
    });

    text += isOk ? "But overall, you should be all set. Safe travels!" : "So plan accordingly and charge up when you can. You got this!";
    return text;
  }

  // Calls a server-side TTS route rather than hitting ElevenLabs (or any
  // provider) directly from the browser — the real API key lives only in
  // that route's server environment (e.g. process.env.ELEVENLABS_API_KEY),
  // never in client-shipped code. This route doesn't exist yet in the
  // files you've shared — implement app/api/tts/route.ts to proxy the
  // request server-side before wiring this up in production.
  async function playVoiceSummary() {
    setVoiceLoading(true);
    setVoiceError(null);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: buildSummaryText() }),
      });
      if (!res.ok) throw new Error("Voice summary unavailable right now.");
      const blob = await res.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      await audio.play();
    } catch (err: any) {
      console.error("Voice summary failed:", err);
      setVoiceError(err.message || "Couldn't play voice summary.");
    } finally {
      setVoiceLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Summary grid */}
      <div className="grid grid-cols-2 gap-2">
        {summaryItems.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3 flex flex-col gap-1"
            style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{s.icon}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{s.label}</span>
            </div>
            <div className="font-syne font-bold text-base" style={{ color: "var(--text-primary)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Impact breakdown */}
      <div
        className="rounded-xl p-4 flex flex-col gap-3"
        style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Battery Impact Factors
        </div>
        <div className="flex flex-col gap-2">
          {breakdowns.map((b) => {
            const isZero = b.value.startsWith("0%");
            return (
              <div key={b.label} className="flex items-center justify-between">
                <span className="font-syne text-sm" style={{ color: "var(--text-secondary)" }}>{b.label}</span>
                <span
                  className="font-mono text-sm font-semibold"
                  style={{ color: isZero ? "var(--text-muted)" : "#f87171" }}
                >
                  {b.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verdict */}
      <div
        className="rounded-xl p-4 flex items-start gap-3"
        style={{
          background: isOk ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
          border: `1px solid ${isOk ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
        }}
      >
        <span className="text-2xl flex-shrink-0 mt-0.5">{isOk ? "✅" : "⚠️"}</span>
        <div className="flex-1">
          <div className="font-syne font-bold text-sm" style={{ color: "var(--text-primary)" }}>
            {isOk
              ? `Arriving with ${remaining.toFixed(0)}% battery`
              : `Not enough charge — ${Math.abs(remaining).toFixed(0)}% short`}
          </div>
          <div className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {isOk
              ? `Safety buffer: ${battery.safetyBuffer}% · Trip looks good!`
              : "Please charge before departing or find a stop en route"}
          </div>
        </div>
      </div>

      {/* Voice summary — opt-in, not auto-played */}
      <button
        onClick={playVoiceSummary}
        disabled={voiceLoading}
        className="w-full rounded-xl py-2.5 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest transition-opacity disabled:opacity-60"
        style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
      >
        {voiceLoading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            Loading voice summary…
          </>
        ) : (
          <>🔊 Play voice summary</>
        )}
      </button>
      {voiceError && (
        <div className="font-mono text-[11px]" style={{ color: "#f87171" }}>{voiceError}</div>
      )}
    </div>
  );
}