"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import BatteryGauge from "../components/BatteryGauge";
import WeatherCard from "../components/WeatherCard";
import RangeWarning from "../components/RangeWarning";
import ChargingStopCard from "../components/ChargingStopCard";
import { RoutePlanResult } from "../lib/types";

const RouteMap = dynamic(() => import("../components/RouteMap"), { ssr: false });

function ResultCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "rgba(34,197,94,0.02)" }}>
        <span className="text-base">{icon}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<RoutePlanResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("ev-result");
    if (!stored) { router.push("/"); return; }
    setResult(JSON.parse(stored));
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-9 h-9 rounded-full border-2 border-green-500/15 border-t-green-500 animate-spin" />
        <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Loading results…</p>
      </div>
    );
  }

  const { origin, destination, route, weather, battery, chargingStations } = result;
  const originCity   = origin.display_name.split(",")[0];
  const destCity     = destination.display_name.split(",")[0];
  const startBattery = Math.round(battery.totalBatteryUsed + Math.max(0, battery.remainingBattery));

  return (
    <main className="min-h-screen pb-16 relative">
      {/* Grid bg */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 flex items-center gap-3 px-5 py-3"
        style={{ background: "rgba(6,12,10,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--border)" }}>
        <button
          onClick={() => router.push("/")}
          className="flex-shrink-0 rounded-lg px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors"
          style={{ background: "var(--input-bg)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          ← Back
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
          <span className="font-syne font-bold text-sm text-green-400 truncate">{originCity}</span>
          <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>→</span>
          <span className="font-syne font-bold text-sm text-orange-400 truncate">{destCity}</span>
        </div>

        <div
          className="flex-shrink-0 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
          style={{
            background: battery.willReachDestination ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            color: battery.willReachDestination ? "#4ade80" : "#f87171",
            border: `1px solid ${battery.willReachDestination ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
          }}
        >
          {battery.willReachDestination ? "✓ Safe" : "⚡ Charge Needed"}
        </div>
      </nav>

      {/* Map */}
      <div className="px-4 pt-4 relative z-10">
        <RouteMap
          origin={origin}
          destination={destination}
          chargingStations={chargingStations}
          batteryPercent={startBattery}
          remainingBattery={battery.remainingBattery}
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-4 relative z-10 max-w-5xl mx-auto">

        <ResultCard title="Battery Prediction" icon="🔋">
          <BatteryGauge
            before={startBattery}
            after={battery.remainingBattery}
            used={battery.totalBatteryUsed}
            willReach={battery.willReachDestination}
            safetyBuffer={battery.safetyBuffer}
          />
        </ResultCard>

        <ResultCard title="Weather Conditions" icon="🌤️">
          <WeatherCard weather={weather} />
        </ResultCard>

        <ResultCard title="Trip Analysis" icon="📊">
          <RangeWarning battery={battery} route={route} />
        </ResultCard>

        {chargingStations.length > 0 && (
          <ResultCard title="Charging Stops" icon="⚡">
            <ChargingStopCard stations={chargingStations} />
          </ResultCard>
        )}

        <ResultCard title="Consumption Details" icon="📈">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Used",      value: `${battery.totalBatteryUsed}%`,         color: "#f87171" },
              { label: "Remaining", value: `${Math.max(0, battery.remainingBattery)}%`, color: "#4ade80" },
              { label: "Eff. Range",value: `${battery.effectiveRange}km`,           color: "#60a5fa" },
              { label: "Buffer",    value: `${battery.safetyBuffer}%`,              color: "#a78bfa" },
              { label: "Distance",  value: `${route.distanceKm}km`,                color: "#f59e0b" },
              { label: "ETA",       value: `${route.durationMin}min`,              color: "#34d399" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-2.5 text-center"
                style={{ background: "var(--input-bg)", border: "1px solid var(--border)" }}
              >
                <div className="font-syne font-bold text-base" style={{ color: s.color }}>{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ResultCard>
      </div>
    </main>
  );
}