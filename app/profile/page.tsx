// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface ProfileData {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  credits: number;
  creditsPerTrip: number;
  startingCredits: number;
  memberSince: string;
  tripsPlanned: number;
  /** amount is negative for a spend, positive for a top-up/grant */
  recentActivity: { id: string; reason: string; amount: number; balanceAfter: number; date: string }[];
}

export default function ProfilePage() {
  const { status } = useSession();

  if (status === "loading") return <CenteredSpinner />;
  if (status === "unauthenticated") {
    signIn("google", { callbackUrl: "/profile" });
    return null;
  }
  return <ProfilePageContent />;
}

/* ── Small building blocks ─────────────────────────────────────────────── */

function CreditRing({ pct, size = 120 }: { pct: number; size?: number }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, pct)) / 100) * circ;
  const color = pct > 40 ? "var(--green)" : pct > 15 ? "#d97706" : "#dc2626";

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface2)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray .7s ease, stroke .3s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ fontSize: size * 0.22, fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>
          {Math.round(pct)}%
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 3 }}>
          left
        </span>
      </div>
    </div>
  );
}

function IconTile({ icon }: { icon: string }) {
  return (
    <div
      style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: "var(--surface2)", border: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15,
      }}
    >
      {icon}
    </div>
  );
}

function activityIcon(reason: string) {
  const r = reason.toLowerCase();
  if (r.includes("trip") || r.includes("route") || r.includes("plan")) return "⚡";
  if (r.includes("bonus") || r.includes("grant") || r.includes("welcome") || r.includes("signup")) return "🎁";
  if (r.includes("refund")) return "↩️";
  if (r.includes("purchase") || r.includes("top") || r.includes("buy")) return "💳";
  return "•";
}

/* ── Main content ───────────────────────────────────────────────────────── */

