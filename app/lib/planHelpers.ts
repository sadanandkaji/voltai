// app/lib/planHelpers.ts
//
// These were referenced in your plan/page.tsx (Msg, EV_PRESETS, TABS,
// isInvalidLocation, getBatteryColor) but never defined or imported —
// that's why it didn't compile. Centralizing them here so both the
// route-planner page and any future page can share them.

export type Msg =
  | { kind: "ai"; html: string }
  | { kind: "user"; text: string }
  | { kind: "form" }
  | { kind: "typing" };

export const EV_PRESETS = [
  { label: "Compact", range: 250 },
  { label: "Sedan", range: 400 },
  { label: "SUV", range: 350 },
  { label: "Premium", range: 500 },
  { label: "Long Range", range: 600 },
  { label: "Custom", range: 400 },
];

export const TABS = [
  { id: "navigate", icon: "🗺️", label: "Navigate" },
  { id: "analytics", icon: "📊", label: "Analytics" },
  { id: "battery", icon: "🔋", label: "Battery" },
  { id: "chargers", icon: "⚡", label: "Chargers" },
  { id: "ai", icon: "🤖", label: "AI" },
];

/** True if the user typed only digits (not a real place name). */
export function isInvalidLocation(value: string): boolean {
  return /^\d+$/.test(value.trim());
}

/** Red under 15%, amber under 35%, green otherwise. */
export function getBatteryColor(percent: number): string {
  if (percent <= 15) return "#dc2626";
  if (percent <= 35) return "#d97706";
  return "#16a34a";
}