// app/components/plan/StatCard.tsx
"use client";
import SectionTitle from "./SectionTitle";

interface Props {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

export default function StatCard({ label, value, sub, color }: Props) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <SectionTitle>{label}</SectionTitle>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: color ?? "var(--text)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text3)",
            marginTop: 4,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}