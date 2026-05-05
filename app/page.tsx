"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { RouteFormData, RoutePlanResult } from "./lib/types";

const RouteMap     = dynamic(() => import("./components/RouteMap"),     { ssr: false });
const BatteryGauge = dynamic(() => import("./components/BatteryGauge"), { ssr: false });

/* ─── EV presets ─── */
const EV_PRESETS = [
  { label: "Tesla M3",  range: 560 },
  { label: "Tesla MY",  range: 531 },
  { label: "Ioniq 6",   range: 614 },
  { label: "Nexon EV",  range: 465 },
  { label: "MG ZS EV",  range: 461 },
  { label: "Custom",    range: 400 },
];

function getBatteryColor(p: number) {
  if (p > 50) return "#16a34a";
  if (p > 25) return "#d97706";
  return "#dc2626";
}

type Msg =
  | { kind: "user";   text: string }
  | { kind: "ai";     html: string }
  | { kind: "typing" }
  | { kind: "form" };

const TABS = [
  { id: "navigate",  label: "Navigate",  icon: "🗺️" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "battery",   label: "Battery",   icon: "🔋" },
  { id: "chargers",  label: "Chargers",  icon: "⚡" },
  { id: "ai",        label: "AI",        icon: "🤖" },
];

export default function HomePage() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "";
  }, [dark]);

  const [msgs, setMsgs] = useState<Msg[]>([
    { kind: "ai", html: "Hey! I'm <strong>VoltIQ</strong> ⚡<br>Your intelligent EV range planner.<br><br>Tell me your route and I'll predict battery usage, find chargers, and give you a complete trip analysis." },
    { kind: "form" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<RouteFormData>({
    origin: "", destination: "", batteryPercent: 74, vehicleRangeKm: 400,
  });
  const [preset, setPreset]   = useState("Custom");
  const [loading, setLoading] = useState(false);

  const [result, setResult]       = useState<RoutePlanResult | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("navigate");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function handleCalculate() {
    if (!form.origin || !form.destination) return;
    setLoading(true);

    setMsgs(prev => prev.filter(m => m.kind !== "form").concat([
      { kind: "user", text: `${form.origin} → ${form.destination}\n${preset} · ${form.batteryPercent}% battery` },
      { kind: "typing" },
    ]));

    try {
      const res = await fetch("/api/route-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Failed"); }
      const data: RoutePlanResult = await res.json();
      setResult(data);

      const willReach = data.battery.willReachDestination;
      setMsgs(prev => prev.filter(m => m.kind !== "typing").concat([{
        kind: "ai",
        html: `Route calculated! <br><br>
📍 <strong>${form.origin}</strong> → <strong>${form.destination}</strong><br>
🌿 ${data.route.distanceKm} km · ${data.route.durationMin} min<br>
${willReach
  ? `✅ Arriving with <strong>${Math.max(0, data.battery.remainingBattery).toFixed(0)}%</strong> battery`
  : `⚠️ <strong>Charge stop needed</strong> — ${Math.abs(data.battery.remainingBattery).toFixed(0)}% short`
}<br><br>
<span style="opacity:.5;font-size:11px">Use the panels → for full details</span>`,
      }]));
      setPanelOpen(true);
    } catch (e: any) {
      setMsgs(prev => prev.filter(m => m.kind !== "typing").concat([{
        kind: "ai", html: `⚠️ ${e.message || "Something went wrong."}`,
      }]));
    } finally {
      setLoading(false);
    }
  }

  async function sendChat() {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setMsgs(prev => [...prev, { kind: "user", text }, { kind: "typing" }]);
    await new Promise(r => setTimeout(r, 900));
    setMsgs(prev => {
      const filtered = prev.filter(m => m.kind !== "typing");
      const lower = text.toLowerCase();
      let html = "I can help! Use the tabs on the right to explore battery, chargers, and AI analysis.";
      if (lower.includes("charg"))       html = "Charger details are in the <strong>Chargers</strong> tab — with live status and directions.";
      else if (lower.includes("batter")) html = "Your battery prediction is in the <strong>Battery</strong> tab with impact factors.";
      else if (lower.includes("speed"))  html = "Optimal speed for maximum range is around <strong>72 km/h</strong>. See AI tab for personalised tips.";
      else if (lower.includes("route"))  html = "Your route is shown on the <strong>Navigate</strong> tab with eco, fast, and shortest options.";
      return [...filtered, { kind: "ai" as const, html }];
    });
  }

  const startBat = result
    ? Math.round(result.battery.totalBatteryUsed + Math.max(0, result.battery.remainingBattery))
    : form.batteryPercent;

  return (
<div className="relative flex h-screen overflow-hidden bg-[var(--bg)] transition-all duration-500">
      {/* ── CHAT SIDEBAR ── */}
      <div className={`
        flex flex-col h-full flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]
        border-r border-[var(--border)]
     ${panelOpen
  ? sidebarCollapsed
    ? "w-0 overflow-hidden border-none"
    : "w-[360px]"
  : "w-full max-w-[640px] mx-auto border-none justify-center"
}
      `}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--green)] flex items-center justify-center text-white text-sm font-bold">⚡</div>
            <span className="font-bold text-[15px] text-[var(--green)] tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>VoltIQ</span>
          </div>

          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ boxShadow: "0 0 0 2px rgba(16,185,129,0.25)" }} />
            <span className="text-[10px] text-[var(--text3)]" style={{ fontFamily: "var(--font-mono)" }}>Live</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {panelOpen && (
              <button
                onClick={() => setSidebarCollapsed(v => !v)}
                className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface2)] text-[var(--text3)] text-xs hover:text-[var(--text)] hover:border-[var(--border2)] transition-all flex items-center justify-center"
              >
                {sidebarCollapsed ? "→" : "←"}
              </button>
            )}
            <button
              onClick={() => setDark(d => !d)}
              className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface2)] text-xs hover:border-[var(--border2)] transition-all flex items-center justify-center"
            >
              {dark ? "☀️" : "🌙"}
            </button>
            <button className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-red-500 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-all" style={{ fontFamily: "var(--font-mono)" }}>
              SOS
            </button>
          </div>
        </div>

        {/* Messages */}
