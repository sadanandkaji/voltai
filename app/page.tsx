// app/page.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const FEATURES = [
  {
    icon: "🔋",
    title: "Real-world battery prediction",
    desc: "Not just manufacturer specs — we factor in weather, elevation, speed, and load to tell you exactly how much range you actually have.",
  },
  {
    icon: "⚡",
    title: "Live charger discovery",
    desc: "OpenChargeMap plus live web search finds real charging stations — even in small towns that other apps miss entirely.",
  },
  {
    icon: "🤖",
    title: "AI trip analysis",
    desc: "Get a personalised charging strategy, optimal cruising speed, and a clear go/charge verdict for every route you plan.",
  },
  {
    icon: "🗺️",
    title: "Turn-by-turn navigation",
    desc: "Full route map with animated directions, charger pins along the way, and battery-at-arrival for every stop.",
  },
];

const STEPS = [
  { num: "01", title: "Enter your trip", desc: "Tell us where you're starting, where you're headed, and your current battery %." },
  { num: "02", title: "Pick your EV", desc: "Choose from common presets or enter your vehicle's exact range." },
  { num: "03", title: "Get the full picture", desc: "Battery prediction, weather impact, and every charger along the way — instantly." },
];

const STATS = [
  { value: "20+", label: "trip plans per free account" },
  { value: "100%", label: "real charger data, not guesses" },
  { value: "5", label: "credits per trip plan" },
];

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [starting, setStarting] = useState(false);

  async function handleGetStarted() {
    if (status === "authenticated") {
      router.push("/plan");
      return;
    }
    setStarting(true);
    try {
      await signIn("google", { callbackUrl: "/plan" });
    } catch {
      setStarting(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.gridBg} />

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>⚡</div>
          <span style={styles.logoText}>VoltIQ</span>
        </div>

        <div style={styles.navActions}>
          {status === "authenticated" ? (
            <>
              <Link href="/history" style={styles.navLink}>History</Link>
              <button onClick={() => router.push("/plan")} style={styles.navCta}>
                Open App →
              </button>
            </>
          ) : (
            <button onClick={handleGetStarted} disabled={starting} style={styles.navCta}>
              {starting ? "Signing in…" : "Sign In"}
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.liveDot} />
          Live charger data · AI-powered
        </div>

        <h1 style={styles.headline}>
          Know your real EV range<br />
          <span style={{ color: "#4ade80" }}>before you leave the driveway.</span>
        </h1>

        <p style={styles.subhead}>
          VoltIQ predicts real-world battery usage — accounting for weather, elevation, and
          driving style — and maps every charger along your route. No more range anxiety.
        </p>

        <div style={styles.heroActions}>
          <button onClick={handleGetStarted} disabled={starting} style={styles.primaryButton}>
            {starting ? "Signing in…" : status === "authenticated" ? "Open App →" : "Plan Your First Trip →"}
          </button>
          <a href="#how-it-works" style={styles.secondaryButton}>
            See how it works
          </a>
        </div>

        {status !== "authenticated" && (
          <div style={styles.heroNote}>
            Free to start — 100 credits, no card required
          </div>
        )}

        {/* Stats strip — className needed so the mobile media query below can target it */}
        <div className="voltiq-stats-row" style={styles.statsRow}>
          {STATS.map((s) => (
            <div key={s.label} style={styles.statItem}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.eyebrow}>Why VoltIQ</div>
          <h2 style={styles.sectionTitle}>Built for the way EVs actually behave</h2>
        </div>

        <div style={styles.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureIconWrap}>{f.icon}</div>
              <div style={styles.featureTitle}>{f.title}</div>
              <div style={styles.featureDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.eyebrow}>How it works</div>
          <h2 style={styles.sectionTitle}>Three steps to a stress-free trip</h2>
        </div>

        <div style={styles.stepsRow}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={styles.stepCard}>
              <div style={styles.stepNum}>{s.num}</div>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepDesc}>{s.desc}</div>
              {i < STEPS.length - 1 && <div style={styles.stepConnector} />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section style={styles.ctaBand}>
        <h2 style={styles.ctaTitle}>Ready to drive without the guesswork?</h2>
        <p style={styles.ctaSubtitle}>
          Join drivers who plan smarter EV trips with real battery predictions and live charger data.
        </p>
        <button onClick={handleGetStarted} disabled={starting} style={styles.primaryButton}>
          {starting ? "Signing in…" : status === "authenticated" ? "Open App →" : "Get Started Free →"}
        </button>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.logoRow}>
          <div style={styles.logoMarkSmall}>⚡</div>
          <span style={styles.footerLogoText}>VoltIQ</span>
        </div>
        <div style={styles.footerLinks}>
          <span style={styles.footerText}>© {new Date().getFullYear()} VoltIQ</span>
        </div>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 720px) {
          .voltiq-stats-row { flex-wrap: wrap; gap: 24px !important; }
        }
      `}</style>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#060c0a",
    position: "relative",
    color: "#f0faf2",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
  },

  // Nav
  nav: {
    position: "relative", zIndex: 2,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 32px", maxWidth: 1200, margin: "0 auto",
  },
  logoRow: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: {
    width: 32, height: 32, borderRadius: 9,
    background: "#22c55e",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 800,
  },
  logoMarkSmall: {
    width: 26, height: 26, borderRadius: 7,
    background: "#22c55e",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 800,
  },
  logoText: { fontSize: 18, fontWeight: 800, color: "#4ade80", letterSpacing: "-0.3px" },
  footerLogoText: { fontSize: 14, fontWeight: 700, color: "#4ade80" },
  navActions: { display: "flex", alignItems: "center", gap: 20 },
  navLink: { fontSize: 13.5, color: "#7fa88c", textDecoration: "none", fontWeight: 500 },
  navCta: {
    background: "#22c55e", color: "#060c0a",
    border: "none", borderRadius: 10, padding: "9px 18px",
    fontSize: 13.5, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit",
  },

  // Hero
  hero: {
    position: "relative", zIndex: 2,
    maxWidth: 780, margin: "0 auto",
    padding: "72px 24px 56px",
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center",
  },
  heroBadge: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "6px 14px", borderRadius: 20,
    background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.22)",
    fontSize: 12.5, color: "#7fa88c", fontWeight: 600, marginBottom: 24,
  },
  liveDot: {
    width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
    boxShadow: "0 0 0 3px rgba(74,222,128,0.2)",
  },
  headline: {
    fontSize: 46, fontWeight: 800, lineHeight: 1.15,
    letterSpacing: "-1px", margin: "0 0 20px",
    color: "#f0faf2",
  },
  subhead: {
    fontSize: 16.5, lineHeight: 1.65, color: "#8fb59d",
    maxWidth: 560, margin: "0 0 32px",
  },
  heroActions: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  primaryButton: {
    background: "#22c55e", color: "#060c0a",
    border: "none", borderRadius: 12, padding: "14px 28px",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit", transition: "opacity .15s",
  },
  secondaryButton: {
    background: "rgba(255,255,255,0.04)", color: "#e0f4e4",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 24px",
    fontSize: 15, fontWeight: 600, textDecoration: "none",
    display: "inline-flex", alignItems: "center",
  },
  heroNote: {
    marginTop: 16, fontSize: 12.5, color: "#4a6e56",
  },
  statsRow: {
    display: "flex", gap: 48, marginTop: 56,
    paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)",
    width: "100%", justifyContent: "center",
  },
  statItem: { textAlign: "center" },
  statValue: { fontSize: 28, fontWeight: 800, color: "#4ade80" },
  statLabel: { fontSize: 12, color: "#5f8a6e", marginTop: 4, maxWidth: 140 },

  // Sections
  section: {
    position: "relative", zIndex: 2,
    maxWidth: 1080, margin: "0 auto",
    padding: "64px 24px",
  },
  sectionHeader: { textAlign: "center", marginBottom: 44 },
  eyebrow: {
    fontSize: 12, fontWeight: 700, color: "#4ade80",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 30, fontWeight: 800, color: "#f0faf2",
    letterSpacing: "-0.5px", margin: 0,
  },

  // Feature grid
  featureGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20,
  },
  featureCard: {
    background: "rgba(13,23,16,0.6)", border: "1px solid rgba(34,197,94,0.14)",
    borderRadius: 16, padding: 24,
  },
  featureIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, marginBottom: 16,
  },
  featureTitle: { fontSize: 15.5, fontWeight: 700, color: "#e0f4e4", marginBottom: 8 },
  featureDesc: { fontSize: 13, lineHeight: 1.6, color: "#7fa88c" },

  // Steps
  stepsRow: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },
  stepCard: { position: "relative" },
  stepNum: {
    fontSize: 13, fontFamily: "monospace", fontWeight: 700,
    color: "#4ade80", opacity: 0.6, marginBottom: 12,
  },
  stepTitle: { fontSize: 16, fontWeight: 700, color: "#e0f4e4", marginBottom: 8 },
  stepDesc: { fontSize: 13, lineHeight: 1.6, color: "#7fa88c" },
  stepConnector: { display: "none" },

  // CTA band
  ctaBand: {
    position: "relative", zIndex: 2,
    maxWidth: 640, margin: "0 auto",
    padding: "64px 24px", textAlign: "center",
  },
  ctaTitle: {
    fontSize: 28, fontWeight: 800, color: "#f0faf2",
    letterSpacing: "-0.5px", margin: "0 0 12px",
  },
  ctaSubtitle: {
    fontSize: 14.5, color: "#7fa88c", lineHeight: 1.6,
    margin: "0 0 28px",
  },

  // Footer
  footer: {
    position: "relative", zIndex: 2,
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "28px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    maxWidth: 1200, margin: "0 auto",
  },
  footerLinks: { display: "flex", gap: 16 },
  footerText: { fontSize: 12, color: "#4a6e56" },
};