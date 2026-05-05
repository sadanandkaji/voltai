// app/page.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { RouteFormData, RoutePlanResult } from "./lib/types";
import { useVoiceAgent } from "./hooks/useVoiceAgent";

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
function isInvalidLocation(value: string) {
  return /^\d+$/.test(value.trim()); // true if input is only numbers
}
/** Convert spoken number words to digits, e.g. "seventy four" → 74 */
function spokenNumberToInt(text: string): number | null {
  const words: Record<string, number> = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
    eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
    fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
    nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90,
    hundred: 100, thousand: 1000,
  };
  // First try to parse pure digits (possibly with %, "percent", "km" etc. stripped)
  const digitsOnly = text.replace(/[^0-9]/g, "");
  if (digitsOnly.length > 0) return parseInt(digitsOnly, 10);

  // Try to parse spoken words
  const tokens = text.toLowerCase().replace(/[^a-z ]/g, "").split(/\s+/);
  let total = 0, current = 0;
  for (const token of tokens) {
    if (token === "hundred") {
      current = current === 0 ? 100 : current * 100;
    } else if (token === "thousand") {
      total += current === 0 ? 1000 : current * 1000;
      current = 0;
    } else if (words[token] !== undefined) {
      current += words[token];
    }
  }
  total += current;
  return total > 0 ? total : null;
}

type VoiceField = "origin" | "destination" | "battery" | "range";

