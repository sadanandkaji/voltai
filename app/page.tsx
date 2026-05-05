"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { RouteFormData, RoutePlanResult } from "./lib/types";

/* Lazy-load heavy components */
const RouteMap     = dynamic(() => import("./components/RouteMap"),     { ssr: false });
const BatteryGauge = dynamic(() => import("./components/BatteryGauge"), { ssr: false });

/* ─── tiny design primitives ─── */
const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };

function Label({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      ...mono, fontSize: 10, textTransform: "uppercase", letterSpacing: ".07em",
      color: color ?? "var(--text3)", marginBottom: 4,
    }}>
      {children}
    </div>
  );
}

function Card({
  children, accent, style,
}: {
  children: React.ReactNode;
  accent?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: "var(--surface)", border: `1px solid ${accent ?? "var(--border)"}`,
      borderRadius: "var(--radius)", overflow: "hidden",
      boxShadow: "var(--shadow)", ...style,
    }}>
      {children}
    </div>
  );
}

function CardHeader({ icon, title, right }: { icon?: string; title: string; right?: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "9px 14px", borderBottom: "1px solid var(--border)",
      background: "var(--surface2)",
    }}>
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      <Label>{title}</Label>
      {right && <div style={{ marginLeft: "auto" }}>{right}</div>}
    </div>
  );
}

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

/* ─── Chat message types ─── */
type Msg =
  | { kind: "user";   text: string }
  | { kind: "ai";     html: string }
  | { kind: "typing" }
  | { kind: "form" };

