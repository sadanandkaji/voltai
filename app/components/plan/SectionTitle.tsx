// app/components/plan/SectionTitle.tsx
"use client";
import type React from "react";

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: ".08em",
        color: "var(--text3)",
        marginBottom: 10,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}