type Msg =
  | { kind: "user";   text: string }
  | { kind: "ai";     html: string }
  | { kind: "typing" }
  | { kind: "form" }
  | { kind: "voice-prompt"; field: VoiceField };

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
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
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
  const [preset, setPreset] = useState("Custom");
  const [loading, setLoading] = useState(false);

  const [result, setResult]                     = useState<RoutePlanResult | null>(null);
  const [panelOpen, setPanelOpen]               = useState(false);
  const [activeTab, setActiveTab]               = useState("navigate");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Voice agent
  const voice = useVoiceAgent();
  const [voiceField, setVoiceField] = useState<VoiceField | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // ── CRITICAL: formRef stays in sync with form state ──────────────────────
  // We use a separate "pendingForm" ref that is updated IMMEDIATELY (synchronously)
  // when a voice answer comes in, so handleCalculateFromRef always sees the latest values.
  const pendingFormRef = useRef<RouteFormData>({
    origin: "", destination: "", batteryPercent: 74, vehicleRangeKm: 400,
  });

  // Keep pendingFormRef in sync with React state (for manual edits)
  useEffect(() => {
    pendingFormRef.current = form;
  }, [form]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // ── Voice flow ────────────────────────────────────────────────────────────
  /**
   * KEY FIX: We update pendingFormRef.current SYNCHRONOUSLY before the setState call,
   * so when handleCalculateFromRef fires (even immediately after), it reads the
   * correct values — not stale ones from the previous render.
   */
  const handleVoiceAnswer = useCallback(
    (field: VoiceField) => (transcript: string) => {
      let parsedValue: string | number = transcript.trim();

      if (field === "battery" || field === "range") {
        const num = spokenNumberToInt(transcript);
        parsedValue = num !== null ? num : (field === "battery" ? 74 : 400);
      }

      // Clamp battery to valid range
      if (field === "battery") {
        parsedValue = Math.min(100, Math.max(5, parsedValue as number));
      }
      // Clamp vehicle range to reasonable values
      if (field === "range") {
        parsedValue = Math.min(1500, Math.max(50, parsedValue as number));
      }

      // ── SYNCHRONOUS ref update (fixes stale closure bug) ──────────────
      pendingFormRef.current = {
        ...pendingFormRef.current,
        [field]: parsedValue,
      };

      // Also update React state for UI rendering
      setForm((f) => ({ ...f, [field]: parsedValue }));

      // Remove voice-prompt bubble, add user bubble
      setMsgs((prev) =>
        prev
          .filter((m) => m.kind !== "voice-prompt")
          .concat([{ kind: "user", text: String(parsedValue) }])
      );

      if (field === "origin") {
        setVoiceField("destination");
        setMsgs((prev) => [...prev, { kind: "voice-prompt", field: "destination" }]);
        voice.speak("Got it! And where are you heading to?", handleVoiceAnswer("destination"));

      } else if (field === "destination") {
        setVoiceField("battery");
        setMsgs((prev) => [...prev, { kind: "voice-prompt", field: "battery" }]);
        voice.speak(
          "Great! What is your current battery level in percent? For example say 74 for 74 percent.",
          handleVoiceAnswer("battery")
        );

      } else if (field === "battery") {
        setVoiceField("range");
        setMsgs((prev) => [...prev, { kind: "voice-prompt", field: "range" }]);
        voice.speak(
          "And what is your vehicle's maximum range in kilometres? For example say 400.",
          handleVoiceAnswer("range")
        );

      } else {
        // All 4 fields collected — range is the last one
        setVoiceField(null);
        setMsgs((prev) => prev.filter((m) => m.kind !== "voice-prompt"));
        voice.speak("Perfect! I have everything I need. Let me calculate your route now.");

        // Use pendingFormRef which is already updated synchronously above
        // Small delay lets the TTS start, but ref is already correct
        setTimeout(() => runCalculate(pendingFormRef.current), 2000);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [voice]
  );

  function startVoiceInput() {
    setVoiceEnabled(true);
    setVoiceField("origin");

    // Reset pending form for a fresh voice session
    pendingFormRef.current = { origin: "", destination: "", batteryPercent: 74, vehicleRangeKm: 400 };

    setMsgs((prev) =>
      prev
        .filter((m) => m.kind !== "form")
        .concat([{ kind: "voice-prompt", field: "origin" }])
    );

    voice.speak("Hi! Where are you starting from?", handleVoiceAnswer("origin"));
  }

  // ── Calculate — accepts an explicit formData to avoid stale state ─────────
  const runCalculate = useCallback(async (formData: RouteFormData) => {
if (!formData.origin || !formData.destination) return;

if (
  isInvalidLocation(formData.origin) ||
  isInvalidLocation(formData.destination)
) {
  setMsgs((prev) =>
    prev.concat([
      {
        kind: "ai",
        html: "⚠️ Invalid location. Numbers only are not allowed in route fields.",
      },
    ])
  );
  return;
}    setLoading(true);

    setMsgs((prev) =>
      prev.filter((m) => m.kind !== "form" && m.kind !== "voice-prompt").concat([
        {
          kind: "user",
          text: `${formData.origin} → ${formData.destination}\n${preset} · ${formData.batteryPercent}% battery · ${formData.vehicleRangeKm}km range`,
        },
        { kind: "typing" },
      ])
    );

    try {
      const res = await fetch("/api/route-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Failed"); }
      const data: RoutePlanResult = await res.json();
      setResult(data);

      const willReach = data.battery.willReachDestination;
      const responseHtml = `Route calculated! <br><br>
📍 <strong>${formData.origin}</strong> → <strong>${formData.destination}</strong><br>
🔋 ${formData.batteryPercent}% battery · ${formData.vehicleRangeKm}km range<br>
🌿 ${data.route.distanceKm} km · ${data.route.durationMin} min<br>
${willReach
  ? `✅ Arriving with <strong>${Math.max(0, data.battery.remainingBattery).toFixed(0)}%</strong> battery`
  : `⚠️ <strong>Charge stop needed</strong> — ${Math.abs(data.battery.remainingBattery).toFixed(0)}% short`
}<br><br>
<span style="opacity:.5;font-size:11px">Use the panels → for full details</span>`;

      setMsgs((prev) =>
        prev.filter((m) => m.kind !== "typing").concat([{ kind: "ai", html: responseHtml }])
      );

      if (voiceEnabled) {
        const voiceText = willReach
          ? `Your route is ready! You'll travel ${data.route.distanceKm} kilometres and arrive with ${Math.max(0, data.battery.remainingBattery).toFixed(0)}% battery remaining. The trip will take about ${Math.floor(data.route.durationMin / 60)} hours and ${data.route.durationMin % 60} minutes.`
          : `I've calculated your route. However, you'll need a charging stop as you'll be ${Math.abs(data.battery.remainingBattery).toFixed(0)} percent short. I've marked ${data.chargingStations.filter((s: any) => s.isNeeded).length} recommended charging stations on the map.`;
        voice.speak(voiceText);
      }

      setPanelOpen(true);
    } catch (e: any) {
      setMsgs((prev) =>
        prev.filter((m) => m.kind !== "typing").concat([
          { kind: "ai", html: `⚠️ ${e.message || "Something went wrong."}` },
        ])
      );
      if (voiceEnabled) voice.speak(`Sorry, I encountered an error: ${e.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }, [preset, voiceEnabled, voice]);

  // Manual submit — reads from current React state (which is correct for manual input)
 async function handleCalculate() {
  if (isInvalidLocation(form.origin) || isInvalidLocation(form.destination)) {
    setMsgs((prev) => [
      ...prev,
      {
        kind: "ai",
        html: "⚠️ Location cannot contain only numbers. Please enter a valid place name like <strong>Bengaluru</strong> or <strong>Mysore</strong>.",
      },
    ]);
    return;
  }

  pendingFormRef.current = form;
  return runCalculate(form);
}

  // ── Chat ───────────────────────────────────────────────────────────────────
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

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className="relative flex h-screen overflow-hidden transition-colors duration-500"
      style={{ background: "var(--bg)" }}
    >
      {/* CHAT SIDEBAR */}
      <div
        className="flex flex-col h-full flex-shrink-0 border-r border-[var(--border)] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
        style={{
          width: !panelOpen
            ? "100%"
            : sidebarCollapsed
              ? "0px"
              : "360px",
          maxWidth: !panelOpen ? "640px" : undefined,
          margin: !panelOpen ? "0 auto" : undefined,
          borderRightColor: !panelOpen || sidebarCollapsed ? "transparent" : undefined,
          overflow: sidebarCollapsed ? "hidden" : undefined,
        }}
      >
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
                onClick={() => setSidebarCollapsed((v) => !v)}
                className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface2)] text-[var(--text3)] text-xs hover:text-[var(--text)] hover:border-[var(--border2)] transition-all flex items-center justify-center"
              >
                {sidebarCollapsed ? "→" : "←"}
              </button>
            )}
            <button
              onClick={() => setDark((d) => !d)}
              className="w-7 h-7 rounded-md border border-[var(--border)] bg-[var(--surface2)] text-xs hover:border-[var(--border2)] transition-all flex items-center justify-center"
            >
              {dark ? "☀️" : "🌙"}
            </button>
            
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
          style={{ justifyContent: !panelOpen ? "center" : "flex-start" }}
        >
          {msgs.map((m, i) => {
            if (m.kind === "typing") return (
              <div key={i} className="flex items-end gap-2" style={{ animation: "fadeUp .2s ease" }}>
                <Avatar />
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px_16px_16px_16px] px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 150, 300].map((d) => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-[var(--text3)]"
                        style={{ animation: `bounce 0.9s ${d}ms infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            );

            if (m.kind === "voice-prompt") return (
              <div key={i} className="flex items-end gap-2" style={{ animation: "fadeUp .2s ease" }}>
                <Avatar />
                <VoicePrompt
                  field={m.field}
                  isListening={voice.isListening}
                  isSpeaking={voice.isSpeaking}
                  error={voice.error}
                  retryCount={voice.retryCount}
                  onManualMic={() => voice.startListening(handleVoiceAnswer(m.field))}
                  onManualType={(value) => handleVoiceAnswer(m.field)(value)}
                />
              </div>
            );

            if (m.kind === "form") return (
              <div key={i} className="flex items-end gap-2" style={{ animation: "fadeUp .2s ease" }}>
                <Avatar />
                <RouteFormInline
                  form={form} setForm={setForm}
                  preset={preset} setPreset={setPreset}
                  loading={loading}
                  onSubmit={handleCalculate}
                  onVoiceStart={startVoiceInput}
                />
              </div>
            );

            if (m.kind === "user") return (
              <div key={i} className="flex justify-end" style={{ animation: "fadeUp .2s ease" }}>
                <div className="bg-[var(--green)] text-white rounded-[16px_16px_4px_16px] px-4 py-2.5 text-sm leading-relaxed max-w-[80%] whitespace-pre-line" style={{ fontFamily: "var(--font-sans)" }}>
                  {m.text}
                </div>
              </div>
            );

            if (m.kind === "ai") return (
              <div key={i} className="flex items-end gap-2" style={{ animation: "fadeUp .2s ease" }}>
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

        {/* Chat input */}
        <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)] flex gap-2 items-center flex-shrink-0">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendChat()}
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

      {/* RIGHT PANEL */}
      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
        style={{
          opacity: panelOpen ? 1 : 0,
          transform: panelOpen ? "translateX(0)" : "translateX(40px)",
          pointerEvents: panelOpen ? "auto" : "none",
          width: panelOpen ? undefined : 0,
        }}
      >
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-6 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-r-lg text-[var(--text3)] hover:text-[var(--text)] flex items-center justify-center text-xs transition-all shadow-sm"
          >→</button>
        )}

        <div className="flex items-center border-b border-[var(--border)] bg-[var(--surface)] px-2 flex-shrink-0 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                color: activeTab === t.id ? "var(--green)" : "var(--text3)",
                borderBottomColor: activeTab === t.id ? "var(--green)" : "transparent",
                background: "none",
                cursor: "pointer",
              }}
            >
              <span className="text-sm">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden relative">
          {result && (
            <>
              <div
                className="absolute inset-0 transition-opacity duration-200"
                style={{
                  opacity: activeTab === "navigate" ? 1 : 0,
                  pointerEvents: activeTab === "navigate" ? "auto" : "none",
                  zIndex: activeTab === "navigate" ? 1 : 0,
                }}
              >
                <TabNavigate result={result} startBat={startBat} dark={dark} />
              </div>

              <div
                className="absolute inset-0 overflow-y-auto transition-opacity duration-200"
                style={{
                  opacity: activeTab !== "navigate" ? 1 : 0,
                  pointerEvents: activeTab !== "navigate" ? "auto" : "none",
                  zIndex: activeTab !== "navigate" ? 1 : 0,
                }}
              >
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

/* ══════════════════════════════════════════════════════════════════════════════
   SHARED SMALL COMPONENTS
══════════════════════════════════════════════════════════════════════════════ */

function Avatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-[var(--green-dim)] border border-[var(--green-border)] flex items-center justify-center text-xs flex-shrink-0 mb-0.5">⚡</div>
  );
}

