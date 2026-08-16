// app/plan/page.tsx
"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { RouteFormData, RoutePlanResult } from "../lib/types";
import { Msg, EV_PRESETS, TABS, isInvalidLocation } from "../lib/planHelpers";

import HistorySidebar from "../components/historysidebar";
import ProfileMenu from "../components/ProfileMenu";
import Avatar from "../components/plan/Avatar";
import RouteFormInline from "../components/plan/RouteFormInline";
import TabNavigate from "../components/plan/TabNavigate";
import TabAnalytics from "../components/plan/TabAnalytics";
import TabBattery from "../components/plan/TabBattery";
import TabChargers from "../components/plan/TabChargers";
import TabAI from "../components/plan/TabAI";

/** Trips saved before AI insights had a `tips` column fall back to these,
 *  matching the defaults `route-plan` generates for a fresh calculation. */
const FALLBACK_TIPS = (ok: boolean) =>
  ok
    ? ["Maintain 80-100 km/h", "Use regenerative braking", "Avoid sudden acceleration"]
    : ["Charge at recommended stop", "Drive slower for efficiency", "Avoid AC overuse"];

/** SavedRoute only persists `weatherFactor`, not the individual
 *  weather/speed/elevation impact strings the live /api/route-plan
 *  calculation returns — so those can't be read back verbatim for a
 *  history trip. Weather impact can be derived from weatherFactor; speed
 *  and elevation impact genuinely weren't recorded, so those are marked
 *  as unavailable rather than showing a fabricated number. */
function deriveBreakdowns(route: any) {
  const weatherImpact =
    route.weatherFactor != null
      ? `-${Math.round((1 - route.weatherFactor) * 100)}%`
      : "—";
  return {
    weatherImpact,
    speedImpact: "—",
    elevationImpact: "—",
  };
}

/** Converts a SavedRoute (+ ChargingStopSnapshot[] from GET /api/routes/[id])
 *  into the same RoutePlanResult shape /api/route-plan returns, so a saved
 *  trip can be rendered by the exact same tab components as a fresh one. */
function mapSavedRouteToResult(route: any): RoutePlanResult {
  return {
    origin: { lat: route.originLat, lon: route.originLon, display_name: route.originName },
    destination: { lat: route.destLat, lon: route.destLon, display_name: route.destName },
    route: {
      distanceKm: Math.round(route.distanceKm),
      durationMin: Math.round(route.durationMin),
      elevationGainM: Math.round(route.elevationGainM ?? 0),
    },
    weather: {
      temperature: route.weatherTemp ?? 0,
      wind_speed: route.weatherWind ?? 0,
      precipitation: route.weatherRain ?? 0,
      weatherFactor: route.weatherFactor ?? 1,
      conditions: route.weatherLabel ?? "Unknown",
    },
    battery: {
      totalBatteryUsed: route.totalBatteryUsed,
      remainingBattery: route.remainingBattery,
      effectiveRange: route.effectiveRange,
      willReachDestination: route.willReachDestination,
      safetyBuffer: route.safetyBuffer,
      breakdowns: deriveBreakdowns(route),
    },
    chargingStations: (route.chargingStations || []).map((s: any) => ({
      id: s.externalId,
      name: s.name,
      address: s.address,
      lat: s.lat,
      lon: s.lon,
      connectors: s.connectors,
      fastCharge: s.fastCharge,
      powerKw: s.powerKw,
      network: s.network,
      source: s.source,
      batteryAtPoint: s.batteryAtPoint,
      isNeeded: s.isNeeded,
      isCritical: s.isCritical,
      routeFraction: s.routeFraction,
    })),
    aiInsights: route.aiSummary
      ? {
          summary: route.aiSummary,
          verdict: route.aiVerdict ?? "go",
          tips: FALLBACK_TIPS(route.willReachDestination),
          optimalSpeed: route.aiOptimalSpeed ?? 90,
          chargingAdvice: route.aiChargingAdvice ?? "",
          riskLevel: route.aiRiskLevel ?? "medium",
        }
      : null,
    savedRouteId: route.id,
    creditsRemaining: 0,
  } as RoutePlanResult;
}