/* ════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════ */
export default function HomePage() {
  /* theme */
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "";
  }, [dark]);

  /* chat state */
  const [msgs, setMsgs]         = useState<Msg[]>([
    { kind: "ai", html: "Hey! I'm <strong>VoltIQ</strong> ⚡ — your EV range assistant.<br><br>Fill in your route details below and I'll predict battery usage, find chargers, and give you an AI trip analysis." },
    { kind: "form" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  /* form state */
  const [form, setForm] = useState<RouteFormData>({
    origin: "", destination: "", batteryPercent: 74, vehicleRangeKm: 400,
  });
  const [preset, setPreset]   = useState("Custom");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  /* result + panel */
  const [result, setResult]       = useState<RoutePlanResult | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("navigate");

  /* scroll chat to bottom */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function pushMsg(m: Msg) {
    setMsgs(prev => [...prev, m]);
  }

  async function handleCalculate() {
    if (!form.origin || !form.destination) return;
    setLoading(true);
    setError(null);

    /* replace form with submitted state, add user bubble */
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
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error || "Failed to calculate route");
      }
      const data: RoutePlanResult = await res.json();
      setResult(data);

      const willReach = data.battery.willReachDestination;
      setMsgs(prev => prev.filter(m => m.kind !== "typing").concat([{
        kind: "ai",
        html: `Route calculated! Here's your trip summary:<br><br>
📍 <strong>${form.origin}</strong> → <strong>${form.destination}</strong><br>
🔋 Starting at ${form.batteryPercent}% · ${preset}<br>
🌿 Distance: ${data.route.distanceKm} km · ETA ${data.route.durationMin} min<br>
${willReach
  ? `✅ You'll arrive with <strong>${Math.max(0, data.battery.remainingBattery).toFixed(0)}%</strong> battery remaining`
  : `⚠️ <strong>Charging stop needed</strong> — ${Math.abs(data.battery.remainingBattery).toFixed(0)}% short`
}<br><br>
<em style="opacity:.55;font-size:12px">See the panels on the right for full details ↗</em>`,
      }]));

      setPanelOpen(true);
    } catch (e: any) {
      setMsgs(prev => prev.filter(m => m.kind !== "typing").concat([{
        kind: "ai",
        html: `⚠️ ${e.message || "Something went wrong. Please check your inputs."}`,
      }]));
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function sendChat() {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    pushMsg({ kind: "user", text });
    pushMsg({ kind: "typing" });

    await new Promise(r => setTimeout(r, 900));
    setMsgs(prev => {
      const filtered = prev.filter(m => m.kind !== "typing");
      const lower = text.toLowerCase();
      let html = "I can help! Use the tabs on the right to explore battery, chargers, and AI analysis.";
      if (lower.includes("charg"))
        html = "I found chargers along your route. Check the <strong>Chargers</strong> tab for live status and directions!";
      else if (lower.includes("weather"))
        html = "Current conditions affect your range by up to −12%. See the <strong>Navigate</strong> tab for full weather details.";
      else if (lower.includes("batter"))
        html = "Your battery prediction is in the <strong>Battery</strong> tab — including health score, impact factors, and arrival estimate.";
      else if (lower.includes("speed"))
        html = "Optimal speed for maximum range on your route is around <strong>72 km/h</strong>. See AI Analysis for personalised tips.";
      else if (lower.includes("route") || lower.includes("map"))
        html = "Your route is shown on the <strong>Navigate</strong> tab — eco, fast, and shortest options with battery cost for each.";
      return [...filtered, { kind: "ai" as const, html }];
    });
  }

  /* ─── derived ─── */
  const startBat = result
    ? Math.round(result.battery.totalBatteryUsed + Math.max(0, result.battery.remainingBattery))
    : form.batteryPercent;

  const TABS = [
    { id: "navigate",  label: "Navigate" },
    { id: "analytics", label: "Analytics" },
    { id: "battery",   label: "Battery" },
    { id: "chargers",  label: "Chargers" },
    { id: "ai",        label: "AI Analysis" },
  ];

  /* ════ RENDER ════ */
  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: "var(--bg)",
    }}>

      {/* ══════════ LEFT: CHAT PANEL ══════════ */}
      <div style={{
        width: panelOpen ? 360 : "100%",
        maxWidth: panelOpen ? 360 : 640,
        margin: panelOpen ? 0 : "0 auto",
        display: "flex", flexDirection: "column", height: "100vh",
        flexShrink: 0,
        transition: "width 0.5s cubic-bezier(.4,0,.2,1), max-width 0.5s cubic-bezier(.4,0,.2,1)",
        borderRight: panelOpen ? "1px solid var(--border)" : "none",
      }}>

        {/* Header */}
        <div style={{
          padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
          borderBottom: "1px solid var(--border)", background: "var(--surface)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: 16, color: "var(--green)" }}>
            <div style={{
              width: 28, height: 28, background: "var(--green)", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff",
            }}>⚡</div>
            VoltIQ
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 2px var(--green-dim)" }} />
            <span style={{ ...mono, fontSize: 10, color: "var(--text3)" }}>Live</span>
            <button onClick={() => setDark(d => !d)} style={{
              background: "none", border: "1px solid var(--border)", color: "var(--text2)",
              padding: "5px 9px", borderRadius: "var(--radius-xs)", fontSize: 13,
              cursor: "pointer",
            }}>{dark ? "☀️" : "🌙"}</button>
            <button style={{
              background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.2)",
              color: "#dc2626", padding: "5px 9px", borderRadius: "var(--radius-xs)",
              fontSize: 11, ...mono, cursor: "pointer",
            }}>SOS</button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.map((m, i) => {
            if (m.kind === "typing") return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: "var(--green-dim)",
                  border: "1px solid var(--green-border)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, flexShrink: 0,
                }}>⚡</div>
                <div style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "3px 12px 12px 12px", padding: "10px 14px",
                }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 150, 300].map(d => (
                      <div key={d} style={{
                        width: 6, height: 6, borderRadius: "50%", background: "var(--text3)",
                        animation: `bounce 0.9s ${d}ms infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            );

            if (m.kind === "form") return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, animation: "fadeUp .3s ease" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: "var(--green-dim)",
                  border: "1px solid var(--green-border)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, flexShrink: 0, marginTop: 2,
                }}>⚡</div>
                <RouteFormInline
                  form={form}
                  setForm={setForm}
                  preset={preset}
                  setPreset={setPreset}
                  loading={loading}
                  onSubmit={handleCalculate}
                />
              </div>
            );

            if (m.kind === "user") return (
              <div key={i} style={{ display: "flex", justifyContent: "flex-end", animation: "fadeUp .3s ease" }}>
                <div style={{
                  background: "var(--green)", color: "#fff",
                  borderRadius: "12px 12px 3px 12px", padding: "10px 14px",
                  fontSize: 13, lineHeight: 1.55, maxWidth: "85%",
                  whiteSpace: "pre-line",
                }}>
                  {m.text}
                </div>
              </div>
            );

            if (m.kind === "ai") return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, animation: "fadeUp .3s ease" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: "var(--green-dim)",
                  border: "1px solid var(--green-border)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, flexShrink: 0, marginTop: 2,
                }}>⚡</div>
                <div style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "3px 12px 12px 12px", padding: "10px 14px",
                  fontSize: 13, lineHeight: 1.6, color: "var(--text)", maxWidth: "85%",
                }}
                  dangerouslySetInnerHTML={{ __html: m.html }}
                />
              </div>
            );
            return null;
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Chat input */}
        <div style={{
          padding: "10px 14px", borderTop: "1px solid var(--border)",
          background: "var(--surface)", display: "flex", gap: 8, alignItems: "center", flexShrink: 0,
        }}>
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendChat()}
            placeholder="Ask about battery, chargers, weather…"
            style={{
              flex: 1, background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: 20, padding: "8px 14px", fontSize: 13,
              fontFamily: "var(--font-sans)", color: "var(--text)", outline: "none",
            }}
          />
          <button onClick={sendChat} style={{
            width: 36, height: 36, borderRadius: "50%", background: "var(--green)",
            border: "none", color: "#fff", fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>↑</button>
        </div>
      </div>

      {/* ══════════ RIGHT: MAP + TABS PANEL ══════════ */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        opacity: panelOpen ? 1 : 0, pointerEvents: panelOpen ? "auto" : "none",
        transition: "opacity 0.5s 0.2s",
        background: "var(--bg)", overflow: "hidden",
      }}>

        {/* Tab bar */}
        <div style={{
          display: "flex", borderBottom: "1px solid var(--border)",
          background: "var(--surface)", padding: "0 16px", flexShrink: 0,
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "12px 14px", fontSize: 12, ...mono,
              color: activeTab === t.id ? "var(--green)" : "var(--text3)",
              border: "none", background: "none", cursor: "pointer",
              borderBottom: `2px solid ${activeTab === t.id ? "var(--green)" : "transparent"}`,
              transition: "all .15s", whiteSpace: "nowrap",
            }}>{t.label}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {result && (
            <>
              {activeTab === "navigate"  && <TabNavigate  result={result} startBat={startBat} />}
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

/* ════════════════════════════════════════════════════
   ROUTE FORM (inline in chat)
════════════════════════════════════════════════════ */
function RouteFormInline({
  form, setForm, preset, setPreset, loading, onSubmit,
}: {
  form: RouteFormData;
  setForm: React.Dispatch<React.SetStateAction<RouteFormData>>;
  preset: string;
  setPreset: (p: string) => void;
  loading: boolean;
  onSubmit: () => void;
}) {
  const inputStyle: React.CSSProperties = {
    background: "var(--surface2)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-xs)", padding: "8px 10px",
    fontSize: 13, fontFamily: "var(--font-sans)", color: "var(--text)",
    outline: "none", width: "100%",
  };

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: 16,
      display: "flex", flexDirection: "column", gap: 12,
      boxShadow: "var(--shadow)", flex: 1, maxWidth: 320,
    }}>
      <Label>Plan your route</Label>

      {/* Origin */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text3)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
          Starting point
        </label>
        <input
          style={inputStyle}
          placeholder="e.g. Bengaluru, Karnataka"
          value={form.origin}
          onChange={e => setForm(f => ({ ...f, origin: e.target.value }))}
        />
      </div>

      {/* Destination */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text3)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
          Destination
        </label>
        <input
          style={inputStyle}
          placeholder="e.g. Mysore Palace, KA"
          value={form.destination}
          onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
        />
      </div>

      {/* Battery slider */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>
          <span style={{ color: "var(--text3)" }}>Current battery</span>
          <span style={{ color: getBatteryColor(form.batteryPercent), fontWeight: 600 }}>{form.batteryPercent}%</span>
        </div>
        <input
          type="range" min={5} max={100} value={form.batteryPercent}
          onChange={e => setForm(f => ({ ...f, batteryPercent: parseInt(e.target.value) }))}
          style={{
            background: `linear-gradient(to right, ${getBatteryColor(form.batteryPercent)} ${form.batteryPercent}%, var(--border) ${form.batteryPercent}%)`,
          }}
        />
      </div>

      {/* Vehicle presets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Label>Vehicle model</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
          {EV_PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => { setPreset(p.label); setForm(f => ({ ...f, vehicleRangeKm: p.range })); }}
              style={{
                padding: "7px 4px", borderRadius: "var(--radius-xs)",
                border: `1px solid ${preset === p.label ? "var(--green)" : "var(--border)"}`,
                background: preset === p.label ? "var(--green-dim)" : "var(--surface2)",
                cursor: "pointer", fontSize: 11, fontFamily: "var(--font-sans)",
                color: preset === p.label ? "var(--green)" : "var(--text2)",
                textAlign: "center", lineHeight: 1.3, fontWeight: preset === p.label ? 700 : 400,
              }}
            >
              {p.label}
              {p.range > 0 && <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: .6, marginTop: 2 }}>{p.range}km</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Custom range */}
      {preset === "Custom" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <Label>Max range (km)</Label>
          <input
            type="number" min={50} max={1000}
            value={form.vehicleRangeKm}
            onChange={e => setForm(f => ({ ...f, vehicleRangeKm: parseInt(e.target.value) }))}
            style={inputStyle}
          />
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={loading || !form.origin || !form.destination}
        style={{
          width: "100%", padding: "10px", background: "var(--green)", color: "#fff",
          border: "none", borderRadius: "var(--radius-xs)", fontSize: 13,
          fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer",
          opacity: loading || !form.origin || !form.destination ? .5 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        {loading ? (
          <>
            <div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
            Calculating…
          </>
        ) : "⚡ Calculate EV Range"}
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: NAVIGATE
════════════════════════════════════════════════════ */
function TabNavigate({ result, startBat }: { result: RoutePlanResult; startBat: number }) {
  const { origin, destination, route, weather, battery, chargingStations } = result;
  const originCity = origin.display_name.split(",")[0];
  const destCity   = destination.display_name.split(",")[0];

  const weatherIcon =
    weather.conditions === "Ideal" ? "☀️" :
    weather.conditions.includes("Rain") ? "🌧️" :
    weather.conditions.includes("Cold") ? "❄️" :
    weather.conditions.includes("Wind") ? "💨" : "🌡️";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>

      {/* Map */}
      <div style={{
        borderRadius: "var(--radius)", overflow: "hidden",
        border: "1px solid var(--border)", position: "relative",
        boxShadow: "var(--shadow)",
      }}>
        <RouteMap
          origin={origin}
          destination={destination}
          chargingStations={chargingStations}
          batteryPercent={startBat}
          remainingBattery={battery.remainingBattery}
        />
      </div>

      {/* Route options */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "⭐ Eco", dist: route.distanceKm, bat: battery.totalBatteryUsed, accent: "var(--green)", isMain: true },
          { label: "Fastest", dist: Math.round(route.distanceKm * 0.89), bat: Math.round(battery.totalBatteryUsed * 1.42), accent: undefined },
          { label: "Shortest", dist: Math.round(route.distanceKm * 0.81), bat: Math.round(battery.totalBatteryUsed * 1.76), accent: undefined },
        ].map(r => (
          <Card key={r.label} style={{ borderTop: r.isMain ? `2px solid ${r.accent}` : undefined }}>
            <div style={{ padding: "10px 12px" }}>
              <Label color={r.isMain ? "var(--green)" : undefined}>{r.label}</Label>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginTop: 2 }}>{r.dist} km</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#dc2626", marginTop: 2 }}>−{r.bat}% bat</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <Card>
          <CardHeader title="Real predicted range" />
          <div style={{ padding: "10px 14px", display: "flex", alignItems: "baseline", gap: 6 }}>
            <div style={{ fontSize: 30, fontWeight: 800 }}>{battery.effectiveRange}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text3)" }}>km</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginLeft: "auto" }}>Mfr: {result.route.distanceKm + Math.round(result.battery.totalBatteryUsed * 0.4)}km</div>
          </div>
        </Card>
        <Card>
          <CardHeader title="ETA" />
          <div style={{ padding: "10px 14px" }}>
            <div style={{ fontSize: 30, fontWeight: 800 }}>{Math.floor(route.durationMin / 60)}h {route.durationMin % 60}m</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
              {chargingStations.length > 0 ? `${chargingStations.filter(s => !battery.willReachDestination).length || 1} charge stop en route` : "No charge stop needed"}
            </div>
          </div>
        </Card>
      </div>

      {/* Weather */}
      <Card>
        <CardHeader icon={weatherIcon} title="Weather impact" />
        <div style={{ padding: "10px 14px", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, flex: 1 }}>
            {[
              { val: `${weather.temperature}°C`, key: "Temp" },
              { val: `${weather.wind_speed}km/h`, key: "Wind" },
              { val: weather.precipitation > 0 ? `${weather.precipitation}mm` : "Dry", key: "Rain" },
            ].map(w => (
              <div key={w.key} style={{
                background: "var(--surface2)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-xs)", padding: "8px 4px", textAlign: "center",
              }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{w.val}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".05em", marginTop: 2 }}>{w.key}</div>
              </div>
            ))}
          </div>
          <div style={{
            background: "rgba(217,119,6,.08)", border: "1px solid rgba(217,119,6,.2)",
            borderRadius: "var(--radius-xs)", padding: "8px 10px",
            fontFamily: "var(--font-mono)", fontSize: 11, color: "#92400e", maxWidth: 140, lineHeight: 1.5,
          }}>
            {Math.round((1 - weather.weatherFactor) * 100)}% range impact from {weather.conditions.toLowerCase()} conditions
          </div>
        </div>
      </Card>

      {/* Power mode */}
      <Card>
        <CardHeader title="Power mode" />
        <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
            {[
              { icon: "🌿", label: "Eco", active: true },
              { icon: "🏎", label: "Sport" },
              { icon: "🌙", label: "Night" },
              { icon: "💾", label: "Save" },
            ].map(m => (
              <div key={m.label} style={{
                padding: "8px 4px", borderRadius: "var(--radius-xs)", textAlign: "center", cursor: "pointer",
                background: m.active ? "var(--green-dim)" : "var(--surface2)",
                border: `1px solid ${m.active ? "var(--green-border)" : "var(--border)"}`,
              }}>
                <div style={{ fontSize: 16 }}>{m.icon}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: ".05em", marginTop: 3, color: m.active ? "var(--green)" : "var(--text3)", fontWeight: m.active ? 600 : 400 }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)",
            background: "var(--surface2)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-xs)", padding: "8px 10px", lineHeight: 1.5,
          }}>
            Eco mode active — range extended by ~18km. Regenerative braking on.
          </div>
        </div>
      </Card>

      <button style={{
        width: "100%", padding: 11, background: "var(--green)", color: "#fff",
        border: "none", borderRadius: "var(--radius-xs)", fontSize: 13, fontWeight: 700,
        fontFamily: "var(--font-sans)", cursor: "pointer",
      }}>
        Start Navigation →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: ANALYTICS
════════════════════════════════════════════════════ */
function TabAnalytics({ result }: { result: RoutePlanResult }) {
  const { battery, route } = result;
  const mfrRange = Math.round(battery.effectiveRange / battery.weatherFactor ?? battery.effectiveRange * 1.27);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>

      {/* Range reality */}
      <Card>
        <CardHeader title="Range reality check" />
        <div style={{ padding: "12px 14px", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text3)", textDecoration: "line-through" }}>{mfrRange} km</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", textTransform: "uppercase", marginTop: 2 }}>Manufacturer</div>
          </div>
          <div style={{ fontSize: 18, color: "var(--text3)" }}>→</div>
          <div style={{ flex: 1, textAlign: "center", background: "var(--green-dim)", border: "1px solid var(--green-border)", borderRadius: "var(--radius-xs)", padding: 10 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--green)" }}>{battery.effectiveRange} km</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)", opacity: .7, textTransform: "uppercase", marginTop: 2 }}>Real predicted</div>
          </div>
        </div>
        <div style={{ margin: "0 14px 12px", background: "rgba(220,38,38,.06)", border: "1px solid rgba(220,38,38,.15)", borderRadius: "var(--radius-xs)", padding: "7px 10px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626" }}>
          −{mfrRange - battery.effectiveRange}km gap due to weather, style &amp; battery age
        </div>
      </Card>

      {/* Driving style analysis */}
      <Card>
        <CardHeader title="Driving style analysis" />
        <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Acceleration aggressiveness", pct: 72, val: "−18%", color: "#dc2626" },
            { label: "Hard braking frequency",      pct: 48, val: "−7%",  color: "#d97706" },
            { label: "Speed consistency",           pct: 85, val: "+4%",  color: "var(--green)" },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text2)", minWidth: 180 }}>{row.label}</div>
              <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2, transition: "width .8s" }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: row.color, minWidth: 34, textAlign: "right" }}>{row.val}</div>
            </div>
          ))}
          <div style={{ marginTop: 4, background: "rgba(217,119,6,.07)", border: "1px solid rgba(217,119,6,.2)", borderRadius: "var(--radius-xs)", padding: "8px 10px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#92400e", lineHeight: 1.5 }}>
            Your style reduces range by 18%. Smooth acceleration saves ~26km.
          </div>
        </div>
      </Card>

      {/* Energy breakdown */}
      <Card>
        <CardHeader title="Energy breakdown" />
        <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 7 }}>
          {[
            { label: "Distance load",  pct: 48, color: "#2563eb" },
            { label: "Weather drag",   pct: 28, color: "#d97706" },
            { label: "Traffic stops",  pct: 15, color: "#dc2626" },
            { label: "Driving style",  pct: 18, color: "#7c3aed" },
            { label: "Other",          pct: 7,  color: "var(--text3)" },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text2)", minWidth: 130 }}>{row.label}</div>
              <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", minWidth: 28, textAlign: "right" }}>{row.pct}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Consumption grid */}
      <Card>
        <CardHeader title="Consumption details" />
        <div style={{ padding: "10px 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
            {[
              { val: `${battery.totalBatteryUsed}%`,             key: "Used",      color: "#dc2626" },
              { val: `${Math.max(0, battery.remainingBattery)}%`, key: "Remaining", color: "var(--green)" },
              { val: `${battery.effectiveRange}km`,               key: "Eff. Range", color: "#2563eb" },
              { val: `${battery.safetyBuffer}%`,                  key: "Buffer",    color: "#7c3aed" },
              { val: `${route.distanceKm}km`,                     key: "Distance",  color: "#d97706" },
              { val: `${route.durationMin}m`,                     key: "ETA",       color: "var(--green)" },
            ].map(s => (
              <div key={s.key} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-xs)", padding: "8px 4px", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".05em", marginTop: 2 }}>{s.key}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: BATTERY
════════════════════════════════════════════════════ */
function TabBattery({ result, startBat }: { result: RoutePlanResult; startBat: number }) {
  const { battery } = result;
  const remaining   = Math.max(0, battery.remainingBattery);
  const isOk        = battery.willReachDestination;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <Card>
        <CardHeader title="Battery prediction" />
        <div style={{ padding: 14 }}>
          <BatteryGauge
            before={startBat}
            after={battery.remainingBattery}
            used={battery.totalBatteryUsed}
            willReach={battery.willReachDestination}
            safetyBuffer={battery.safetyBuffer}
          />
        </div>
      </Card>

      {/* Verdict */}
      <Card>
        <CardHeader title="Reach verdict" />
        <div style={{ padding: 14 }}>
          <div style={{
            borderRadius: "var(--radius-xs)", padding: 12,
            display: "flex", alignItems: "flex-start", gap: 10,
            background: isOk ? "var(--green-dim)" : "rgba(220,38,38,.07)",
            border: `1px solid ${isOk ? "var(--green-border)" : "rgba(220,38,38,.2)"}`,
          }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{isOk ? "✅" : "⚠️"}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: isOk ? "var(--green)" : "#dc2626" }}>
                {isOk ? `Arriving with ${remaining.toFixed(0)}% battery` : `Not enough charge — ${Math.abs(battery.remainingBattery).toFixed(0)}% short`}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 3, lineHeight: 1.4 }}>
                {isOk ? `Safety buffer: ${battery.safetyBuffer}% · Trip looks good!` : "Please charge before departing or find a stop en route"}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Impact factors */}
      <Card>
        <CardHeader title="Battery impact factors" />
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "🌤", label: "Weather",   val: battery.breakdowns.weatherImpact,   color: "#dc2626" },
            { icon: "🏎", label: "Speed",     val: battery.breakdowns.speedImpact,     color: "#d97706" },
            { icon: "⛰", label: "Elevation", val: battery.breakdowns.elevationImpact, color: "var(--text3)" },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11 }}>
                <span style={{ color: "var(--text2)" }}>{row.icon} {row.label}</span>
                <span style={{ color: row.color }}>{row.val}</span>
              </div>
              <div style={{ height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  width: `${Math.min(100, parseInt(row.val) * 3 || 5)}%`,
                  height: "100%", background: row.color, borderRadius: 2,
                }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Usable range note" />
        <div style={{
          margin: "0 14px 14px",
          background: "rgba(220,38,38,.05)", border: "1px solid rgba(220,38,38,.15)",
          borderRadius: "var(--radius-xs)", padding: "10px 12px",
          fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)", lineHeight: 1.6,
        }}>
          Real usable range: only ~5km past 15% mark. Avoid draining below 15% to protect cell longevity.
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: CHARGERS
════════════════════════════════════════════════════ */
function TabChargers({ result }: { result: RoutePlanResult }) {
  const { chargingStations, battery } = result;
  const fastCount = chargingStations.filter(s => s.fastCharge).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <Card>
        <CardHeader
          title={battery.willReachDestination ? "Nearby charging stations" : "Charging stops needed"}
          right={
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              background: "var(--green-dim)", color: "var(--green)",
              border: "1px solid var(--green-border)", padding: "2px 8px", borderRadius: 4,
            }}>{chargingStations.length} Found</div>
          }
        />
        <div style={{ padding: "10px 14px" }}>
          {chargingStations.length === 0 ? (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)", textAlign: "center", padding: "20px 0" }}>
              No charging stations found along this route.
            </div>
          ) : chargingStations.map((s, i) => (
            <div key={s.id} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              padding: "10px 0", borderBottom: i < chargingStations.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                padding: "3px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)",
                fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0, marginTop: 1,
                background: s.fastCharge ? "rgba(217,119,6,.1)" : "var(--surface2)",
                color: s.fastCharge ? "#d97706" : "var(--text3)",
                border: `1px solid ${s.fastCharge ? "rgba(217,119,6,.2)" : "var(--border)"}`,
              }}>
                {s.fastCharge ? "⚡ DC" : "AC"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{s.name}</div>
                {s.address && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{s.address}</div>}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>
                  <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "var(--surface2)", color: "var(--text3)", border: "1px solid var(--border)" }}>
                    🔌 {s.connectors} port{s.connectors !== 1 ? "s" : ""}
                  </span>
                  {s.powerKw && <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "var(--green-dim)", color: "var(--green)", border: "1px solid var(--green-border)" }}>{s.powerKw}kW</span>}
                  {s.network && <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "rgba(124,58,237,.08)", color: "#7c3aed", border: "1px solid rgba(124,58,237,.2)" }}>{s.network}</span>}
                  {s.batteryAtPoint !== undefined && (
                    <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "rgba(37,99,235,.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,.2)" }}>
                      🔋 {s.batteryAtPoint.toFixed(0)}% on arrival
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader title="Live alerts" />
        <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ background: "var(--green-dim)", border: "1px solid var(--green-border)", borderRadius: "var(--radius-xs)", padding: "9px 12px", fontFamily: "var(--font-mono)", fontSize: 12, color: "#166534", lineHeight: 1.5 }}>
            Auto-stop added at first charger — on your eco route at 47%.
          </div>
          {!battery.willReachDestination && (
            <div style={{ background: "rgba(220,38,38,.07)", border: "1px solid rgba(220,38,38,.2)", borderRadius: "var(--radius-xs)", padding: "9px 12px", fontFamily: "var(--font-mono)", fontSize: 12, color: "#dc2626", lineHeight: 1.5 }}>
              ⚠️ Battery insufficient — a charging stop is required to complete this journey.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: AI ANALYSIS
════════════════════════════════════════════════════ */
function TabAI({ result }: { result: RoutePlanResult }) {
  const { aiInsights, battery } = result;
  if (!aiInsights) return (
    <div style={{ padding: 32, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)" }}>
      AI analysis not available for this trip.
    </div>
  );

  const VERDICT_CONFIG: Record<string, { icon: string; label: string; color: string; bg: string; border: string }> = {
    go:             { icon: "✅", label: "Good to Go",            color: "var(--green)", bg: "var(--green-dim)", border: "var(--green-border)" },
    charge_first:   { icon: "🔋", label: "Charge Before Leaving", color: "#d97706", bg: "rgba(217,119,6,.08)", border: "rgba(217,119,6,.25)" },
    charge_enroute: { icon: "⚡", label: "Charge En Route",       color: "#dc2626", bg: "rgba(220,38,38,.08)", border: "rgba(220,38,38,.25)" },
  };
  const verdict = VERDICT_CONFIG[aiInsights.verdict] ?? VERDICT_CONFIG.go;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>

      {/* Trip score */}
      <Card>
        <CardHeader title="Trip score" />
        <div style={{ padding: 14, display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, color: "var(--green)", lineHeight: 1 }}>B+</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)", marginTop: 4 }}>78 / 100</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginBottom: 2 }}>Smooth rider +4 pts from last trip</div>
            {[
              { label: "Speed control", pct: 82, color: "var(--green)" },
              { label: "Braking",       pct: 65, color: "#d97706" },
              { label: "Regen use",     pct: 78, color: "#2563eb" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", minWidth: 90 }}>{row.label}</div>
                <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", minWidth: 24, textAlign: "right" }}>{row.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI verdict */}
      <Card accent="rgba(124,58,237,.2)">
        <CardHeader
          title="AI Analysis · Claude"
          right={
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 9px", borderRadius: 20, fontSize: 9, fontFamily: "var(--font-mono)",
              background: "rgba(124,58,237,.1)", color: "#7c3aed",
              border: "1px solid rgba(124,58,237,.2)", textTransform: "uppercase", letterSpacing: ".06em",
            }}>🤖 Claude</div>
          }
        />
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Verdict banner */}
          <div style={{ background: verdict.bg, border: `1px solid ${verdict.border}`, borderRadius: "var(--radius-xs)", padding: 12, display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{verdict.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: verdict.color }}>{verdict.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 3, lineHeight: 1.4 }}>{aiInsights.summary}</div>
            </div>
          </div>

          {/* Optimal speed */}
          <div style={{ background: "var(--green-dim)", border: "1px solid var(--green-border)", borderRadius: "var(--radius-xs)", padding: "10px 12px", display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "var(--green)", lineHeight: 1, letterSpacing: -1 }}>{aiInsights.optimalSpeed}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--green)", opacity: .6, textTransform: "uppercase", letterSpacing: ".05em" }}>km/h optimal</div>
            </div>
            <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text2)", lineHeight: 1.5 }}>
              Drive at {aiInsights.optimalSpeed} km/h for maximum range efficiency
            </div>
          </div>

          {/* Charging advice */}
          <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--radius-xs)", padding: "10px 12px" }}>
            <Label>⚡ Charging strategy</Label>
            <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5, marginTop: 4 }}>{aiInsights.chargingAdvice}</div>
          </div>

          {/* Tips */}
          <Label>Smart tips</Label>
          {aiInsights.tips.map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "8px 10px", borderRadius: "var(--radius-xs)", background: "var(--surface2)", border: "1px solid var(--border)", fontSize: 12, color: "var(--text2)", lineHeight: 1.5, alignItems: "flex-start" }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4, background: "var(--green-dim)", border: "1px solid var(--green-border)",
                color: "var(--green)", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
              }}>{i + 1}</div>
              {tip}
            </div>
          ))}
        </div>
      </Card>

      {/* Style loss */}
      <Card accent="rgba(220,38,38,.2)">
        <CardHeader title="Driving style loss" />
        <div style={{ padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#dc2626", letterSpacing: -2 }}>−18%</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", lineHeight: 1.5 }}>
            Aggressive acceleration detected. Smooth starts could recover ~26km of range.
          </div>
        </div>
      </Card>
    </div>
  );
}