const VOICE_LABELS: Record<VoiceField, string> = {
  origin:      "Where are you starting from?",
  destination: "Where are you heading to?",
  battery:     "What is your current battery level? (say a number, e.g. '74')",
  range:       "What is your vehicle's max range in km? (e.g. say '400')",
};

const VOICE_PLACEHOLDERS: Record<VoiceField, string> = {
  origin:      "e.g. Bengaluru, KA",
  destination: "e.g. Mysore, KA",
  battery:     "e.g. 74",
  range:       "e.g. 400",
};

function VoicePrompt({
  field,
  isListening,
  isSpeaking,
  error,
  retryCount,
  onManualMic,
  onManualType,
}: {
  field: VoiceField;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
  retryCount: number;
  onManualMic: () => void;
  onManualType: (value: string) => void;
}) {
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [typedValue, setTypedValue] = useState("");

  const stepIndex = ["origin", "destination", "battery", "range"].indexOf(field) + 1;

  const statusColor = isListening
    ? "#dc2626"
    : isSpeaking
    ? "#d97706"
    : error
    ? "#7c3aed"
    : "var(--green)";

  const statusLabel = isSpeaking
    ? "🔊 Speaking…"
    : isListening
    ? "🎤 Listening…"
    : error
    ? "⚠️ Retrying…"
    : "⏳ Preparing…";

  function handleTypeSubmit() {
    const val = typedValue.trim();
    if (!val) return;
    setTypedValue("");
    setShowTypeInput(false);
    onManualType(val);
  }

  return (
    <div
      className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px_16px_16px_16px] p-4 flex flex-col gap-3 w-full max-w-[300px] shadow-sm"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Step indicator */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          Voice Input · Step {stepIndex}/4
        </p>
        {retryCount > 0 && (
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{ background: i < retryCount ? "#dc2626" : "var(--border)" }} />
            ))}
          </div>
        )}
      </div>

      {/* Question */}
      <p className="text-sm text-[var(--text)] leading-relaxed">{VOICE_LABELS[field]}</p>

      {/* Status bar */}
      <div
        className="w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-white text-[13px] font-medium transition-all duration-300"
        style={{ background: statusColor }}
      >
        {statusLabel}
        {isListening && (
          <div className="flex gap-0.5 items-end ml-1">
            {[0, 150, 300].map((d) => (
              <div key={d} className="w-1 rounded-full bg-white/70"
                style={{ height: "10px", animation: `bounce 0.7s ${d}ms infinite` }} />
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-[11px] text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2 leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={onManualMic}
          disabled={isListening || isSpeaking}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-medium transition-all"
          style={{
            borderColor: isListening ? "#dc2626" : "var(--green)",
            color: isListening ? "#dc2626" : "var(--green)",
            background: isListening ? "rgba(220,38,38,0.06)" : "var(--green-dim)",
            opacity: isSpeaking ? 0.4 : 1,
            cursor: isSpeaking ? "not-allowed" : "pointer",
          }}
        >
          🎤 {isListening ? "Listening…" : "Tap to Speak"}
        </button>

        <button
          onClick={() => setShowTypeInput((v) => !v)}
          disabled={isListening || isSpeaking}
          className="w-10 h-9 rounded-lg border border-[var(--border)] text-[var(--text3)] flex items-center justify-center text-base hover:border-[var(--border2)] hover:text-[var(--text)] transition-all"
          style={{ opacity: isSpeaking || isListening ? 0.4 : 1, cursor: isSpeaking || isListening ? "not-allowed" : "pointer" }}
          title="Type your answer instead"
        >
          ⌨️
        </button>
      </div>

      {/* Type fallback */}
      {showTypeInput && (
        <div className="flex gap-2">
          <input
            autoFocus
            value={typedValue}
            onChange={(e) => setTypedValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTypeSubmit()}
            placeholder={VOICE_PLACEHOLDERS[field]}
            className="flex-1 bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--green)] transition-colors placeholder:text-[var(--text3)]"
            style={{ fontFamily: "var(--font-sans)" }}
          />
          <button
            onClick={handleTypeSubmit}
            className="w-9 h-9 rounded-lg bg-[var(--green)] text-white flex items-center justify-center text-base hover:opacity-90 flex-shrink-0"
          >
            ↑
          </button>
        </div>
      )}
    </div>
  );
}

/* ── ROUTE FORM ── */
function RouteFormInline({
  form, setForm, preset, setPreset, loading, onSubmit, onVoiceStart,
}: {
  form: RouteFormData; setForm: React.Dispatch<React.SetStateAction<RouteFormData>>;
  preset: string; setPreset: (p: string) => void;
  loading: boolean; onSubmit: () => void;
  onVoiceStart: () => void;
}) {
  const inp = "w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--green)] transition-colors placeholder:text-[var(--text3)]";

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[4px_16px_16px_16px] p-4 flex flex-col gap-3 w-full max-w-[300px] shadow-sm">
      <p className="text-[10px] font-semibold text-[var(--text3)] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Plan Your Route</p>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />From
        </label>
        <input className={inp} placeholder="e.g. Bengaluru, KA" value={form.origin} onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />To
        </label>
        <input className={inp} placeholder="e.g. Mysore, KA" value={form.destination} onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))} />
      </div>

      <div>
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] text-[var(--text3)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Battery</span>
          <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: getBatteryColor(form.batteryPercent) }}>{form.batteryPercent}%</span>
        </div>
        <input type="range" min={5} max={100} value={form.batteryPercent}
          onChange={(e) => setForm((f) => ({ ...f, batteryPercent: parseInt(e.target.value) }))}
          style={{ background: `linear-gradient(to right, ${getBatteryColor(form.batteryPercent)} ${form.batteryPercent}%, var(--border) ${form.batteryPercent}%)` }}
        />
      </div>

      <div>
        <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>Vehicle</p>
        <div className="grid grid-cols-3 gap-1">
          {EV_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => { setPreset(p.label); setForm((f) => ({ ...f, vehicleRangeKm: p.range })); }}
              className="py-1.5 px-1 rounded-md text-[11px] text-center border transition-all cursor-pointer"
              style={{
                borderColor: preset === p.label ? "var(--green)" : "var(--border)",
                background: preset === p.label ? "var(--green-dim)" : "var(--surface2)",
                color: preset === p.label ? "var(--green)" : "var(--text2)",
                fontWeight: preset === p.label ? 600 : 400,
                fontFamily: "var(--font-sans)",
              }}
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
            onChange={(e) => setForm((f) => ({ ...f, vehicleRangeKm: parseInt(e.target.value) }))} />
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onSubmit}
          disabled={loading || !form.origin || !form.destination}
          className="flex-1 py-2.5 rounded-lg bg-[var(--green)] text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {loading ? (
            <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "spin .7s linear infinite" }} />Calculating…</>
          ) : "⚡ Calculate"}
        </button>

        <button
          onClick={onVoiceStart}
          disabled={loading}
          className="w-10 h-10 rounded-lg border border-[var(--green)] text-[var(--green)] flex items-center justify-center hover:bg-[var(--green-dim)] disabled:opacity-40 transition-all cursor-pointer"
          title="Use voice to fill all fields automatically"
        >
          🎤
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   TAB COMPONENTS (unchanged from original)
══════════════════════════════════════════════════════════════════════════════ */

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
      <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color: color || "var(--text)", fontFamily: "var(--font-sans)" }}>{value}</p>
      {sub && <p className="text-[11px] text-[var(--text3)] mt-1" style={{ fontFamily: "var(--font-mono)" }}>{sub}</p>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[11px] font-semibold text-[var(--text3)] uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-mono)" }}>{children}</h3>;
}

