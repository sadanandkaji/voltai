// app/page.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants, type Easing } from "framer-motion";
import { Globe } from "lucide-react";
import RouteShowcase from "./components/landing/routeshowcase";

// lucide-react dropped brand/logo icons (Github, Twitter, etc.) — inline
// minimal SVGs instead, sized/stroked to match the lucide icons they replace.
function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.68.8.56A11.51 11.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

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
  { value: "50", label: "credits per trip plan" },
];

const SOCIALS = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/sadanandkaji" },
  { icon: XIcon, label: "X", href: "https://x.com/sadanand_kaji" },
  { icon: Globe, label: "Portfolio", href: "https://sadanandkaji.com" },
];

const THEME_KEY = "voltiq-theme";

// Shared entrance variants — fade + rise, staggered by children.
const EASE_OUT: Easing = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
const stagger = (delayChildren = 0, staggerChildren = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [starting, setStarting] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Restore saved theme on mount (defaults to dark, matching the app shell).
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(THEME_KEY) : null;
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "";
  }, []);

  // Some route elsewhere in the app (a modal, a drawer, etc.) may leave
  // html/body with overflow:hidden set on them, which makes this page
  // un-scrollable even though its own content has no overflow rules.
  // Force scrolling back on whenever the landing page is mounted.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;

    html.style.overflow = "visible";
    body.style.overflow = "visible";
    html.style.height = "auto";
    body.style.height = "auto";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
    };
  }, []);

  function toggleTheme() {
    setDark((d) => {
      const next = !d;
      document.documentElement.dataset.theme = next ? "dark" : "";
      window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  }

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
      <div className="voltiq-grid-bg" style={styles.gridBg} />

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>⚡</div>
          <span style={styles.logoText}>VoltIQ</span>
        </div>

        {/* Desktop actions */}
        <div className="voltiq-nav-actions" style={styles.navActions}>
          {status === "authenticated" && (
            <Link href="/history" style={styles.navLink}>History</Link>
          )}
          <button onClick={toggleTheme} title="Toggle theme" style={styles.themeToggle}>
            {dark ? "☀️" : "🌙"}
          </button>
          {status === "authenticated" ? (
            <button onClick={() => router.push("/plan")} style={styles.navCta}>
              Open App →
            </button>
          ) : (
            <button onClick={handleGetStarted} disabled={starting} style={styles.navCta}>
              {starting ? "Signing in…" : "Sign In"}
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="voltiq-nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          style={styles.hamburger}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div className="voltiq-mobile-menu" style={styles.mobileMenu}>
          {status === "authenticated" && (
            <Link href="/history" style={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>
              🕓 History
            </Link>
          )}
          <button onClick={toggleTheme} style={styles.mobileMenuLink}>
            {dark ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
          {status === "authenticated" ? (
            <button
              onClick={() => { setMenuOpen(false); router.push("/plan"); }}
              style={{ ...styles.navCta, width: "100%" }}
            >
              Open App →
            </button>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); handleGetStarted(); }}
              disabled={starting}
              style={{ ...styles.navCta, width: "100%" }}
            >
              {starting ? "Signing in…" : "Sign In"}
            </button>
          )}
        </div>
      )}

      {/* Hero */}
      <motion.section
        style={styles.hero}
        variants={stagger(0.05, 0.12)}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} style={styles.heroBadge}>
          <span style={styles.liveDot} />
          Live charger data · AI-powered
        </motion.div>

        <motion.h1 variants={fadeUp} style={styles.headline}>
          Know your real EV range<br />
          <span style={{ color: "var(--green)" }}>before you leave the driveway.</span>
        </motion.h1>

        <motion.p variants={fadeUp} style={styles.subhead}>
          VoltIQ predicts real-world battery usage — accounting for weather, elevation, and
          driving style — and maps every charger along your route. No more range anxiety.
        </motion.p>

        <motion.div variants={fadeUp} style={styles.heroActions}>
          <button onClick={handleGetStarted} disabled={starting} style={styles.primaryButton}>
            {starting ? "Signing in…" : status === "authenticated" ? "Open App →" : "Plan Your First Trip →"}
          </button>
          <a href="#how-it-works" style={styles.secondaryButton}>
            See how it works
          </a>
        </motion.div>

        {status !== "authenticated" && (
          <motion.div variants={fadeUp} style={styles.heroNote}>
            Free to start — 100 credits, no card required
          </motion.div>
        )}

        {/* Animated route + charging-station preview */}
        <motion.div
          variants={fadeUp}
          style={{ marginTop: 40, width: "100%", display: "flex", justifyContent: "center" }}
        >
          <RouteShowcase />
        </motion.div>

        {/* Stats strip */}
        <motion.div variants={fadeUp} className="voltiq-stats-row" style={styles.statsRow}>
          {STATS.map((s) => (
            <div key={s.label} style={styles.statItem}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features */}
      <section style={styles.section}>
        <motion.div
          style={styles.sectionHeader}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.eyebrow}>Why VoltIQ</div>
          <h2 style={styles.sectionTitle}>Built for the way EVs actually behave</h2>
        </motion.div>

        <motion.div
          style={styles.featureGrid}
          variants={stagger(0, 0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: "var(--green-border)" }}
              style={styles.featureCard}
            >
              <div style={styles.featureIconWrap}>{f.icon}</div>
              <div style={styles.featureTitle}>{f.title}</div>
              <div style={styles.featureDesc}>{f.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={styles.section}>
        <motion.div
          style={styles.sectionHeader}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.eyebrow}>How it works</div>
          <h2 style={styles.sectionTitle}>Three steps to a stress-free trip</h2>
        </motion.div>

        <motion.div
          style={styles.stepsRow}
          variants={stagger(0, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {STEPS.map((s, i) => (
            <motion.div key={s.num} variants={fadeUp} style={styles.stepCard}>
              <div style={styles.stepNum}>{s.num}</div>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepDesc}>{s.desc}</div>
              {i < STEPS.length - 1 && <div style={styles.stepConnector} />}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA band */}
      <motion.section
        style={styles.ctaBand}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.ctaTitle}>Ready to drive without the guesswork?</h2>
        <p style={styles.ctaSubtitle}>
          Join drivers who plan smarter EV trips with real battery predictions and live charger data.
        </p>
        <button onClick={handleGetStarted} disabled={starting} style={styles.primaryButton}>
          {starting ? "Signing in…" : status === "authenticated" ? "Open App →" : "Get Started Free →"}
        </button>
      </motion.section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.logoRow}>
            <div style={styles.logoMarkSmall}>⚡</div>
            <span style={styles.footerLogoText}>VoltIQ</span>
          </div>

          <div style={styles.socialRow}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={styles.socialLink}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--green)"; e.currentTarget.style.borderColor = "var(--green-border)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div style={styles.footerDivider} />

        <div style={styles.footerBottom}>
          <span style={styles.footerText}>© {new Date().getFullYear()} VoltIQ</span>
          <span style={styles.footerText}>
            Made by{" "}
            <a href="https://sadanandkaji.com" target="_blank" rel="noopener noreferrer" style={styles.footerCredit}>
              Sadanand Kaji
            </a>
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes voltiq-drift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 44px 44px, 44px 44px; }
        }
        .voltiq-grid-bg { animation: voltiq-drift 26s linear infinite; }

        .voltiq-nav-hamburger { display: none; }
        .voltiq-mobile-menu { display: none; }

        @media (max-width: 720px) {
          .voltiq-stats-row { flex-wrap: wrap; gap: 24px !important; justify-content: flex-start !important; }
          .voltiq-nav-actions { display: none !important; }
          .voltiq-nav-hamburger { display: flex !important; }
          .voltiq-mobile-menu { display: flex !important; }
        }
      `}</style>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    position: "relative",
    color: "var(--text)",
    transition: "background .3s, color .3s",
    overflowX: "hidden",
    overflowY: "visible",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(var(--green-dim) 1px, transparent 1px), linear-gradient(90deg, var(--green-dim) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
  },

  // Nav
  nav: {
    position: "relative", zIndex: 20,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 24px", maxWidth: 1200, margin: "0 auto",
  },
  logoRow: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: {
    width: 32, height: 32, borderRadius: 9,
    background: "var(--green)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 800,
  },
  logoMarkSmall: {
    width: 26, height: 26, borderRadius: 7,
    background: "var(--green)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 800,
  },
  logoText: { fontSize: 18, fontWeight: 800, color: "var(--green)", letterSpacing: "-0.3px" },
  footerLogoText: { fontSize: 14, fontWeight: 700, color: "var(--green)" },
  navActions: { display: "flex", alignItems: "center", gap: 14 },
  navLink: { fontSize: 13.5, color: "var(--text2)", textDecoration: "none", fontWeight: 500 },
  navCta: {
    background: "var(--green)", color: "#04140a",
    border: "none", borderRadius: 10, padding: "9px 18px",
    fontSize: 13.5, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit",
  },
  themeToggle: {
    width: 32, height: 32, borderRadius: 8,
    border: "1px solid var(--border)", background: "var(--surface2)",
    fontSize: 14, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  hamburger: {
    width: 36, height: 36, borderRadius: 8,
    border: "1px solid var(--border)", background: "var(--surface2)",
    color: "var(--text)", fontSize: 16, cursor: "pointer",
    alignItems: "center", justifyContent: "center",
  },
  mobileMenu: {
    position: "relative", zIndex: 20,
    flexDirection: "column", gap: 10,
    padding: "0 24px 20px", maxWidth: 1200, margin: "0 auto",
  },
  mobileMenuLink: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "11px 14px", borderRadius: 10,
    background: "var(--surface)", border: "1px solid var(--border)",
    color: "var(--text2)", fontSize: 14, fontWeight: 600,
    textDecoration: "none", cursor: "pointer", fontFamily: "inherit",
  },

  // Hero
  hero: {
    position: "relative", zIndex: 2,
    maxWidth: 780, margin: "0 auto",
    padding: "56px 20px 48px",
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center",
  },
  heroBadge: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "6px 14px", borderRadius: 20,
    background: "var(--green-dim)", border: "1px solid var(--green-border)",
    fontSize: 12.5, color: "var(--text2)", fontWeight: 600, marginBottom: 24,
  },
  liveDot: {
    width: 6, height: 6, borderRadius: "50%", background: "var(--green)",
    boxShadow: "0 0 0 3px var(--green-dim)",
  },
  headline: {
    fontSize: "clamp(30px, 7vw, 46px)", fontWeight: 800, lineHeight: 1.15,
    letterSpacing: "-1px", margin: "0 0 20px",
    color: "var(--text)",
  },
  subhead: {
    fontSize: "clamp(14.5px, 3.6vw, 16.5px)", lineHeight: 1.65, color: "var(--text2)",
    maxWidth: 560, margin: "0 0 32px",
  },
  heroActions: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  primaryButton: {
    background: "var(--green)", color: "#04140a",
    border: "none", borderRadius: 12, padding: "14px 28px",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit", transition: "opacity .15s",
  },
  secondaryButton: {
    background: "var(--surface2)", color: "var(--text)",
    border: "1px solid var(--border)", borderRadius: 12, padding: "14px 24px",
    fontSize: 15, fontWeight: 600, textDecoration: "none",
    display: "inline-flex", alignItems: "center",
  },
  heroNote: {
    marginTop: 16, fontSize: 12.5, color: "var(--text3)",
  },
  statsRow: {
    display: "flex", gap: 48, marginTop: 44,
    paddingTop: 32, borderTop: "1px solid var(--border)",
    width: "100%", justifyContent: "center",
  },
  statItem: { textAlign: "center" },
  statValue: { fontSize: 28, fontWeight: 800, color: "var(--green)" },
  statLabel: { fontSize: 12, color: "var(--text3)", marginTop: 4, maxWidth: 140 },

  // Sections
  section: {
    position: "relative", zIndex: 2,
    maxWidth: 1080, margin: "0 auto",
    padding: "56px 20px",
  },
  sectionHeader: { textAlign: "center", marginBottom: 40 },
  eyebrow: {
    fontSize: 12, fontWeight: 700, color: "var(--green)",
    textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
  },
  sectionTitle: {
    fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 800, color: "var(--text)",
    letterSpacing: "-0.5px", margin: 0,
  },

  // Feature grid
  featureGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 18,
  },
  featureCard: {
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: 16, padding: 22,
    transition: "border-color .2s",
  },
  featureIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    background: "var(--green-dim)", border: "1px solid var(--green-border)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, marginBottom: 16,
  },
  featureTitle: { fontSize: 15.5, fontWeight: 700, color: "var(--text)", marginBottom: 8 },
  featureDesc: { fontSize: 13, lineHeight: 1.6, color: "var(--text2)" },

  // Steps
  stepsRow: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 22,
  },
  stepCard: { position: "relative" },
  stepNum: {
    fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 700,
    color: "var(--green)", opacity: 0.7, marginBottom: 12,
  },
  stepTitle: { fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 },
  stepDesc: { fontSize: 13, lineHeight: 1.6, color: "var(--text2)" },
  stepConnector: { display: "none" },

  // CTA band
  ctaBand: {
    position: "relative", zIndex: 2,
    maxWidth: 640, margin: "0 auto",
    padding: "56px 20px", textAlign: "center",
  },
  ctaTitle: {
    fontSize: "clamp(22px, 5.5vw, 28px)", fontWeight: 800, color: "var(--text)",
    letterSpacing: "-0.5px", margin: "0 0 12px",
  },
  ctaSubtitle: {
    fontSize: 14.5, color: "var(--text2)", lineHeight: 1.6,
    margin: "0 0 28px",
  },

  // Footer
  footer: {
    position: "relative", zIndex: 2,
    borderTop: "1px solid var(--border)",
    padding: "26px 24px 22px",
    maxWidth: 1200, margin: "0 auto",
  },
  footerTop: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: 14,
  },
  socialRow: { display: "flex", alignItems: "center", gap: 8 },
  socialLink: {
    width: 32, height: 32, borderRadius: 8,
    border: "1px solid var(--border)", background: "var(--surface2)",
    color: "var(--text2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "color .15s, border-color .15s",
  },
  footerDivider: { height: 1, background: "var(--border)", margin: "18px 0 14px" },
  footerBottom: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: 8,
  },
  footerLinks: { display: "flex", gap: 16 },
  footerText: { fontSize: 12, color: "var(--text3)" },
  footerCredit: { color: "var(--text2)", fontWeight: 600, textDecoration: "none" },
};