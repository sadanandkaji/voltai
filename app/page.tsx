"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RouteForm from "./components/RouteForm";
import { RouteFormData } from "./lib/types";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: RouteFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/route-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to calculate route");
      }
      const data = await res.json();
      sessionStorage.setItem("ev-result", JSON.stringify(data));
      router.push("/results");
    } catch (e: any) {
      setError(e.message || "Something went wrong. Check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10 pb-16 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Hero */}
      <header className="text-center mb-10 relative z-10 animate-fadeUp">
        <div className="inline-block bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-4 py-1 font-mono text-xs uppercase tracking-widest mb-5">
          ⚡ EV Intelligence
        </div>
        <h1 className="font-syne font-extrabold text-5xl md:text-6xl leading-tight tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
          Know Your Range
          <br />
          <span className="text-green-400">Before You Drive</span>
        </h1>
        <p className="font-mono text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Real-time battery prediction using live weather, elevation &amp; routing data.
        </p>
      </header>

      {/* Form card */}
      <div
        className="w-full max-w-md relative z-10 rounded-2xl overflow-hidden"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* macOS-style title bar */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid var(--border)", background: "rgba(34,197,94,0.03)" }}
        >
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="ml-2 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Route Planner
          </span>
        </div>

        <div className="p-5">
          <RouteForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {error && (
          <div className="mx-5 mb-5 flex items-center gap-2 rounded-xl px-4 py-3 font-mono text-sm text-red-400 bg-red-500/8 border border-red-500/20">
            <span>⚠️</span> {error}
          </div>
        )}
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2 justify-center mt-6 relative z-10">
        {[
          { icon: "🌦️", text: "Live Weather" },
          { icon: "🗺️", text: "Google Routes" },
          { icon: "⚡", text: "Charger Finder" },
          { icon: "⛰️", text: "Elevation" },
        ].map((f) => (
          <div
            key={f.text}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <span>{f.icon}</span> {f.text}
          </div>
        ))}
      </div>
    </main>
  );
}