function TabNavigate({ result, startBat, dark }: { result: RoutePlanResult; startBat: number; dark: boolean }) {
  const { origin, destination, route, weather, battery, chargingStations } = result;
  const [subTab, setSubTab] = useState<"map" | "info">("map");

  const weatherIcon = weather.conditions === "Ideal" ? "☀️"
    : weather.conditions.includes("Rain") ? "🌧️"
    : weather.conditions.includes("Cold") ? "❄️"
    : weather.conditions.includes("Wind") ? "💨" : "🌡️";

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-0 flex-shrink-0 border-b border-[var(--border)]" style={{ background: "var(--surface)" }}>
        {(["map", "info"] as const).map((s) => (
          <button key={s} onClick={() => setSubTab(s)}
            className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-widest border-b-2 transition-all cursor-pointer"
            style={{
              fontFamily: "var(--font-mono)",
              color: subTab === s ? "var(--green)" : "var(--text3)",
              borderBottomColor: subTab === s ? "var(--green)" : "transparent",
              background: "none", marginBottom: "-1px",
            }}
          >
            {s === "map" ? "🗺 Map" : "📋 Details"}
          </button>
        ))}
      </div>

      {subTab === "map" && (
        <div className="flex-1 overflow-hidden">
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

      {subTab === "info" && (
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
          <div>
            <SectionTitle>Route Options</SectionTitle>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Eco ⭐", dist: route.distanceKm,                     bat: battery.totalBatteryUsed,                     accent: true  },
                { label: "Fastest",  dist: Math.round(route.distanceKm * 0.89), bat: Math.round(battery.totalBatteryUsed * 1.42), accent: false },
                { label: "Shortest", dist: Math.round(route.distanceKm * 0.81), bat: Math.round(battery.totalBatteryUsed * 1.76), accent: false },
              ].map((r) => {
                const batFeasible = r.bat <= 100;
                return (
                  <div key={r.label} className="bg-[var(--surface)] rounded-xl p-3 border" style={{ borderColor: r.accent ? "var(--green)" : "var(--border)" }}>
                    <p className="text-[10px] font-semibold mb-1" style={{ fontFamily: "var(--font-mono)", color: r.accent ? "var(--green)" : "var(--text3)" }}>{r.label}</p>
                    <p className="text-xl font-bold text-[var(--text)]">{r.dist}<span className="text-xs text-[var(--text3)] ml-0.5">km</span></p>
                    {batFeasible
                      ? <p className="text-[11px] text-red-500 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>−{r.bat}% bat</p>
                      : <p className="text-[11px] mt-0.5 flex items-center gap-1" style={{ fontFamily: "var(--font-mono)", color: "#dc2626" }}>
                          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-100 dark:bg-red-950/50 text-[9px] font-bold leading-none border border-red-300 dark:border-red-800">✕</span>
                          Not feasible
                        </p>
                    }
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Predicted Range" value={`${battery.effectiveRange} km`} sub="After weather & style adjustments" />
            <StatCard label="ETA" value={`${Math.floor(route.durationMin / 60)}h ${route.durationMin % 60}m`} sub={chargingStations.length > 0 ? "Includes charge stop" : "No charge stop needed"} />
          </div>

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
                ].map((w) => (
                  <div key={w.key} className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-[var(--text)]">{w.val}</p>
                    <p className="text-[9px] text-[var(--text3)] uppercase tracking-wider mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{w.key}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabAnalytics({ result }: { result: RoutePlanResult }) {
  const { battery } = result;
  const mfrRange = Math.round(battery.effectiveRange * 1.27);
  return (
    <div className="p-5 flex flex-col gap-5">
      <div>
        <SectionTitle>Range Reality Check</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex items-center gap-4">
          <div className="text-center flex-1 bg-[var(--green-dim)] border border-[var(--green-border)] rounded-lg p-3">
            <p className="text-2xl font-bold text-[var(--green)]">{battery.effectiveRange}km</p>
            <p className="text-[10px] text-[var(--green)] opacity-70 mt-1">Real predicted</p>
          </div>
        </div>
        <div className="mt-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2 text-[11px] text-red-600 dark:text-red-400" style={{ fontFamily: "var(--font-mono)" }}>
          −{mfrRange - battery.effectiveRange}km gap due to weather, style &amp; battery age
        </div>
      </div>
      <div>
        <SectionTitle>Energy Breakdown</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3">
          {[
            { label: "Distance load", pct: 48, color: "#2563eb" },
            { label: "Weather drag",  pct: 28, color: "#d97706" },
            { label: "Traffic stops", pct: 15, color: "#dc2626" },
            { label: "Driving style", pct: 18, color: "#7c3aed" },
          ].map((row) => (
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
      <div className="grid grid-cols-3 gap-2">
        {[
          { val: `${battery.totalBatteryUsed}%`,              key: "Used",      color: "#dc2626" },
          { val: `${Math.max(0, battery.remainingBattery)}%`, key: "Remaining", color: "#16a34a" },
          { val: `${battery.safetyBuffer}%`,                  key: "Buffer",    color: "#7c3aed" },
        ].map((s) => (
          <div key={s.key} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3 text-center">
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.val}</p>
            <p className="text-[9px] text-[var(--text3)] uppercase tracking-wider mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{s.key}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      <div>
        <SectionTitle>Impact Factors</SectionTitle>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]">
          {[
            { icon: "🌤", label: "Weather",   val: battery.breakdowns.weatherImpact },
            { icon: "🏎", label: "Speed",     val: battery.breakdowns.speedImpact },
            { icon: "⛰", label: "Elevation", val: battery.breakdowns.elevationImpact },
          ].map((row) => (
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
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 text-center text-[var(--text3)] text-sm">No charging stations found.</div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]">
            {chargingStations.map((s: any) => (
              <div key={s.id} className="p-4 flex gap-3">
                <div className="mt-0.5 px-2 py-1 rounded-md text-[10px] font-semibold flex-shrink-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: s.isCritical ? "rgba(220,38,38,0.1)" : s.isNeeded ? "rgba(245,158,11,0.1)" : "var(--surface2)",
                    color: s.isCritical ? "#dc2626" : s.isNeeded ? "#d97706" : "var(--text3)",
                    border: `1px solid ${s.isCritical ? "rgba(220,38,38,0.3)" : s.isNeeded ? "rgba(245,158,11,0.3)" : "var(--border)"}`,
                  }}
                >
                  {s.isCritical ? "🛑 STOP" : s.isNeeded ? "⚡ GO" : s.fastCharge ? "⚡ DC" : "AC"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)] truncate">{s.name}</p>
                  {s.address && <p className="text-[11px] text-[var(--text3)] mt-0.5 truncate" style={{ fontFamily: "var(--font-mono)" }}>{s.address}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)] text-[var(--text3)]" style={{ fontFamily: "var(--font-mono)" }}>🔌 {s.connectors} ports</span>
                    {s.powerKw && <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--green-dim)] border border-[var(--green-border)] text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>{s.powerKw}kW</span>}
                    {s.batteryAtPoint !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50" style={{ fontFamily: "var(--font-mono)" }}>🔋 {s.batteryAtPoint.toFixed(0)}% on arrival</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabAI({ result }: { result: RoutePlanResult }) {
  const { aiInsights } = result;
  if (!aiInsights) return (
    <div className="p-8 text-center text-[var(--text3)] text-sm">AI analysis not available.</div>
  );

  const verdictCfg = ({
    go:             { icon: "✅", label: "Good to Go",            color: "#16a34a", cls: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50" },
    charge_first:   { icon: "🔋", label: "Charge Before Leaving", color: "#d97706", cls: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50" },
    charge_enroute: { icon: "⚡", label: "Charge En Route",       color: "#dc2626", cls: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50" },
  } as Record<string, { icon: string; label: string; color: string; cls: string }>)[aiInsights.verdict]
    ?? { icon: "✅", label: "Good to Go", color: "#16a34a", cls: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50" };

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className={`rounded-xl p-4 flex items-start gap-3 border ${verdictCfg.cls}`}>
        <span className="text-xl">{verdictCfg.icon}</span>
        <div>
          <p className="font-semibold text-sm" style={{ color: verdictCfg.color }}>{verdictCfg.label}</p>
          <p className="text-[11px] text-[var(--text3)] mt-1 leading-relaxed" style={{ fontFamily: "var(--font-mono)" }}>{aiInsights.summary}</p>
        </div>
      </div>

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

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
        <p className="text-[10px] text-[var(--text3)] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>⚡ Charging Strategy</p>
        <p className="text-sm text-[var(--text2)] leading-relaxed">{aiInsights.chargingAdvice}</p>
      </div>

      <div>
        <SectionTitle>Smart Tips</SectionTitle>
        <div className="flex flex-col gap-2">
          {aiInsights.tips.map((tip: string, i: number) => (
            <div key={i} className="flex items-start gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3">
              <div className="w-5 h-5 rounded-md bg-[var(--green-dim)] border border-[var(--green-border)] text-[var(--green)] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{i + 1}</div>
              <p className="text-sm text-[var(--text2)] leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}