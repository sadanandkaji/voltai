// app/login/page.tsx
"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FEATURES = [
  { icon: "🔋", label: "Real-world battery prediction", desc: "Weather, elevation, speed & load — not just manufacturer specs" },
  { icon: "⚡", label: "Live charger discovery", desc: "OpenChargeMap + web search finds stations even in small towns" },
  { icon: "🤖", label: "AI trip analysis", desc: "Personalised charging strategy and optimal speed for every route" },
  { icon: "🗺️", label: "Turn-by-turn navigation", desc: "Full route map with animated directions and charger pins" },
];

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [signingIn, setSigningIn] = useState(false);

  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Already signed in — bounce to the app
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  async function handleGoogleSignIn() {
    setSigningIn(true);
    try {
      await signIn("google", { callbackUrl });
    } catch {
      setSigningIn(false);
    }
  }

  if (status === "loading" || status === "authenticated") {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner} />
      </div>
    );
  }

  return (
    <main style={styles.page}>
      {/* Grid background */}
      <div style={styles.gridBg} />

      <div style={styles.container}>
        {/* Left: brand + pitch */}
        <div style={styles.leftPane}>
          <div style={styles.logoRow}>
            <div style={styles.logoMark}>⚡</div>
            <span style={styles.logoText}>VoltIQ</span>
          </div>

          <h1 style={styles.headline}>
            Know your real EV range<br />before you leave the driveway.
          </h1>
          <p style={styles.subhead}>
            VoltIQ predicts real-world battery usage — accounting for weather, elevation,
            and driving style — and maps every charger along your route.
          </p>

          <div style={styles.featureList}>
            {FEATURES.map((f) => (
              <div key={f.label} style={styles.featureRow}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <div>
                  <div style={styles.featureLabel}>{f.label}</div>
                  <div style={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: sign-in card */}
        <div style={styles.rightPane}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardLogoMark}>⚡</div>
              <div style={styles.cardTitle}>Sign in to VoltIQ</div>
              <div style={styles.cardSubtitle}>
                New accounts start with 100 free credits — enough for 20 trip plans.
              </div>
            </div>

            {error && (
              <div style={styles.errorBox}>
                {error === "OAuthAccountNotLinked"
                  ? "That email is already linked to a different sign-in method."
                  : "Something went wrong signing in. Please try again."}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              style={{
                ...styles.googleButton,
                opacity: signingIn ? 0.7 : 1,
                cursor: signingIn ? "not-allowed" : "pointer",
              }}
            >
              {signingIn ? (
                <span style={styles.spinnerSmall} />
              ) : (
                <GoogleIcon />
              )}
              {signingIn ? "Signing in…" : "Continue with Google"}
            </button>

            <div style={styles.terms}>
              By continuing, you agree to VoltIQ's Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59A8.6 8.6 0 0 0 9 0 9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#060c0a",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
  },
  container: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    width: "100%",
    maxWidth: 1040,
    gap: 56,
    alignItems: "center",
    flexWrap: "wrap",
  },
  leftPane: {
    flex: "1 1 440px",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  logoRow: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: {
    width: 36, height: 36, borderRadius: 10,
    background: "#22c55e",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, fontWeight: 800,
  },
  logoText: { fontSize: 20, fontWeight: 800, color: "#4ade80", letterSpacing: "-0.3px" },
  headline: {
    fontSize: 38, fontWeight: 800, lineHeight: 1.15,
    color: "#f0faf2", letterSpacing: "-0.5px", margin: 0,
  },
  subhead: {
    fontSize: 15, lineHeight: 1.6, color: "#7fa88c", maxWidth: 460, margin: 0,
  },
  featureList: { display: "flex", flexDirection: "column", gap: 16, marginTop: 8 },
  featureRow: { display: "flex", alignItems: "flex-start", gap: 12 },
  featureIcon: {
    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
    background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
  },
  featureLabel: { fontSize: 14, fontWeight: 700, color: "#e0f4e4" },
  featureDesc: { fontSize: 12.5, color: "#5f8a6e", marginTop: 2, lineHeight: 1.5 },
  rightPane: { flex: "1 1 360px", display: "flex", justifyContent: "center" },
  card: {
    width: "100%", maxWidth: 380,
    background: "rgba(13,23,16,0.9)",
    border: "1px solid rgba(34,197,94,0.18)",
    borderRadius: 20,
    padding: 32,
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  },
  cardHeader: { textAlign: "center", marginBottom: 28 },
  cardLogoMark: {
    width: 48, height: 48, borderRadius: 14,
    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, margin: "0 auto 16px",
  },
  cardTitle: { fontSize: 19, fontWeight: 800, color: "#f0faf2" },
  cardSubtitle: { fontSize: 12.5, color: "#5f8a6e", marginTop: 8, lineHeight: 1.5 },
  errorBox: {
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
    borderRadius: 10, padding: "10px 14px", fontSize: 12.5, color: "#f87171",
    marginBottom: 18, lineHeight: 1.5,
  },
  googleButton: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    background: "#fff", color: "#1f2937",
    border: "none", borderRadius: 12, padding: "13px 0",
    fontSize: 14, fontWeight: 700, fontFamily: "inherit",
    transition: "opacity .15s",
  },
  spinnerSmall: {
    width: 16, height: 16, border: "2px solid rgba(0,0,0,0.15)", borderTopColor: "#1f2937",
    borderRadius: "50%", animation: "spin 0.7s linear infinite",
  },
  terms: {
    marginTop: 20, fontSize: 11, color: "#4a6e56", textAlign: "center", lineHeight: 1.5,
  },
  loadingScreen: {
    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
    background: "#060c0a",
  },
  spinner: {
    width: 36, height: 36, border: "3px solid rgba(34,197,94,0.15)", borderTopColor: "#22c55e",
    borderRadius: "50%", animation: "spin 0.8s linear infinite",
  },
};