function ProfilePageContent() {
  const { data: session } = useSession();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => {
        if (!r.ok) throw new Error("Couldn't load your profile.");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const user = session?.user;
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();
  const pct = data && data.startingCredits > 0 ? Math.max(0, Math.min(100, (data.credits / data.startingCredits) * 100)) : 0;
  const tripsLeft = data ? Math.floor(data.credits / Math.max(1, data.creditsPerTrip)) : 0;

  // Mailto link for requesting more credits — opens the user's default
  // mail app addressed to you, with account details pre-filled so you
  // know who's asking and their current balance.
  const creditRequestMailto = `mailto:sadanandkaji2@gmail.com?subject=${encodeURIComponent(
    "VoltIQ — Request for more credits"
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'd like to request more credits for my VoltIQ account.\n\n` +
      `Account email: ${user?.email || "—"}\n` +
      `Name: ${user?.name || "—"}\n` +
      `Current balance: ${data?.credits ?? "—"} credits\n\n` +
      `Thanks!`
  )}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        background: "var(--bg)",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky", top: 0, zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 20px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Link
          href="/plan"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text3)",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 26, height: 26, borderRadius: 8, display: "flex",
              alignItems: "center", justifyContent: "center",
              background: "var(--surface2)", border: "1px solid var(--border)",
              flexShrink: 0,
            }}
          >
            ←
          </span>
          <span className="vq-profile-back-label">Back to planner</span>
        </Link>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 14, color: "var(--green)" }}>
          <span style={{
            width: 22, height: 22, borderRadius: 6, background: "var(--green)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: "#fff",
          }}>⚡</span>
          VoltIQ
        </span>
      </div>

      <div
        className="vq-profile-container"
        style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 100px", display: "flex", flexDirection: "column", gap: 18 }}
      >
        {/* ── Identity hero ── */}
        <div
          className="vq-profile-identity"
          style={{
            position: "relative",
            background: "linear-gradient(160deg, var(--green-dim) 0%, var(--surface) 55%)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 26,
            display: "flex",
            alignItems: "center",
            gap: 18,
            overflow: "hidden",
          }}
        >
          {/* Faint decorative bolt */}
          <div
            aria-hidden
            style={{
              position: "absolute", right: -18, top: -18,
              fontSize: 130, opacity: 0.05, lineHeight: 1, userSelect: "none",
              color: "var(--green)",
            }}
          >⚡</div>

          <div
            className="vq-profile-avatar"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              padding: 3,
              background: "linear-gradient(135deg, var(--green), var(--green-border))",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%", height: "100%", borderRadius: "50%",
                border: "3px solid var(--surface)",
                background: user?.image ? `url(${user.image}) center/cover` : "var(--green-dim)",
                color: "var(--green)",
                fontWeight: 800,
                fontSize: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!user?.image && initial}
            </div>
          </div>

          <div style={{ minWidth: 0, flex: 1, position: "relative" }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name || "Driver"}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email}
            </div>
            {data && (
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 9px", borderRadius: 20,
                    background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text3)",
                  }}
                >
                  🗓 Since {new Date(data.memberSince).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 9px", borderRadius: 20,
                    background: "var(--green-dim)", border: "1px solid var(--green-border)", color: "var(--green)",
                  }}
                >
                  Free plan
                </span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 12, padding: 14, fontSize: 13, color: "#dc2626" }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Credits card ── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              color: "var(--text3)",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Credit balance
          </div>

          {loading ? (
            <div style={{ height: 110 }} />
          ) : (
            <>
              <div className="vq-profile-credits-row" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <CreditRing pct={pct} />

                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 34, fontWeight: 800, color: "var(--text)" }}>{data?.credits ?? 0}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)" }}>
                      / {data?.startingCredits ?? 100} credits
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", lineHeight: 1.6, marginTop: 6 }}>
                    {data?.creditsPerTrip ?? 5} credits per trip plan · enough for{" "}
                    <strong style={{ color: "var(--green)" }}>{tripsLeft}</strong> more trip{tripsLeft === 1 ? "" : "s"}
                  </div>

                  {/* Get more credits — plain mailto link addressed to you,
                      pre-filled with the user's account details */}
                  <a
                    href={creditRequestMailto}
                    style={{
                      marginTop: 14,
                      padding: "9px 18px",
                      background: "var(--green)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      fontSize: 12.5,
                      fontWeight: 700,
                      fontFamily: "var(--font-sans)",
                      cursor: "pointer",
                      transition: "opacity .15s",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = ".85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Get more credits
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Stats ── */}
        <div className="vq-profile-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div
            style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16,
              padding: 18, display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <IconTile icon="🛣️" />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>{data?.tripsPlanned ?? "—"}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 5, textTransform: "uppercase", letterSpacing: ".05em" }}>
                Trips planned
              </div>
            </div>
          </div>

          <Link
            href="/history"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 18,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition: "border-color .15s, background .15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--green-border)"; e.currentTarget.style.background = "var(--green-dim)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}
          >
            <IconTile icon="🕓" />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text)" }}>Trip history</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)", marginTop: 5 }}>
                View all →
              </div>
            </div>
          </Link>
        </div>

        {/* ── Recent activity ── */}
        {data && data.recentActivity.length > 0 && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 22 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "var(--text3)",
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              Recent credit activity
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {data.recentActivity.map((a, i) => {
                const isSpend = a.amount < 0;
                return (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 0",
                      borderBottom: i < data.recentActivity.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13,
                        background: isSpend ? "rgba(220,38,38,.08)" : "var(--green-dim)",
                        border: `1px solid ${isSpend ? "rgba(220,38,38,.2)" : "var(--green-border)"}`,
                      }}
                    >
                      {activityIcon(a.reason)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, color: "var(--text)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {a.reason}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
                        {new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        {" · "}balance {a.balanceAfter}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: isSpend ? "#dc2626" : "#16a34a",
                        flexShrink: 0,
                      }}
                    >
                      {isSpend ? "" : "+"}
                      {a.amount}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Account actions ── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 8 }}>
          {!confirmingSignOut ? (
            <button
              onClick={() => setConfirmingSignOut(true)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 10,
                border: "none",
                background: "none",
                color: "#f87171",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <span>↩</span> Sign out
            </button>
          ) : (
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>Sign out of VoltIQ on this device?</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    borderRadius: 8,
                    border: "1px solid rgba(239,68,68,.3)",
                    background: "rgba(239,68,68,.1)",
                    color: "#f87171",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign out
                </button>
                <button
                  onClick={() => setConfirmingSignOut(false)}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--surface2)",
                    color: "var(--text2)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .vq-profile-container {
            padding: 20px 14px 100px !important;
            gap: 14px !important;
          }
          .vq-profile-identity {
            padding: 18px !important;
            gap: 14px !important;
          }
          .vq-profile-avatar {
            width: 56px !important;
            height: 56px !important;
          }
          .vq-profile-back-label {
            display: none;
          }
          .vq-profile-stats {
            grid-template-columns: 1fr !important;
          }
          .vq-profile-credits-row {
            justify-content: center;
            text-align: center;
          }
        }

        @media (max-width: 380px) {
          .vq-profile-identity {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

function CenteredSpinner() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060c0a" }}>
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid rgba(34,197,94,0.15)",
          borderTopColor: "#22c55e",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}