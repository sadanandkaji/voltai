"use client";

import { useCallback, useEffect, useState } from "react";

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

interface Props {
  /** id of the route currently shown in the main pane, if any — highlights that row */
  activeId?: string | null;
  /** called when the user clicks a history row; should load + render that trip */
  onSelect: (id: string) => void | Promise<void>;
  /** called when the user clicks "+ New Plan" */
  onNewPlan: () => void;
  /** bump this number to force the list to refetch (e.g. right after a new trip saves) */
  refreshKey?: number;
  /** mobile-only: whether the drawer is open (ignored ≥861px, where it's always visible) */
  mobileOpen?: boolean;
  /** mobile-only: called when the drawer should close (row select, scrim click, Escape) */
  onMobileClose?: () => void;
}

export default function HistorySidebar({
  activeId,
  onSelect,
  onNewPlan,
  refreshKey,
  mobileOpen = false,
  onMobileClose,
}: Props) {
  const [routes, setRoutes]     = useState<SavedRouteSummary[]>([]);
  const [loading, setLoading]   = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/routes")
      .then((r) => r.json())
      .then((d) => setRoutes(d.routes || []))
      .catch(() => setRoutes([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  // Close the mobile drawer on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onMobileClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, onMobileClose]);

  async function handleSelect(id: string) {
    if (id === activeId || loadingId) return;
    setLoadingId(id);
    try {
      await onSelect(id);
    } finally {
      setLoadingId(null);
      onMobileClose?.();
    }
  }

  return (
    <>
      {/* Scrim — mobile only, closes the drawer on tap */}
      <div
        className={`vq-sidebar-scrim${mobileOpen ? " vq-open" : ""}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <div
        className={`vq-history-sidebar${mobileOpen ? " vq-open" : ""}`}
        style={{
          width: collapsed ? 56 : 260,
          flexShrink: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid var(--border)",
          background: "var(--surface)",
          transition: "width .22s cubic-bezier(.4,0,.2,1)",
          overflow: "hidden",
        }}
      >
        {/* Header: collapse toggle + New Plan */}
        <div
          style={{
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
            }}
          >
            {!collapsed && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--text3)",
                }}
              >
                History
              </span>
            )}
            <div style={{ display: "flex", gap: 6 }}>
              {/* Mobile-only close (X) */}
              <button
                onClick={onMobileClose}
                title="Close"
                className="vq-mobile-menu-btn"
                style={{
                  width: 24, height: 24, borderRadius: 6,
                  border: "1px solid var(--border)", background: "var(--surface2)",
                  color: "var(--text3)", fontSize: 12, cursor: "pointer",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
              {/* Desktop-only collapse toggle */}
              <button
                onClick={() => setCollapsed((v) => !v)}
                title={collapsed ? "Expand history" : "Collapse history"}
                style={{
                  width: 24, height: 24, borderRadius: 6,
                  border: "1px solid var(--border)", background: "var(--surface2)",
                  color: "var(--text3)", fontSize: 11, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {collapsed ? "»" : "«"}
              </button>
            </div>
          </div>

          <button
            onClick={() => { onNewPlan(); onMobileClose?.(); }}
            title="Plan a new route"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", padding: collapsed ? "10px 0" : "9px 12px",
              borderRadius: 10, border: "1px solid var(--green-border)",
              background: "var(--green-dim)", color: "var(--green)",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
              cursor: "pointer", transition: "opacity .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = ".85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
            {!collapsed && <span>New Plan</span>}
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: collapsed ? "8px 6px" : "8px" }}>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
              <div
                style={{
                  width: 18, height: 18, borderRadius: "50%",
                  border: "2px solid rgba(34,197,94,.2)", borderTopColor: "var(--green)",
                  animation: "hs-spin .8s linear infinite",
                }}
              />
            </div>
          )}

          {!loading && routes.length === 0 && !collapsed && (
            <div
              style={{
                padding: "24px 8px", textAlign: "center",
                color: "var(--text3)", fontSize: 12, fontFamily: "var(--font-mono)",
              }}
            >
              No trips yet
            </div>
          )}

          {!loading &&
            routes.map((r) => {
              const isActive = r.id === activeId;
              const isLoading = loadingId === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r.id)}
                  disabled={isLoading}
                  title={`${r.originName} → ${r.destName}`}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: collapsed ? "10px 4px" : "10px 10px",
                    marginBottom: 4, borderRadius: 8, cursor: isLoading ? "wait" : "pointer",
                    border: `1px solid ${isActive ? "var(--green-border)" : "transparent"}`,
                    background: isActive ? "var(--green-dim)" : "transparent",
                    opacity: isLoading ? 0.6 : 1,
                    transition: "background .12s, border-color .12s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "var(--surface2)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {collapsed ? (
                    <div style={{ textAlign: "center", fontSize: 15 }}>
                      {isLoading ? "…" : r.willReachDestination ? "✓" : "⚡"}
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: 12, fontWeight: 600,
                          color: isActive ? "var(--green)" : "var(--text)",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}
                      >
                        {r.originName.split(",")[0]} → {r.destName.split(",")[0]}
                      </div>
                      <div style={{ display: "flex", gap: 6, marginTop: 3, alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text3)" }}>
                          {Math.round(r.distanceKm)}km ·{" "}
                          {new Date(r.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </span>
                        <span
                          style={{
                            fontSize: 9, padding: "1px 5px", borderRadius: 8,
                            fontFamily: "var(--font-mono)",
                            background: r.willReachDestination ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)",
                            color: r.willReachDestination ? "#4ade80" : "#f87171",
                          }}
                        >
                          {isLoading ? "…" : r.willReachDestination ? "✓" : "⚡"}
                        </span>
                      </div>
                    </>
                  )}
                </button>
              );
            })}
        </div>

        <style>{`@keyframes hs-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );
}