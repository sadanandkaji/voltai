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
  const pct = data ? Math.max(0, Math.min(100, (data.credits / data.startingCredits) * 100)) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 20px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
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
          ← Back to planner
        </Link>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 14, color: "var(--green)" }}>
          ⚡ VoltIQ
        </span>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 60px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Identity card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 24,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "1px solid var(--green-border)",
              background: user?.image ? `url(${user.image}) center/cover` : "var(--green-dim)",
              color: "var(--green)",
              fontWeight: 800,
              fontSize: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {!user?.image && initial}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{user?.name || "Driver"}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{user?.email}</div>
            {data && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
                Member since {new Date(data.memberSince).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(220,38,38,.08)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 12, padding: 14, fontSize: 13, color: "#dc2626" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Credits card */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "var(--text3)",
                fontWeight: 600,
              }}
            >
              Credit balance
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                background: "var(--green-dim)",
                color: "var(--green)",
                border: "1px solid var(--green-border)",
                padding: "2px 8px",
                borderRadius: 20,
              }}
            >
              Free plan
            </span>
          </div>

          {loading ? (
            <div style={{ height: 40 }} />
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: "var(--green)" }}>💳 {data?.credits ?? 0}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text3)" }}>
                  / {data?.startingCredits ?? 100} credits
                </span>
              </div>
              <div style={{ height: 6, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden", marginBottom: 10 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "var(--green)", transition: "width .5s" }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>
                Each route plan costs {data?.creditsPerTrip ?? 5} credits — enough for roughly{" "}
                {data ? Math.floor(data.credits / data.creditsPerTrip) : "—"} more trip{data && Math.floor(data.credits / data.creditsPerTrip) === 1 ? "" : "s"}.
              </div>
              <button
                style={{
                  marginTop: 16,
                  width: "100%",
                  padding: "10px 0",
                  background: "var(--green)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                  cursor: "pointer",
                }}
              >
                Get more credits
              </button>
            </>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text)" }}>{data?.tripsPlanned ?? "—"}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 4, textTransform: "uppercase", letterSpacing: ".05em" }}>
              Trips planned
            </div>
          </div>
          <Link
            href="/history"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 16,
              textAlign: "center",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 20 }}>🕓</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--green)", marginTop: 6 }}>View full trip history</div>
          </Link>
        </div>

        {/* Recent activity */}
        {data && data.recentActivity.length > 0 && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "var(--text3)",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Recent credit activity
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {data.recentActivity.map((a) => {
                const isSpend = a.amount < 0;
                return (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "9px 2px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12.5, color: "var(--text)", fontWeight: 500 }}>{a.reason}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)", marginTop: 1 }}>
                        {new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                        {" · "}balance {a.balanceAfter}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 600,
                        color: isSpend ? "#dc2626" : "#16a34a",
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

        {/* Account actions */}
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