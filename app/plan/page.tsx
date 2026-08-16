// app/plan/page.tsx
"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { RouteFormData, RoutePlanResult } from "../lib/types";
import {
  Msg,
  EV_PRESETS,
  TABS,
  isInvalidLocation,
  getBatteryColor,
} from "../lib/planHelpers";

const RouteMap     = dynamic(() => import("../components/RouteMap"),     { ssr: false });
const BatteryGauge = dynamic(() => import("../components/BatteryGauge"), { ssr: false });

// ── Auth guard wrapper ──────────────────────────────────────────────────
export default function PlanPage() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060c0a" }}>
        <div style={{ width: 32, height: 32, border: "3px solid rgba(34,197,94,0.15)", borderTopColor: "#22c55e", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (status === "unauthenticated") {
    signIn("google", { callbackUrl: "/plan" });
    return null;
  }

  return <PlanPageContent />;
}

function PlanPageContent() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "";
  }, [dark]);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      kind: "ai",
      html: "Hey! I'm <strong>VoltIQ</strong> ⚡<br/>Your intelligent EV range planner.<br/><br/>Fill in your route below and I'll predict battery usage, find chargers, and give you a complete trip analysis.",
    },
    { kind: "form" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef   = useRef<HTMLDivElement>(null);
  const messagesRef  = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<RouteFormData>({
    origin: "", destination: "", batteryPercent: 74, vehicleRangeKm: 400,
  });
  const [preset, setPreset]   = useState("Custom");
  const [loading, setLoading] = useState(false);

  const [result, setResult]                     = useState<RoutePlanResult | null>(null);
  const [panelOpen, setPanelOpen]               = useState(false);
  const [activeTab, setActiveTab]               = useState("navigate");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Tracks the credit balance shown in the header — set whenever a
  // route-plan response comes back with creditsRemaining.
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  /* ── Calculate ──────────────────────────────────────────────────────── */
  async function handleCalculate() {
    if (!form.origin || !form.destination) return;

    if (isInvalidLocation(form.origin) || isInvalidLocation(form.destination)) {
      setMsgs((prev) => [
        ...prev,
        {
          kind: "ai",
          html: "⚠️ Location cannot be only numbers. Please enter a valid place name like <strong>Bengaluru</strong> or <strong>Mysore</strong>.",
        },
      ]);
      return;
    }

    setLoading(true);
    setMsgs((prev) =>
      prev.filter((m) => m.kind !== "form").concat([
        {
          kind: "user",
          text: `${form.origin} → ${form.destination}\n${preset} · ${form.batteryPercent}% battery · ${form.vehicleRangeKm}km range`,
        },
        { kind: "typing" },
      ])
    );

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
      setCreditsRemaining(data.creditsRemaining);

      const willReach = data.battery.willReachDestination;
      const historyLine = data.savedRouteId
        ? `<a href="/history" style="color:var(--green);text-decoration:underline">View in trip history →</a>`
        : `<span style="opacity:.6">Trip wasn't saved to history — you can still see it here.</span>`;

      setMsgs((prev) =>
        prev.filter((m) => m.kind !== "typing").concat([
          {
            kind: "ai",
            html: `Route calculated!<br/><br/>
📍 <strong>${form.origin}</strong> → <strong>${form.destination}</strong><br/>
🔋 ${form.batteryPercent}% battery · ${form.vehicleRangeKm}km range<br/>
🌿 ${data.route.distanceKm} km · ${data.route.durationMin} min<br/>
${
  willReach
    ? `✅ Arriving with <strong>${Math.max(0, data.battery.remainingBattery).toFixed(0)}%</strong> battery`
    : `⚠️ <strong>Charge stop needed</strong> — ${Math.abs(data.battery.remainingBattery).toFixed(0)}% short`
}<br/>
💳 <strong>${data.creditsRemaining}</strong> credits remaining<br/><br/>
${historyLine}<br/>
<span style="opacity:.5;font-size:11px">Use the panels → for full details</span>`,
          },
        ])
      );
      setPanelOpen(true);
    } catch (e: any) {
      setMsgs((prev) =>
        prev.filter((m) => m.kind !== "typing").concat([
          { kind: "ai", html: `⚠️ ${e.message || "Something went wrong. Please try again."}` },
        ])
      );
    } finally {
      setLoading(false);
    }
  }

  /* ── Chat ───────────────────────────────────────────────────────────── */
  async function sendChat() {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setMsgs((prev) => [...prev, { kind: "user", text }, { kind: "typing" }]);
    await new Promise((r) => setTimeout(r, 900));
    setMsgs((prev) => {
      const filtered = prev.filter((m) => m.kind !== "typing");
      const lower = text.toLowerCase();
      let html = "I can help! Use the tabs on the right to explore battery, chargers, and AI analysis.";
      if (lower.includes("charg"))        html = "Charger details are in the <strong>Chargers</strong> tab — with live status and distances.";
      else if (lower.includes("batter"))  html = "Your battery prediction is in the <strong>Battery</strong> tab with all impact factors.";
      else if (lower.includes("speed"))   html = "Optimal speed for maximum range is around <strong>72–90 km/h</strong>. See the AI tab for personalised tips.";
      else if (lower.includes("route") || lower.includes("map"))
        html = "Your route is shown on the <strong>Navigate</strong> tab — eco, fast, and shortest options with battery cost for each.";
      else if (lower.includes("weather")) html = "Weather conditions are shown in the <strong>Navigate → Details</strong> subtab with efficiency impact.";
      else if (lower.includes("credit")) html = creditsRemaining !== null
        ? `You have <strong>${creditsRemaining}</strong> credits remaining. Each route plan costs 5 credits — check the <strong>History</strong> page for full activity.`
        : "Check your credit balance on the <strong>History</strong> page.";
      return [...filtered, { kind: "ai" as const, html }];
    });
  }

  const startBat = result
    ? Math.round(result.battery.totalBatteryUsed + Math.max(0, result.battery.remainingBattery))
    : form.batteryPercent;

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
  <div
    style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "var(--bg)",
      transition: "background .3s",
    }}
  >
    {/* ══════════ LEFT: CHAT SIDEBAR ══════════ */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        flexShrink: 0,
        borderRight: panelOpen && !sidebarCollapsed ? "1px solid var(--border)" : "1px solid transparent",
        transition: "width .5s cubic-bezier(.4,0,.2,1), border-color .3s",
        width: !panelOpen
          ? "100%"
          : sidebarCollapsed
          ? "0px"
          : "360px",
        overflow: sidebarCollapsed ? "hidden" : undefined,
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: "var(--green)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: "#fff", fontWeight: 800,
              }}
            >⚡</div>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15, color: "var(--green)", letterSpacing: "-.3px" }}>
              VoltIQ
            </span>
          </div>

          {/* Live dot */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 2px rgba(16,185,129,.2)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)" }}>Live</span>
          </div>

          {/* Credits pill — only shown once we know the balance */}
          {creditsRemaining !== null && (
            <Link
              href="/history"
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "3px 9px", borderRadius: 20,
                background: "var(--green-dim)", border: "1px solid var(--green-border)",
                fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)",
                textDecoration: "none", flexShrink: 0,
              }}
              title="View credit activity in history"
            >
              💳 {creditsRemaining}
            </Link>
          )}

          {/* Actions */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <Link
              href="/history"
              style={{
                width: 28, height: 28, borderRadius: 6,
                border: "1px solid var(--border)", background: "var(--surface2)",
                color: "var(--text3)", fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
              }}
              title="Trip history"
            >
              🕓
            </Link>
            {panelOpen && (
              <button
                onClick={() => setSidebarCollapsed((v) => !v)}
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  border: "1px solid var(--border)", background: "var(--surface2)",
                  color: "var(--text3)", fontSize: 12, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
                title={sidebarCollapsed ? "Expand chat" : "Collapse chat"}
              >
                {sidebarCollapsed ? "→" : "←"}
              </button>
            )}
            <button
              onClick={() => setDark((d) => !d)}
              style={{
                width: 28, height: 28, borderRadius: 6,
                border: "1px solid var(--border)", background: "var(--surface2)",
                fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {msgs.map((m, i) => {
            /* Typing indicator */
            if (m.kind === "typing") return (
              <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: 8, animation: "fadeUp .2s ease" }}>
                <Avatar />
                <div style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "4px 16px 16px 16px", padding: "12px 16px",
                }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 150, 300].map((d) => (
                      <div key={d} style={{
                        width: 6, height: 6, borderRadius: "50%", background: "var(--text3)",
                        animation: `bounce 0.9s ${d}ms infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            );

            /* Route form */
            if (m.kind === "form") return (
              <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: 8, animation: "fadeUp .2s ease" }}>
                <Avatar />
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

            /* User bubble */
            if (m.kind === "user") return (
              <div key={i} style={{ display: "flex", justifyContent: "flex-end", animation: "fadeUp .2s ease" }}>
                <div style={{
                  background: "var(--green)", color: "#fff",
                  borderRadius: "16px 16px 4px 16px",
                  padding: "10px 14px", fontSize: 13, lineHeight: 1.6,
                  maxWidth: "82%", whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                }}>
                  {m.text}
                </div>
              </div>
            );

            /* AI bubble */
            if (m.kind === "ai") return (
              <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: 8, animation: "fadeUp .2s ease" }}>
                <Avatar />
                <div
                  style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "4px 16px 16px 16px",
                    padding: "10px 14px", fontSize: 13, lineHeight: 1.6,
                    color: "var(--text)", maxWidth: "84%",
                    fontFamily: "var(--font-sans)",
                  }}
                  dangerouslySetInnerHTML={{ __html: m.html }}
                />
              </div>
            );

            return null;
          })}
          <div ref={chatEndRef} style={{ height: 4 }} />
        </div>

        {/* Chat input */}
        <div style={{
          padding: "10px 16px 12px",
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
          display: "flex", gap: 8, alignItems: "center",
          flexShrink: 0,
        }}>
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendChat()}
            placeholder="Ask about battery, chargers, weather…"
            style={{
              flex: 1, background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: 22, padding: "9px 16px",
              fontSize: 13, fontFamily: "var(--font-sans)",
              color: "var(--text)", outline: "none",
              transition: "border-color .15s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
          />
          <button
            onClick={sendChat}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--green)", border: "none",
              color: "#fff", fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "opacity .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = ".85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >↑</button>
        </div>
      </div>

      {/* Collapsed sidebar re-open handle */}
      {sidebarCollapsed && panelOpen && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
            zIndex: 30, width: 20, height: 48,
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "0 8px 8px 0", color: "var(--text3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, cursor: "pointer", boxShadow: "var(--shadow)",
          }}
        >›</button>
      )}

      {/* ══════════ RIGHT: MAP + TABS ══════════ */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          opacity: panelOpen ? 1 : 0,
          transform: panelOpen ? "translateX(0)" : "translateX(32px)",
          pointerEvents: panelOpen ? "auto" : "none",
          transition: "opacity .5s .15s, transform .5s .15s",
        }}
      >
        {/* Tab bar */}
        <div style={{
          display: "flex", borderBottom: "1px solid var(--border)",
          background: "var(--surface)", padding: "0 4px",
          flexShrink: 0, overflowX: "auto",
        }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "11px 14px", fontSize: 12,
                fontFamily: "var(--font-mono)", whiteSpace: "nowrap",
                color: activeTab === t.id ? "var(--green)" : "var(--text3)",
                border: "none", background: "none", cursor: "pointer",
                borderBottom: `2px solid ${activeTab === t.id ? "var(--green)" : "transparent"}`,
                marginBottom: -1, transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 13 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {result && (
            <>
              {/* Navigate — always rendered, toggled by opacity so map stays alive */}
              <div style={{
                position: "absolute", inset: 0,
                opacity: activeTab === "navigate" ? 1 : 0,
                pointerEvents: activeTab === "navigate" ? "auto" : "none",
                zIndex: activeTab === "navigate" ? 1 : 0,
                transition: "opacity .2s",
              }}>
                <TabNavigate result={result} startBat={startBat} dark={dark} />
              </div>

              {/* Other tabs */}
              <div style={{
                position: "absolute", inset: 0, overflowY: "auto",
                opacity: activeTab !== "navigate" ? 1 : 0,
                pointerEvents: activeTab !== "navigate" ? "auto" : "none",
                zIndex: activeTab !== "navigate" ? 1 : 0,
                transition: "opacity .2s",
              }}>
                {activeTab === "analytics" && <TabAnalytics result={result} />}
                {activeTab === "battery"   && <TabBattery   result={result} startBat={startBat} />}
                {activeTab === "chargers"  && <TabChargers  result={result} />}
                {activeTab === "ai"        && <TabAI        result={result} />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      background: "var(--green-dim)", border: "1px solid var(--green-border)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, flexShrink: 0, marginBottom: 2,
    }}>⚡</div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 10,
      textTransform: "uppercase", letterSpacing: ".08em",
      color: "var(--text3)", marginBottom: 10, fontWeight: 600,
    }}>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: 12, padding: 14,
    }}>
      <SectionTitle>{label}</SectionTitle>
      <div style={{ fontSize: 24, fontWeight: 800, color: color ?? "var(--text)", fontFamily: "var(--font-sans)" }}>{value}</div>
      {sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 4 }}>{sub}</div>}
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
    width: "100%",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 8, padding: "8px 10px",
    fontSize: 13, fontFamily: "var(--font-sans)",
    color: "var(--text)", outline: "none",
    transition: "border-color .15s",
  };

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "4px 16px 16px 16px",
      padding: 16, display: "flex", flexDirection: "column", gap: 12,
      width: "100%", maxWidth: 300,
      boxShadow: "0 2px 12px rgba(0,0,0,.06)",
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text3)" }}>
        Plan your route
      </div>

      {/* Origin */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text3)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", flexShrink: 0 }} />
          From
        </label>
        <input
          style={inputStyle}
          placeholder="e.g. Bengaluru, KA"
          value={form.origin}
          onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
          onFocus={(e)  => (e.currentTarget.style.borderColor = "var(--green)")}
          onBlur={(e)   => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Destination */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text3)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block", flexShrink: 0 }} />
          To
        </label>
        <input
          style={inputStyle}
          placeholder="e.g. Mysore, KA"
          value={form.destination}
          onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
          onFocus={(e)  => (e.currentTarget.style.borderColor = "var(--green)")}
          onBlur={(e)   => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Battery slider */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text3)" }}>Battery</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: getBatteryColor(form.batteryPercent) }}>{form.batteryPercent}%</span>
        </div>
        <input
          type="range" min={5} max={100} value={form.batteryPercent}
          onChange={(e) => setForm((f) => ({ ...f, batteryPercent: parseInt(e.target.value) }))}
          style={{
            background: `linear-gradient(to right, ${getBatteryColor(form.batteryPercent)} ${form.batteryPercent}%, var(--border) ${form.batteryPercent}%)`,
          }}
        />
      </div>

      {/* Vehicle presets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text3)" }}>Vehicle</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
          {EV_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => { setPreset(p.label); setForm((f) => ({ ...f, vehicleRangeKm: p.range })); }}
              style={{
                padding: "6px 4px", borderRadius: 6, textAlign: "center",
                border: `1px solid ${preset === p.label ? "var(--green)" : "var(--border)"}`,
                background: preset === p.label ? "var(--green-dim)" : "var(--surface2)",
                color: preset === p.label ? "var(--green)" : "var(--text2)",
                cursor: "pointer", fontFamily: "var(--font-sans)",
                fontWeight: preset === p.label ? 700 : 400,
                transition: "all .15s",
              }}
            >
              <div style={{ fontSize: 11, lineHeight: 1.3 }}>{p.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: .5, marginTop: 1 }}>{p.range}km</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom range */}
      {preset === "Custom" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text3)" }}>Range (km)</label>
          <input
            type="number" min={50} max={1000}
            value={form.vehicleRangeKm}
            onChange={(e) => {
              const parsed = parseInt(e.target.value, 10);
              setForm((f) => ({ ...f, vehicleRangeKm: Number.isNaN(parsed) ? 0 : parsed }));
            }}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>
      )}

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={loading || !form.origin || !form.destination}
        style={{
          width: "100%", padding: "10px 0",
          background: loading || !form.origin || !form.destination ? "var(--border)" : "var(--green)",
          color: loading || !form.origin || !form.destination ? "var(--text3)" : "#fff",
          border: "none", borderRadius: 8, fontSize: 13,
          fontFamily: "var(--font-sans)", fontWeight: 700,
          cursor: loading || !form.origin || !form.destination ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "all .15s",
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
function TabNavigate({ result, startBat, dark }: { result: RoutePlanResult; startBat: number; dark: boolean }) {
  const { origin, destination, route, weather, battery, chargingStations } = result;
  const [subTab, setSubTab] = useState<"map" | "details">("map");

  const weatherIcon =
    weather.conditions === "Ideal"              ? "☀️" :
    weather.conditions.includes("Rain")         ? "🌧️" :
    weather.conditions.includes("Cold")         ? "❄️" :
    weather.conditions.includes("Wind")         ? "💨" : "🌡️";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Sub-tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", background: "var(--surface)", flexShrink: 0 }}>
        {([["map", "🗺 Map"], ["details", "📋 Details"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setSubTab(id as any)}
            style={{
              padding: "9px 18px", fontSize: 11, fontFamily: "var(--font-mono)",
              textTransform: "uppercase", letterSpacing: ".06em",
              color: subTab === id ? "var(--green)" : "var(--text3)",
              border: "none", background: "none", cursor: "pointer",
              borderBottom: `2px solid ${subTab === id ? "var(--green)" : "transparent"}`,
              marginBottom: -1, transition: "all .15s",
            }}
          >{label}</button>
        ))}
      </div>

      {/* Map */}
      {subTab === "map" && (
        <div style={{ flex: 1, overflow: "hidden" }}>
          <RouteMap
            origin={origin}
            destination={destination}
            chargingStations={chargingStations}
            batteryPercent={startBat}
            remainingBattery={battery.remainingBattery}
            theme={dark ? "dark" : "light"}
          />
        </div>
      )}

      {/* Details */}
      {subTab === "details" && (
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Route options */}
          <div>
            <SectionTitle>Route Options</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[
                { label: "Eco ⭐",   dist: route.distanceKm,                     bat: battery.totalBatteryUsed,                      isMain: true  },
                { label: "Fastest",  dist: Math.round(route.distanceKm * 0.89), bat: Math.round(battery.totalBatteryUsed * 1.42), isMain: false },
                { label: "Shortest", dist: Math.round(route.distanceKm * 0.81), bat: Math.round(battery.totalBatteryUsed * 1.76), isMain: false },
              ].map((r) => (
                <div key={r.label} style={{
                  background: "var(--surface)", border: `1px solid ${r.isMain ? "var(--green)" : "var(--border)"}`,
                  borderRadius: 12, padding: 12,
                  borderTop: r.isMain ? `2px solid var(--green)` : undefined,
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: r.isMain ? "var(--green)" : "var(--text3)", marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{r.dist}<span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 2 }}>km</span></div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", marginTop: 2 }}>−{r.bat}% bat</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <StatCard label="Predicted range" value={`${battery.effectiveRange} km`} sub="After weather & style" />
            <StatCard label="ETA" value={`${Math.floor(route.durationMin / 60)}h ${route.durationMin % 60}m`} sub={chargingStations.length > 0 ? "Incl. charge stop" : "No charge stop"} />
          </div>

          {/* Weather */}
          <div>
            <SectionTitle>Weather Impact</SectionTitle>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{weatherIcon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{weather.conditions}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
                    {Math.round((1 - weather.weatherFactor) * 100)}% range reduction
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--green)" }}>{Math.round(weather.weatherFactor * 100)}%</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)" }}>efficiency</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                {[
                  { val: `${weather.temperature}°C`, key: "Temp" },
                  { val: `${weather.wind_speed}km/h`, key: "Wind" },
                  { val: weather.precipitation > 0 ? `${weather.precipitation}mm` : "Dry", key: "Rain" },
                ].map((w) => (
                  <div key={w.key} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{w.val}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".05em", marginTop: 2 }}>{w.key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Power mode */}
          <div>
            <SectionTitle>Power Mode</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
              {[
                { icon: "🌿", label: "Eco",   active: true  },
                { icon: "🏎",  label: "Sport", active: false },
                { icon: "🌙",  label: "Night", active: false },
                { icon: "💾",  label: "Save",  active: false },
              ].map((m) => (
                <div key={m.label} style={{
                  padding: "10px 4px", borderRadius: 8, textAlign: "center", cursor: "pointer",
                  background: m.active ? "var(--green-dim)" : "var(--surface2)",
                  border: `1px solid ${m.active ? "var(--green-border)" : "var(--border)"}`,
                }}>
                  <div style={{ fontSize: 18 }}>{m.icon}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: ".05em", marginTop: 4, color: m.active ? "var(--green)" : "var(--text3)", fontWeight: m.active ? 700 : 400 }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", lineHeight: 1.5 }}>
              Eco mode active — range extended ~18km. Regenerative braking on.
            </div>
          </div>

          <button style={{
            width: "100%", padding: 11, background: "var(--green)", color: "#fff",
            border: "none", borderRadius: 8, fontSize: 13,
            fontFamily: "var(--font-sans)", fontWeight: 700, cursor: "pointer",
          }}>
            Start Navigation →
          </button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: ANALYTICS
════════════════════════════════════════════════════ */
function TabAnalytics({ result }: { result: RoutePlanResult }) {
  const { battery, route } = result;
  const mfrRange = Math.round(battery.effectiveRange * 1.27);

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Range reality check */}
      <div>
        <SectionTitle>Range Reality Check</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text3)", textDecoration: "line-through" }}>{mfrRange}km</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)", textTransform: "uppercase", marginTop: 2 }}>Manufacturer</div>
            </div>
            <div style={{ fontSize: 16, color: "var(--text3)" }}>→</div>
            <div style={{ flex: 1, textAlign: "center", background: "var(--green-dim)", border: "1px solid var(--green-border)", borderRadius: 8, padding: 10 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--green)" }}>{battery.effectiveRange}km</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--green)", opacity: .7, textTransform: "uppercase", marginTop: 2 }}>Real predicted</div>
            </div>
          </div>
          <div style={{ background: "rgba(220,38,38,.06)", border: "1px solid rgba(220,38,38,.15)", borderRadius: 6, padding: "6px 10px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626" }}>
            −{mfrRange - battery.effectiveRange}km gap due to weather, style &amp; battery age
          </div>
        </div>
      </div>

      {/* Driving style */}
      <div>
        <SectionTitle>Driving Style Analysis</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Acceleration aggressiveness", pct: 72, val: "−18%", color: "#dc2626" },
            { label: "Hard braking frequency",       pct: 48, val: "−7%",  color: "#d97706" },
            { label: "Speed consistency",            pct: 85, val: "+4%",  color: "#16a34a" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text2)", minWidth: 170, flexShrink: 0 }}>{row.label}</div>
              <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: row.color, minWidth: 32, textAlign: "right" }}>{row.val}</div>
            </div>
          ))}
          <div style={{ marginTop: 4, background: "rgba(217,119,6,.07)", border: "1px solid rgba(217,119,6,.2)", borderRadius: 6, padding: "7px 10px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#92400e", lineHeight: 1.5 }}>
            Your style reduces range by 18%. Smooth acceleration saves ~26km.
          </div>
        </div>
      </div>

      {/* Energy breakdown */}
      <div>
        <SectionTitle>Energy Breakdown</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Distance load",  pct: 48, color: "#2563eb" },
            { label: "Weather drag",   pct: 28, color: "#d97706" },
            { label: "Traffic stops",  pct: 15, color: "#dc2626" },
            { label: "Driving style",  pct: 18, color: "#7c3aed" },
            { label: "Other",          pct: 7,  color: "var(--text3)" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text2)", minWidth: 120 }}>{row.label}</div>
              <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", minWidth: 28, textAlign: "right" }}>{row.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Consumption grid */}
      <div>
        <SectionTitle>Consumption Details</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[
            { val: `${battery.totalBatteryUsed}%`,              key: "Used",       color: "#dc2626" },
            { val: `${Math.max(0, battery.remainingBattery)}%`, key: "Remaining",  color: "#16a34a" },
            { val: `${battery.effectiveRange}km`,               key: "Eff. Range", color: "#2563eb" },
            { val: `${battery.safetyBuffer}%`,                  key: "Buffer",     color: "#7c3aed" },
            { val: `${route.distanceKm}km`,                     key: "Distance",   color: "#d97706" },
            { val: `${route.durationMin}m`,                     key: "ETA",        color: "#16a34a" },
          ].map((s) => (
            <div key={s.key} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".05em", marginTop: 3 }}>{s.key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: BATTERY
════════════════════════════════════════════════════ */
function TabBattery({ result, startBat }: { result: RoutePlanResult; startBat: number }) {
  const { battery } = result;
  const remaining = Math.max(0, battery.remainingBattery);
  const isOk      = battery.willReachDestination;

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Gauge */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
        <SectionTitle>Battery Prediction</SectionTitle>
        <BatteryGauge
          before={startBat}
          after={battery.remainingBattery}
          used={battery.totalBatteryUsed}
          willReach={battery.willReachDestination}
          safetyBuffer={battery.safetyBuffer}
        />
      </div>

      {/* Verdict */}
      <div style={{
        borderRadius: 10, padding: 14,
        display: "flex", alignItems: "flex-start", gap: 10,
        background: isOk ? "rgba(16,185,129,.07)" : "rgba(220,38,38,.07)",
        border: `1px solid ${isOk ? "rgba(16,185,129,.2)" : "rgba(220,38,38,.2)"}`,
      }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>{isOk ? "✅" : "⚠️"}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: isOk ? "#16a34a" : "#dc2626" }}>
            {isOk ? `Arriving with ${remaining.toFixed(0)}% battery` : `${Math.abs(battery.remainingBattery).toFixed(0)}% short — charge stop needed`}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 4, lineHeight: 1.4 }}>
            {isOk ? `Safety buffer: ${battery.safetyBuffer}%` : "Charge before departing or stop en route"}
          </div>
        </div>
      </div>

      {/* Impact factors */}
      <div>
        <SectionTitle>Impact Factors</SectionTitle>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {[
            { icon: "🌤", label: "Weather",   val: battery.breakdowns.weatherImpact,   color: "#dc2626" },
            { icon: "🏎", label: "Speed",     val: battery.breakdowns.speedImpact,     color: "#d97706" },
            { icon: "⛰", label: "Elevation", val: battery.breakdowns.elevationImpact, color: "var(--text3)" },
          ].map((row, i) => (
            <div key={row.label} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
              borderBottom: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <span style={{ fontSize: 16 }}>{row.icon}</span>
              <span style={{ fontSize: 13, color: "var(--text2)", flex: 1 }}>{row.label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: row.color }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Warning note */}
      <div style={{ background: "rgba(217,119,6,.07)", border: "1px solid rgba(217,119,6,.2)", borderRadius: 8, padding: "10px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#92400e", lineHeight: 1.6 }}>
        💡 Avoid draining below 15% — real usable range ends ~5km past the 15% mark.
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: CHARGERS
════════════════════════════════════════════════════ */
function TabChargers({ result }: { result: RoutePlanResult }) {
  const { chargingStations, battery } = result;

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SectionTitle>{battery.willReachDestination ? "Nearby Chargers" : "Required Stops"}</SectionTitle>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, background: "var(--green-dim)", color: "var(--green)", border: "1px solid var(--green-border)", padding: "2px 8px", borderRadius: 20, marginTop: -8 }}>
          {chargingStations.length} found
        </div>
      </div>

      {chargingStations.length === 0 ? (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 32, textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
          No charging stations found along this route.
        </div>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          {chargingStations.map((s: any, i: number) => (
            <div key={s.id} style={{
              display: "flex", gap: 10, padding: 14,
              borderBottom: i < chargingStations.length - 1 ? "1px solid var(--border)" : "none",
              alignItems: "flex-start",
            }}>
              {/* Badge */}
              <div style={{
                padding: "3px 6px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)",
                fontWeight: 600, flexShrink: 0, marginTop: 1,
                background: s.isCritical ? "rgba(220,38,38,.1)" : s.isNeeded ? "rgba(217,119,6,.1)" : s.fastCharge ? "rgba(217,119,6,.08)" : "var(--surface2)",
                color: s.isCritical ? "#dc2626" : s.isNeeded ? "#d97706" : s.fastCharge ? "#d97706" : "var(--text3)",
                border: `1px solid ${s.isCritical ? "rgba(220,38,38,.25)" : s.isNeeded ? "rgba(217,119,6,.25)" : "var(--border)"}`,
              }}>
                {s.isCritical ? "🛑 STOP" : s.isNeeded ? "⚡ GO" : s.fastCharge ? "⚡ DC" : "AC"}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                {s.address && (
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 6 }}>{s.address}</div>
                )}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "var(--surface2)", color: "var(--text3)", border: "1px solid var(--border)" }}>🔌 {s.connectors} port{s.connectors !== 1 ? "s" : ""}</span>
                  {s.powerKw && <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "var(--green-dim)", color: "var(--green)", border: "1px solid var(--green-border)" }}>{s.powerKw}kW</span>}
                  {s.network && <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "rgba(124,58,237,.08)", color: "#7c3aed", border: "1px solid rgba(124,58,237,.2)" }}>{s.network}</span>}
                  {s.batteryAtPoint !== undefined && (
                    <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, fontFamily: "var(--font-mono)", background: "rgba(37,99,235,.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,.2)" }}>🔋 {s.batteryAtPoint.toFixed(0)}% on arrival</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alerts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 8, padding: "9px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#065f46", lineHeight: 1.5 }}>
          Auto-stop planned at first charger along eco route.
        </div>
        {!battery.willReachDestination && (
          <div style={{ background: "rgba(220,38,38,.07)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 8, padding: "9px 12px", fontFamily: "var(--font-mono)", fontSize: 11, color: "#dc2626", lineHeight: 1.5 }}>
            ⚠️ Battery insufficient — a charging stop is required to complete this journey.
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   TAB: AI ANALYSIS
════════════════════════════════════════════════════ */
function TabAI({ result }: { result: RoutePlanResult }) {
  const { aiInsights } = result;

  if (!aiInsights) return (
    <div style={{ padding: 48, textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
      AI analysis not available for this trip.
    </div>
  );

  const verdictCfg: Record<string, { icon: string; label: string; color: string; bg: string; border: string }> = {
    go:             { icon: "✅", label: "Good to Go",            color: "#16a34a", bg: "rgba(16,185,129,.07)", border: "rgba(16,185,129,.2)" },
    charge_first:   { icon: "🔋", label: "Charge Before Leaving", color: "#d97706", bg: "rgba(217,119,6,.07)", border: "rgba(217,119,6,.2)"  },
    charge_enroute: { icon: "⚡", label: "Charge En Route",       color: "#dc2626", bg: "rgba(220,38,38,.07)", border: "rgba(220,38,38,.2)"  },
  };
  const v = verdictCfg[aiInsights.verdict] ?? verdictCfg.go;

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Verdict */}
      <div style={{ background: v.bg, border: `1px solid ${v.border}`, borderRadius: 12, padding: 14, display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>{v.icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: v.color }}>{v.label}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 4, lineHeight: 1.5 }}>{aiInsights.summary}</div>
        </div>
      </div>

      {/* Optimal speed */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12, flexShrink: 0,
          background: "var(--green-dim)", border: "1px solid var(--green-border)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--green)", lineHeight: 1, letterSpacing: -1 }}>{aiInsights.optimalSpeed}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--green)", opacity: .6, textTransform: "uppercase", letterSpacing: ".05em" }}>km/h</div>
        </div>
        <div>
          <SectionTitle>Optimal Speed</SectionTitle>
          <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>Drive at {aiInsights.optimalSpeed} km/h for maximum range efficiency on this route</div>
        </div>
      </div>

      {/* Charging advice */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
        <SectionTitle>⚡ Charging Strategy</SectionTitle>
        <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{aiInsights.chargingAdvice}</div>
      </div>

      {/* AI badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 10px", borderRadius: 20,
          fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em",
          background: "rgba(124,58,237,.08)", color: "#7c3aed", border: "1px solid rgba(124,58,237,.2)",
        }}>🤖 Claude · AI Analysis</div>
      </div>

      {/* Tips */}
      <div>
        <SectionTitle>Smart Tips</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {aiInsights.tips.map((tip: string, i: number) => (
            <div key={i} style={{
              display: "flex", gap: 10, padding: "10px 12px",
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
              alignItems: "flex-start",
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                background: "var(--green-dim)", border: "1px solid var(--green-border)",
                color: "var(--green)", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.55 }}>{tip}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trip score */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
        <SectionTitle>Trip Score</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, color: "var(--green)", lineHeight: 1 }}>B+</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 4 }}>78 / 100</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Speed control", pct: 82, color: "#16a34a" },
              { label: "Braking",       pct: 65, color: "#d97706" },
              { label: "Regen use",     pct: 78, color: "#2563eb" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", minWidth: 90 }}>{row.label}</div>
                <div style={{ flex: 1, height: 4, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: 2 }} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", minWidth: 22, textAlign: "right" }}>{row.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}