const INITIAL_MSGS: Msg[] = [
  {
    kind: "ai",
    html: "Hey! I'm <strong>VoltIQ</strong> ⚡<br/>Your intelligent EV range planner.<br/><br/>Fill in your route below and I'll predict battery usage, find chargers, and give you a complete trip analysis.",
  },
  { kind: "form" },
];

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

  return (
    <Suspense fallback={null}>
      <PlanPageContent />
    </Suspense>
  );
}

function PlanPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "";
  }, [dark]);

  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<RouteFormData>({
    origin: "", destination: "", batteryPercent: 74, vehicleRangeKm: 400,
  });
  const [preset, setPreset] = useState("Custom");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<RoutePlanResult | null>(null);
  const [activeTab, setActiveTab] = useState("navigate");

  // Tracks the credit balance shown in the header — set whenever a
  // route-plan response comes back with creditsRemaining.
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);

  // Bumped after a trip saves so <HistorySidebar> refetches and shows it.
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  // True while a click on a history row is loading that trip's details.
  const [loadingHistoryRoute, setLoadingHistoryRoute] = useState(false);
  // Mobile-only: whether the History drawer is open.
  const [historyMobileOpen, setHistoryMobileOpen] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Deep-link support: /plan?trip=<id> (used by the History page) opens
  // that saved trip directly, then strips the query param from the URL.
  useEffect(() => {
    const tripId = searchParams.get("trip");
    if (!tripId) return;
    loadHistoryRoute(tripId);
    router.replace("/plan");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
      if (data.savedRouteId) setHistoryRefreshKey((k) => k + 1);

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

  /* ── History sidebar: open a saved trip ───────────────────────────────
     Fetches the full SavedRoute (+ ChargingStopSnapshot[]), maps it into
     the same shape /api/route-plan returns, and shows it in the map/tabs
     pane — same rendering path as a freshly calculated trip. */
  async function loadHistoryRoute(id: string) {
    setLoadingHistoryRoute(true);
    try {
      const res = await fetch(`/api/routes/${id}`);
      if (!res.ok) throw new Error("Could not load that trip");
      const { route } = await res.json();
      setResult(mapSavedRouteToResult(route));
      setActiveTab("navigate");
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHistoryRoute(false);
    }
  }

  /* ── History sidebar: "+ New Plan" ────────────────────────────────────
     Clears the current trip and resets the chat back to a fresh form. */
  function startNewPlan() {
    setResult(null);
    setActiveTab("navigate");
    setForm({ origin: "", destination: "", batteryPercent: 74, vehicleRangeKm: 400 });
    setPreset("Custom");
    setMsgs(INITIAL_MSGS);
    setChatInput("");
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
      if (lower.includes("charg")) html = "Charger details are in the <strong>Chargers</strong> tab — with live status and distances.";
      else if (lower.includes("batter")) html = "Your battery prediction is in the <strong>Battery</strong> tab with all impact factors.";
      else if (lower.includes("speed")) html = "Optimal speed for maximum range is around <strong>72–90 km/h</strong>. See the AI tab for personalised tips.";
      else if (lower.includes("route") || lower.includes("map"))
        html = "Your route is shown on the <strong>Navigate</strong> tab — eco, fast, and shortest options with battery cost for each.";
      else if (lower.includes("weather")) html = "Weather conditions are shown in the <strong>Navigate → Details</strong> subtab with efficiency impact.";
      else if (lower.includes("credit"))
        html =
          creditsRemaining !== null
            ? `You have <strong>${creditsRemaining}</strong> credits remaining. Each route plan costs 5 credits — check your <strong>Profile</strong> for full activity.`
            : "Check your credit balance from the account menu in the top-right.";
      return [...filtered, { kind: "ai" as const, html }];
    });
  }

  const startBat = result
    ? Math.round(result.battery.totalBatteryUsed + Math.max(0, result.battery.remainingBattery))
    : form.batteryPercent;

  /* Small reusable hamburger button that opens the History drawer on mobile */
  const HistoryToggle = () => (
    <button
      onClick={() => setHistoryMobileOpen(true)}
      className="vq-mobile-menu-btn"
      title="Trip history"
      style={{
        width: 32, height: 32, borderRadius: 8,
        border: "1px solid var(--border)", background: "var(--surface2)",
        color: "var(--text2)", fontSize: 15, cursor: "pointer",
        alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}
    >
      ☰
    </button>
  );

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
      {/* ══════════ HISTORY SIDEBAR (always present; drawer on mobile) ══════════ */}
      <HistorySidebar
        activeId={result?.savedRouteId ?? null}
        onSelect={loadHistoryRoute}
        onNewPlan={startNewPlan}
        refreshKey={historyRefreshKey}
        mobileOpen={historyMobileOpen}
        onMobileClose={() => setHistoryMobileOpen(false)}
      />

      {/* ══════════ CHAT PANE — shown only until a trip is loaded ══════════ */}
      {!result && (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", flex: 1, position: "relative", minWidth: 0 }}>
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
            <HistoryToggle />

            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "var(--green)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "#fff", fontWeight: 800,
                  flexShrink: 0,
                }}
              >⚡</div>
              <span className="vq-chat-brand-text" style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15, color: "var(--green)", letterSpacing: "-.3px", whiteSpace: "nowrap" }}>
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
                href="/profile"
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "3px 9px", borderRadius: 20,
                  background: "var(--green-dim)", border: "1px solid var(--green-border)",
                  fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)",
                  textDecoration: "none", flexShrink: 0,
                }}
                title="View credit activity on your profile"
              >
                💳 {creditsRemaining}
              </Link>
            )}

            {/* Actions */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
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
              {/* Account menu — avatar, credits shortcut, profile link, sign out */}
              <ProfileMenu creditsRemaining={creditsRemaining} />
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
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
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

          {/* Loading overlay — shown while a history row is being opened */}
          {loadingHistoryRoute && (
            <div
              style={{
                position: "absolute", inset: 0, zIndex: 40,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
                background: "var(--bg)", opacity: 0.92,
              }}
            >
              <div style={{ width: 28, height: 28, border: "3px solid rgba(34,197,94,.15)", borderTopColor: "var(--green)", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)" }}>Loading trip…</span>
            </div>
          )}
        </div>
      )}

      {/* ══════════ MAP + TABS PANE — shown once a trip (fresh or from history) is loaded ══════════ */}
      {result && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Tab bar */}
          <div className="vq-tab-bar" style={{
            display: "flex", alignItems: "center", borderBottom: "1px solid var(--border)",
            background: "var(--surface)", padding: "0 4px", gap: 2,
            flexShrink: 0, overflowX: "auto",
          }}>
            <HistoryToggle />

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
                <span className="vq-tab-label">{t.label}</span>
              </button>
            ))}

            {/* Account menu also lives here so it's reachable once the chat pane is hidden */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, paddingRight: 6 }}>
              {creditsRemaining !== null && (
                <Link
                  href="/profile"
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "3px 9px", borderRadius: 20,
                    background: "var(--green-dim)", border: "1px solid var(--green-border)",
                    fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)",
                    textDecoration: "none", flexShrink: 0,
                  }}
                >
                  <span className="vq-header-credits-label">💳</span> {creditsRemaining}
                </Link>
              )}
              <ProfileMenu creditsRemaining={creditsRemaining} />
            </div>
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
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
              {activeTab === "battery" && <TabBattery result={result} startBat={startBat} />}
              {activeTab === "chargers" && <TabChargers result={result} />}
              {activeTab === "ai" && <TabAI result={result} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}