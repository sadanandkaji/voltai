// app/history/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

interface SavedRouteSummary {
  id: string;
  originName: string;
  destName: string;
  distanceKm: number;
  durationMin: number;
  remainingBattery: number;
  willReachDestination: boolean;
  aiVerdict: string | null;
  createdAt: string;
  _count: { chargingStations: number };
}

export default function HistoryPage() {
  const { status } = useSession();

  if (status === "loading") return <CenteredSpinner />;
  if (status === "unauthenticated") {
    signIn("google", { callbackUrl: "/history" });
    return null;
  }
  return <HistoryPageContent />;
}

function HistoryPageContent() {
  const router = useRouter();
  const [routes, setRoutes] = useState<SavedRouteSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/routes")
      .then((r) => {
        if (!r.ok) throw new Error("Couldn't load your trip history.");
        return r.json();
      })
      .then((d) => setRoutes(d.routes || []))
      .catch((e) => setError(e.message))
      .finally(() => {});
  }, []);

  function openTrip(id: string) {
    setOpeningId(id);
    router.push(`/plan?trip=${id}`);
  }

  const loading = routes === null && !error;

  return (
    // height + overflowY here instead of minHeight, so this page scrolls on
    // its own regardless of whatever overflow rules are set on html/body
    // (e.g. the fixed 100vh flex layout on /plan sets overflow:hidden on
    // the document, which was silently inherited here and blocked scroll).
    <div style={{ height: "100vh", overflowY: "auto", WebkitOverflowScrolling: "touch", background: "var(--bg)" }}>
      {/* Fixed Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
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
              width: 26,
              height: 26,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              flexShrink: 0,
            }}
          >
            ←
          </span>
          <span className="vq-profile-back-label">Back to planner</span>
        </Link>
        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: 14,
            color: "var(--green)",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "var(--green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "#fff",
            }}
          >
            ⚡
          </span>
          VoltIQ
        </span>
      </div>

      {/* Scrollable Content - paddingTop clears the fixed navbar */}
      <div style={{ paddingTop: 56 }}>
        <div
          className="vq-profile-container"
          style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 100px" }}
        >
          <div style={{ marginBottom: 22 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: 0 }}>
              Trip history
            </h1>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text3)",
                marginTop: 6,
              }}
            >
              {routes
                ? `${routes.length} trip${routes.length === 1 ? "" : "s"} planned`
                : "Loading your saved trips…"}
            </p>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(220,38,38,.08)",
                border: "1px solid rgba(220,38,38,.2)",
                borderRadius: 12,
                padding: 14,
                fontSize: 13,
                color: "#dc2626",
                marginBottom: 16,
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  border: "3px solid rgba(34,197,94,.15)",
                  borderTopColor: "var(--green)",
                  borderRadius: "50%",
                  animation: "spin .8s linear infinite",
                }}
              />
            </div>
          )}

          {routes && routes.length === 0 && (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "48px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>🗺️</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                No trips yet
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--text3)",
                  marginBottom: 18,
                }}
              >
                Plan your first route and it'll show up here.
              </div>
              <Link
                href="/plan"
                style={{
                  display: "inline-flex",
                  padding: "10px 20px",
                  borderRadius: 10,
                  background: "var(--green)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: "none",
                }}
              >
                + New Plan
              </Link>
            </div>
          )}

          {routes && routes.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {routes.map((r) => {
                const isOpening = openingId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => openTrip(r.id)}
                    disabled={!!openingId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      width: "100%",
                      textAlign: "left",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 16,
                      padding: "14px 16px",
                      cursor: openingId ? "wait" : "pointer",
                      opacity: openingId && !isOpening ? 0.55 : 1,
                      transition: "border-color .15s, background .15s, opacity .15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!openingId) {
                        e.currentTarget.style.borderColor = "var(--green-border)";
                        e.currentTarget.style.background = "var(--green-dim)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--surface)";
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 17,
                        background: r.willReachDestination
                          ? "var(--green-dim)"
                          : "rgba(220,38,38,.08)",
                        border: `1px solid ${
                          r.willReachDestination
                            ? "var(--green-border)"
                            : "rgba(220,38,38,.2)"
                        }`,
                      }}
                    >
                      {isOpening ? "…" : r.willReachDestination ? "✅" : "⚡"}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--text)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.originName.split(",")[0]} → {r.destName.split(",")[0]}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--text3)",
                          }}
                        >
                          {Math.round(r.distanceKm)} km · {Math.round(r.durationMin)} min
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--text3)",
                          }}
                        >
                          · {r._count.chargingStations} charger
                          {r._count.chargingStations !== 1 ? "s" : ""}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--text3)",
                          }}
                        >
                          ·{" "}
                          {new Date(r.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: 9,
                        padding: "3px 8px",
                        borderRadius: 20,
                        flexShrink: 0,
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: ".04em",
                        background: r.willReachDestination
                          ? "rgba(34,197,94,.12)"
                          : "rgba(239,68,68,.12)",
                        color: r.willReachDestination ? "#4ade80" : "#f87171",
                      }}
                    >
                      {r.willReachDestination ? "Reached" : "Charge needed"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function CenteredSpinner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060c0a",
      }}
    >
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