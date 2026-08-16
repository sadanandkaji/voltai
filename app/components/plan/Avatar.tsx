// app/components/plan/Avatar.tsx
"use client";

export default function Avatar() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "var(--green-dim)",
        border: "1px solid var(--green-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        flexShrink: 0,
        marginBottom: 2,
      }}
    >
      ⚡
    </div>
  );
}