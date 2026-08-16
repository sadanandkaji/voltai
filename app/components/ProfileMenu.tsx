// app/components/ProfileMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
  /** Optional — pass a live number if the parent already has it (e.g. plan page).
   *  If omitted, the menu fetches its own balance from /api/user/profile. */
  creditsRemaining?: number | null;
}

/**
 * Avatar button (top-right, same slot as claude.ai's account menu) that opens
 * a dropdown with the signed-in user's name/email, credit balance, a link to
 * the full profile page, and a sign-out action.
 */
export default function ProfileMenu({ creditsRemaining = null }: Props) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [credits, setCredits] = useState<number | null>(creditsRemaining);
  const wrapRef = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  // Close on outside click / Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Fetch balance lazily on first open if the parent didn't already pass one
  useEffect(() => {
    if (!open || credits !== null) return;
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((d) => setCredits(d.credits ?? null))
      .catch(() => {});
  }, [open, credits]);

  if (!user) return null;

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        title={user.name || user.email || "Account"}
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1px solid var(--green-border)",
          background: user.image ? `url(${user.image}) center/cover` : "var(--green-dim)",
          color: "var(--green)",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: 12,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {!user.image && initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 38,
            right: 0,
            width: 250,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            boxShadow: "0 8px 28px rgba(0,0,0,.28)",
            overflow: "hidden",
            zIndex: 100,
            fontFamily: "var(--font-sans)",
          }}
        >
          {/* Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 14px 12px" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid var(--green-border)",
                background: user.image ? `url(${user.image}) center/cover` : "var(--green-dim)",
                color: "var(--green)",
                fontWeight: 700,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {!user.image && initial}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name || "Driver"}
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.email}
              </div>
            </div>
          </div>

          {/* Credits */}
          <div style={{ padding: "0 14px 12px" }}>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
                borderRadius: 10,
                padding: "9px 11px",
                background: "var(--green-dim)",
                border: "1px solid var(--green-border)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--green)", fontWeight: 600 }}>
                💳 Credits
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--green)" }}>
                {credits === null ? "…" : credits}
              </span>
            </Link>
          </div>

          <div style={{ height: 1, background: "var(--border)" }} />

          {/* Menu items */}
          <div style={{ padding: 6 }}>
            <MenuLink href="/profile" icon="👤" label="Profile & billing" onNavigate={() => setOpen(false)} />
            <MenuLink href="/history" icon="🕓" label="Trip history" onNavigate={() => setOpen(false)} />
          </div>

          <div style={{ height: 1, background: "var(--border)" }} />

          {/* Sign out */}
          <div style={{ padding: 6 }}>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 10px",
                borderRadius: 8,
                border: "none",
                background: "none",
                color: "#f87171",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <span style={{ fontSize: 14 }}>↩</span>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon,
  label,
  onNavigate,
}: {
  href: string;
  icon: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 10px",
        borderRadius: 8,
        textDecoration: "none",
        color: "var(--text2)",
        fontSize: 13,
        fontWeight: 500,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface2)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: 14, width: 16, textAlign: "center" }}>{icon}</span>
      {label}
    </Link>
  );
}