<div
  className={`flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 ${
    !panelOpen ? "justify-center" : ""
  }`}
>          {msgs.map((m, i) => {
            if (m.kind === "typing") return (
              <div key={i} className="flex items-end gap-2 animate-[fadeUp_.2s_ease]">
                <Avatar />
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px_16px_16px_16px] px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 150, 300].map(d => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-[var(--text3)]" style={{ animation: `bounce 0.9s ${d}ms infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            );

            if (m.kind === "form") return (
              <div key={i} className="flex items-end gap-2 animate-[fadeUp_.2s_ease]">
                <Avatar />
                <RouteFormInline
                  form={form} setForm={setForm}
                  preset={preset} setPreset={setPreset}
                  loading={loading} onSubmit={handleCalculate}
                />
              </div>
            );

            if (m.kind === "user") return (
              <div key={i} className="flex justify-end animate-[fadeUp_.2s_ease]">
                <div className="bg-[var(--green)] text-white rounded-[16px_16px_4px_16px] px-4 py-2.5 text-sm leading-relaxed max-w-[80%] whitespace-pre-line" style={{ fontFamily: "var(--font-sans)" }}>
                  {m.text}
                </div>
              </div>
            );

            if (m.kind === "ai") return (
              <div key={i} className="flex items-end gap-2 animate-[fadeUp_.2s_ease]">
                <Avatar />
                <div
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px_16px_16px_16px] px-4 py-2.5 text-sm leading-relaxed text-[var(--text)] max-w-[85%]"
                  style={{ fontFamily: "var(--font-sans)" }}
                  dangerouslySetInnerHTML={{ __html: m.html }}
                />
              </div>
            );
            return null;
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)] flex gap-2 items-center flex-shrink-0">
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendChat()}
            placeholder="Ask about battery, chargers…"
            className="flex-1 bg-[var(--surface2)] border border-[var(--border)] rounded-full px-4 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text3)] outline-none focus:border-[var(--green)] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          />
          <button
            onClick={sendChat}
            className="w-9 h-9 rounded-full bg-[var(--green)] text-white flex items-center justify-center text-base hover:opacity-90 transition-opacity flex-shrink-0"
          >↑</button>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={`
        flex-1 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]
${panelOpen
  ? "opacity-100 translate-x-0"
  : "opacity-0 translate-x-8 pointer-events-none w-0"
}      `}>
        {/* Collapsed sidebar toggle */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-6 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-r-lg text-[var(--text3)] hover:text-[var(--text)] flex items-center justify-center text-xs transition-all shadow-sm"
          >→</button>
        )}

        {/* Tab bar */}
        <div className="flex items-center border-b border-[var(--border)] bg-[var(--surface)] px-2 flex-shrink-0 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`
                flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all
                ${activeTab === t.id
                  ? "text-[var(--green)] border-[var(--green)]"
                  : "text-[var(--text3)] border-transparent hover:text-[var(--text2)]"
                }
              `}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="text-sm">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {result && (
            <>
              {activeTab === "navigate"  && <TabNavigate  result={result} startBat={startBat} dark={dark} />}
              {activeTab === "analytics" && <TabAnalytics result={result} />}
              {activeTab === "battery"   && <TabBattery   result={result} startBat={startBat} />}
              {activeTab === "chargers"  && <TabChargers  result={result} />}
              {activeTab === "ai"        && <TabAI        result={result} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── AVATAR ── */
function Avatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-[var(--green-dim)] border border-[var(--green-border)] flex items-center justify-center text-xs flex-shrink-0 mb-0.5">⚡</div>
  );
}

/* ── ROUTE FORM ── */
function RouteFormInline({ form, setForm, preset, setPreset, loading, onSubmit }: {
  form: RouteFormData; setForm: React.Dispatch<React.SetStateAction<RouteFormData>>;
  preset: string; setPreset: (p: string) => void;
  loading: boolean; onSubmit: () => void;
}) {
  const inp = "w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--green)] transition-colors placeholder:text-[var(--text3)]";

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px_16px_16px_16px] p-4 flex flex-col gap-3 w-full max-w-[300px] shadow-sm">
      <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Plan Your Route</p>

      {/* Origin */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          From
        </label>
        <input className={inp} placeholder="e.g. Bengaluru, KA" value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} />
      </div>

      {/* Destination */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          To
        </label>
        <input className={inp} placeholder="e.g. Mysore, KA" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
      </div>

      {/* Battery */}
      <div>
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Battery</span>
          <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: getBatteryColor(form.batteryPercent) }}>{form.batteryPercent}%</span>
        </div>
        <input type="range" min={5} max={100} value={form.batteryPercent}
          onChange={e => setForm(f => ({ ...f, batteryPercent: parseInt(e.target.value) }))}
          style={{ background: `linear-gradient(to right, ${getBatteryColor(form.batteryPercent)} ${form.batteryPercent}%, var(--border) ${form.batteryPercent}%)` }}
        />
      </div>

      {/* Presets */}
      <div>
        <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>Vehicle</p>
        <div className="grid grid-cols-3 gap-1">
          {EV_PRESETS.map(p => (
            <button key={p.label} onClick={() => { setPreset(p.label); setForm(f => ({ ...f, vehicleRangeKm: p.range })); }}
              className={`py-1.5 px-1 rounded-md text-[11px] text-center border transition-all cursor-pointer ${preset === p.label ? "border-[var(--green)] bg-[var(--green-dim)] text-[var(--green)] font-semibold" : "border-[var(--border)] bg-[var(--surface2)] text-[var(--text2)]"}`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="leading-tight">{p.label}</div>
              <div className="text-[9px] opacity-50 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{p.range}km</div>
            </button>
          ))}
        </div>
      </div>

      {preset === "Custom" && (
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Range (km)</label>
          <input type="number" min={50} max={1000} className={inp} value={form.vehicleRangeKm}
            onChange={e => setForm(f => ({ ...f, vehicleRangeKm: parseInt(e.target.value) }))} />
        </div>
      )}

      <button onClick={onSubmit} disabled={loading || !form.origin || !form.destination}
        className="w-full py-2.5 rounded-lg bg-[var(--green)] text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {loading ? (
          <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "spin .7s linear infinite" }} />Calculating…</>
        ) : "⚡ Calculate Range"}
      </button>
    </div>
  );
}

/* ═══════ TABS ═══════ */

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
      <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>{label}</p>
      <p className="text-2xl font-bold text-[var(--text)]" style={{ color: color || "var(--text)", fontFamily: "var(--font-sans)" }}>{value}</p>
      {sub && <p className="text-[11px] text-[var(--text3)] mt-1" style={{ fontFamily: "var(--font-mono)" }}>{sub}</p>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[11px] font-semibold text-[var(--text3)] uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>{children}</h3>;
}

/* ── NAVIGATE TAB ── */
function TabNavigate({ result, startBat, dark }: { result: RoutePlanResult; startBat: number; dark: boolean }) {
  const { origin, destination, route, weather, battery, chargingStations } = result;

  const weatherIcon = weather.conditions === "Ideal" ? "☀️" : weather.conditions.includes("Rain") ? "🌧️" : weather.conditions.includes("Cold") ? "❄️" : weather.conditions.includes("Wind") ? "💨" : "🌡️";

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Map */}
<div
  className="rounded-2xl overflow-hidden border border-[var(--border)]"
  style={{ height: 460 }}
>        <RouteMap origin={origin} destination={destination} chargingStations={chargingStations} batteryPercent={startBat} remainingBattery={battery.remainingBattery} />
      </div>

      {/* Route options */}
      <div>
        <SectionTitle>Route Options</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Eco ⭐", dist: route.distanceKm, bat: battery.totalBatteryUsed, accent: "var(--green)" },
            { label: "Fastest", dist: Math.round(route.distanceKm * 0.89), bat: Math.round(battery.totalBatteryUsed * 1.42) },
            { label: "Shortest", dist: Math.round(route.distanceKm * 0.81), bat: Math.round(battery.totalBatteryUsed * 1.76) },
          ].map(r => (
            <div key={r.label} className={`bg-[var(--surface)] border rounded-xl p-3 ${r.accent ? "border-[var(--green)]" : "border-[var(--border)]"}`}>
              <p className="text-[10px] font-semibold mb-1" style={{ fontFamily: "var(--font-mono)", color: r.accent || "var(--text3)" }}>{r.label}</p>
              <p className="text-xl font-bold text-[var(--text)]">{r.dist}<span className="text-xs text-[var(--text3)] ml-0.5">km</span></p>
              <p className="text-[11px] text-red-500 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>−{r.bat}% bat</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Predicted Range" value={`${battery.effectiveRange} km`} sub="After weather & style adjustments" />
        <StatCard label="ETA" value={`${Math.floor(route.durationMin / 60)}h ${route.durationMin % 60}m`} sub={chargingStations.length > 0 ? "Includes charge stop" : "No charge stop needed"} />
      </div>

      {/* Weather */}
      <div>
        <SectionTitle>Weather Impact</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{weatherIcon}</span>
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">{weather.conditions}</p>
              <p className="text-[11px] text-[var(--text3)]" style={{ fontFamily: "var(--font-mono)" }}>
                {Math.round((1 - weather.weatherFactor) * 100)}% range reduction
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-lg font-bold text-[var(--green)]">{Math.round(weather.weatherFactor * 100)}%</p>
              <p className="text-[10px] text-[var(--text3)]">efficiency</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: `${weather.temperature}°C`, key: "Temp" },
              { val: `${weather.wind_speed}km/h`, key: "Wind" },
              { val: weather.precipitation > 0 ? `${weather.precipitation}mm` : "Dry", key: "Rain" },
            ].map(w => (
              <div key={w.key} className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-2 text-center">
                <p className="text-sm font-bold text-[var(--text)]">{w.val}</p>
                <p className="text-[9px] text-[var(--text3)] uppercase tracking-wider mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{w.key}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full py-3 bg-[var(--green)] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity" style={{ fontFamily: "var(--font-sans)" }}>
        Start Navigation →
      </button>
    </div>
  );
}

/* ── ANALYTICS TAB ── */
function TabAnalytics({ result }: { result: RoutePlanResult }) {
  const { battery, route } = result;
  const mfrRange = Math.round(battery.effectiveRange * 1.27);

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Range reality */}
      <div>
        <SectionTitle>Range Reality Check</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-[var(--text3)] line-through">{mfrRange}km</p>
            <p className="text-[10px] text-[var(--text3)] mt-1">Manufacturer</p>
          </div>
          <div className="text-[var(--text3)]">→</div>
          <div className="text-center flex-1 bg-[var(--green-dim)] border border-[var(--green-border)] rounded-lg p-3">
            <p className="text-2xl font-bold text-[var(--green)]">{battery.effectiveRange}km</p>
            <p className="text-[10px] text-[var(--green)] opacity-70 mt-1">Real predicted</p>
          </div>
        </div>
        <div className="mt-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2 text-[11px] text-red-600 dark:text-red-400" style={{ fontFamily: "var(--font-mono)" }}>
          −{mfrRange - battery.effectiveRange}km gap due to weather, style & battery age
        </div>
      </div>

      {/* Energy breakdown */}
      <div>
        <SectionTitle>Energy Breakdown</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3">
          {[
            { label: "Distance load",  pct: 48, color: "#2563eb" },
            { label: "Weather drag",   pct: 28, color: "#d97706" },
            { label: "Traffic stops",  pct: 15, color: "#dc2626" },
            { label: "Driving style",  pct: 18, color: "#7c3aed" },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="text-xs text-[var(--text2)] w-28 flex-shrink-0">{row.label}</span>
              <div className="flex-1 h-1.5 bg-[var(--surface2)] border border-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
              </div>
              <span className="text-[11px] w-8 text-right" style={{ fontFamily: "var(--font-mono)", color: row.color }}>{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Driving style */}
      <div>
        <SectionTitle>Driving Style</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3">
          {[
            { label: "Acceleration", pct: 72, val: "−18%", color: "#dc2626" },
            { label: "Hard braking", pct: 48, val: "−7%",  color: "#d97706" },
            { label: "Speed consistency", pct: 85, val: "+4%", color: "#16a34a" },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="text-xs text-[var(--text2)] w-32 flex-shrink-0">{row.label}</span>
              <div className="flex-1 h-1.5 bg-[var(--surface2)] border border-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
              </div>
              <span className="text-[11px] w-10 text-right font-semibold" style={{ fontFamily: "var(--font-mono)", color: row.color }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { val: `${battery.totalBatteryUsed}%`, key: "Used",     color: "#dc2626" },
          { val: `${Math.max(0, battery.remainingBattery)}%`, key: "Remaining", color: "#16a34a" },
          { val: `${battery.safetyBuffer}%`, key: "Buffer",   color: "#7c3aed" },
        ].map(s => (
          <div key={s.key} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 text-center">
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.val}</p>
            <p className="text-[9px] text-[var(--text3)] uppercase tracking-wider mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{s.key}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── BATTERY TAB ── */
function TabBattery({ result, startBat }: { result: RoutePlanResult; startBat: number }) {
  const { battery } = result;
  const remaining = Math.max(0, battery.remainingBattery);
  const isOk = battery.willReachDestination;

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
        <SectionTitle>Battery Prediction</SectionTitle>
        <BatteryGauge before={startBat} after={battery.remainingBattery} used={battery.totalBatteryUsed} willReach={battery.willReachDestination} safetyBuffer={battery.safetyBuffer} />
      </div>

      {/* Verdict */}
      <div className={`rounded-xl p-4 flex items-start gap-3 border ${isOk ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50" : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50"}`}>
        <span className="text-xl">{isOk ? "✅" : "⚠️"}</span>
        <div>
          <p className="font-semibold text-sm" style={{ color: isOk ? "#16a34a" : "#dc2626" }}>
            {isOk ? `Arriving with ${remaining.toFixed(0)}% battery` : `${Math.abs(battery.remainingBattery).toFixed(0)}% short — charge stop needed`}
          </p>
          <p className="text-[11px] text-[var(--text3)] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
            {isOk ? `Safety buffer: ${battery.safetyBuffer}%` : "Please charge before departing or stop en route"}
          </p>
        </div>
      </div>

      {/* Impact factors */}
      <div>
        <SectionTitle>Impact Factors</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]">
          {[
            { icon: "🌤", label: "Weather",   val: battery.breakdowns.weatherImpact },
            { icon: "🏎", label: "Speed",     val: battery.breakdowns.speedImpact },
            { icon: "⛰", label: "Elevation", val: battery.breakdowns.elevationImpact },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3 px-4 py-3">
              <span>{row.icon}</span>
              <span className="text-sm text-[var(--text2)] flex-1">{row.label}</span>
              <span className="text-sm font-semibold text-red-500" style={{ fontFamily: "var(--font-mono)" }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3 text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
        💡 Avoid draining below 15% — real usable range ends ~5km past the 15% mark.
      </div>
    </div>
  );
}

/* ── CHARGERS TAB ── */
function TabChargers({ result }: { result: RoutePlanResult }) {
  const { chargingStations, battery } = result;

  return (
    <div className="p-5 flex flex-col gap-5">
      <div>
        <div className="flex items-center justify-between mb-3">
          <SectionTitle>{battery.willReachDestination ? "Nearby Chargers" : "Required Stops"}</SectionTitle>
          <span className="text-[10px] bg-[var(--green-dim)] text-[var(--green)] border border-[var(--green-border)] px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-mono)" }}>
            {chargingStations.length} found
          </span>
        </div>

        {chargingStations.length === 0 ? (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 text-center text-[var(--text3)] text-sm">
            No charging stations found along this route.
          </div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]">
            {chargingStations.map((s, i) => (
              <div key={s.id} className="p-4 flex gap-3">
                <div className={`mt-0.5 px-2 py-1 rounded-md text-[10px] font-semibold flex-shrink-0 ${s.fastCharge ? "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800" : "bg-[var(--surface2)] text-[var(--text3)] border border-[var(--border)]"}`} style={{ fontFamily: "var(--font-mono)" }}>
                  {s.fastCharge ? "⚡ DC" : "AC"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)] truncate">{s.name}</p>
                  {s.address && <p className="text-[11px] text-[var(--text3)] mt-0.5 truncate" style={{ fontFamily: "var(--font-mono)" }}>{s.address}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)] text-[var(--text3)]" style={{ fontFamily: "var(--font-mono)" }}>🔌 {s.connectors} ports</span>
                    {s.powerKw && <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--green-dim)] border border-[var(--green-border)] text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{s.powerKw}kW</span>}
                    {s.network && <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 text-purple-600 dark:text-purple-400" style={{ fontFamily: "var(--font-mono)" }}>{s.network}</span>}
                    {s.batteryAtPoint !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400" style={{ fontFamily: "var(--font-mono)" }}>🔋 {s.batteryAtPoint.toFixed(0)}% on arrival</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!battery.willReachDestination && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-3 text-[11px] text-red-600 dark:text-red-400 leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
          ⚠️ A charging stop is required to complete this journey.
        </div>
      )}
    </div>
  );
}

/* ── AI TAB ── */
function TabAI({ result }: { result: RoutePlanResult }) {
  const { aiInsights } = result;
  if (!aiInsights) return (
    <div className="p-8 text-center text-[var(--text3)] text-sm">AI analysis not available.</div>
  );

  const verdictCfg = {
    go:             { icon: "✅", label: "Good to Go",            color: "#16a34a", cls: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50" },
    charge_first:   { icon: "🔋", label: "Charge Before Leaving", color: "#d97706", cls: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50" },
    charge_enroute: { icon: "⚡", label: "Charge En Route",       color: "#dc2626", cls: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50" },
  }[aiInsights.verdict] ?? { icon: "✅", label: "Good to Go", color: "#16a34a", cls: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50" };

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Trip score */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
        <SectionTitle>Trip Score</SectionTitle>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-5xl font-bold text-[var(--green)]" style={{ fontFamily: "var(--font-sans)" }}>B+</p>
            <p className="text-[11px] text-[var(--text3)] mt-1" style={{ fontFamily: "var(--font-mono)" }}>78 / 100</p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {[
              { label: "Speed control", pct: 82, color: "#16a34a" },
              { label: "Braking",       pct: 65, color: "#d97706" },
              { label: "Regen use",     pct: 78, color: "#2563eb" },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-2">
                <span className="text-[11px] text-[var(--text2)] w-24 flex-shrink-0">{row.label}</span>
                <div className="flex-1 h-1.5 bg-[var(--surface2)] border border-[var(--border)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                </div>
                <span className="text-[10px] text-[var(--text3)] w-6 text-right" style={{ fontFamily: "var(--font-mono)" }}>{row.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div className={`rounded-xl p-4 flex items-start gap-3 border ${verdictCfg.cls}`}>
        <span className="text-xl">{verdictCfg.icon}</span>
        <div>
          <p className="font-semibold text-sm" style={{ color: verdictCfg.color }}>{verdictCfg.label}</p>
          <p className="text-[11px] text-[var(--text3)] mt-1 leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>{aiInsights.summary}</p>
        </div>
      </div>

      {/* Optimal speed */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--green-dim)] border border-[var(--green-border)] flex flex-col items-center justify-center flex-shrink-0">
          <p className="text-lg font-bold text-[var(--green)] leading-none">{aiInsights.optimalSpeed}</p>
          <p className="text-[8px] text-[var(--green)] opacity-60 uppercase mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>km/h</p>
        </div>
        <div>
          <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Optimal Speed</p>
          <p className="text-sm text-[var(--text2)] mt-0.5">Drive at {aiInsights.optimalSpeed} km/h for max range efficiency</p>
        </div>
      </div>

      {/* Charging advice */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
        <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>⚡ Charging Strategy</p>
        <p className="text-sm text-[var(--text2)] leading-relaxed">{aiInsights.chargingAdvice}</p>
      </div>

      {/* Tips */}
      <div>
        <SectionTitle>Smart Tips</SectionTitle>
        <div className="flex flex-col gap-2">
          {aiInsights.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3">
              <div className="w-5 h-5 rounded-md bg-[var(--green-dim)] border border-[var(--green-border)] text-[var(--green)] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{i+1}</div>
              <p className="text-sm text-[var(--text2)] leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}