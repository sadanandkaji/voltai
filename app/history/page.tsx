// app/history/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

interface CreditLogEntry {
  id: string;
  amount: number;
  reason: string;
  balanceAfter: number;
  createdAt: string;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [routes, setRoutes] = useState<SavedRouteSummary[]>([]);
  const [credits, setCredits] = useState<{ balance: number; history: CreditLogEntry[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") signIn();
    if (status !== "authenticated") return;

    Promise.all([
      fetch("/api/routes").then((r) => r.json()),
      fetch("/api/credits").then((r) => r.json()),
    ])
      .then(([routesRes, creditsRes]) => {
        setRoutes(routesRes.routes || []);
        setCredits(creditsRes);
      })
      .finally(() => setLoading(false));
  }, [status]);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/routes/${id}`, { method: "DELETE" });
      setRoutes((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Trip History</h1>
          <button
            onClick={() => router.push("/")}
            className="text-sm px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800"
          >
            ← New trip
          </button>
        </div>

        {/* Credit balance card */}
        {credits && (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500">Credit Balance</div>
              <div className="text-3xl font-bold text-green-400 mt-1">{credits.balance}</div>
            </div>
            <div className="text-xs text-neutral-500 text-right max-w-[60%]">
              Each route plan costs 5 credits. New accounts start with 100.
            </div>
          </div>
        )}

        {/* Saved routes */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm uppercase tracking-widest text-neutral-500">Recent Trips</h2>

          {routes.length === 0 && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center text-neutral-500 text-sm">
              No saved trips yet — plan a route to see it here.
            </div>
          )}

          {routes.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">
                  {r.originName.split(",")[0]} → {r.destName.split(",")[0]}
                </div>
                <div className="text-xs text-neutral-500 mt-1 flex gap-3 flex-wrap">
                  <span>{r.distanceKm} km</span>
                  <span>{Math.round(r.durationMin)} min</span>
                  <span>{r._count.chargingStations} chargers</span>
                  <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div
                className={`text-xs px-2 py-1 rounded-full font-mono ${
                  r.willReachDestination
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {r.willReachDestination ? "✓ Safe" : "⚡ Charge"}
              </div>

              <button
                onClick={() => handleDelete(r.id)}
                disabled={deletingId === r.id}
                className="text-xs text-neutral-500 hover:text-red-400 disabled:opacity-50"
              >
                {deletingId === r.id ? "…" : "Delete"}
              </button>
            </div>
          ))}
        </div>

        {/* Credit log */}
        {credits && credits.history.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500">Credit Activity</h2>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
              {credits.history.map((h, i) => (
                <div
                  key={h.id}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                    i < credits.history.length - 1 ? "border-b border-neutral-800" : ""
                  }`}
                >
                  <span className="text-neutral-400">{h.reason}</span>
                  <div className="flex items-center gap-3">
                    <span className={h.amount < 0 ? "text-red-400" : "text-green-400"}>
                      {h.amount > 0 ? "+" : ""}
                      {h.amount}
                    </span>
                    <span className="text-neutral-600 text-xs">bal: {h.balanceAfter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}