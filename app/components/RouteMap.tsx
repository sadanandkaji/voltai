"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { GeoLocation, ChargingStation } from "../lib/types";

interface Step { instruction: string; distanceText: string; durationText: string; maneuver: string | null; }
interface RouteData { distanceText: string; durationText: string; encodedPolyline: string; steps: Step[]; }
interface Props {
  origin: GeoLocation;
  destination: GeoLocation;
  chargingStations?: ChargingStation[];
  batteryPercent?: number;
  remainingBattery?: number;
}

function decodePolyline(encoded: string): { lat: number; lng: number }[] {
  const pts: { lat: number; lng: number }[] = [];
  let i = 0, lat = 0, lng = 0;
  while (i < encoded.length) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(i++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;
    pts.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return pts;
}

const DARK_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0a120e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4a7a5c" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#060c0a" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1a2e1e" }] },
  { featureType: "administrative.land_parcel", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#0d1a10" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#152218" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a2e1e" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1e3525" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#253d2b" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#5a9a6a" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#060f0a" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#2a5a3a" }] },
];

function arrowIcon(m: string | null) {
  if (!m) return "→";
  if (m.includes("left")) return "↰";
  if (m.includes("right")) return "↱";
  if (m.includes("uturn")) return "↩";
  if (m.includes("roundabout")) return "↻";
  if (m.includes("merge") || m.includes("ramp")) return "⤷";
  return "→";
}

// Determine pin colour-tier based on battery annotation
function getPinTier(s: ChargingStation): "critical" | "needed" | "info" {
  if (s.isCritical) return "critical";
  if (s.isNeeded)   return "needed";
  return "info";
}

function buildChargingPinSvg(s: ChargingStation, idx: number): string {
  const tier = getPinTier(s);

  // Tier colour config
  const cfg = {
    critical: { fill: "#ef4444", stroke: "#fca5a5", glow: "#ef4444", badge: "🛑", label: "STOP" },
    needed:   { fill: "#f59e0b", stroke: "#fcd34d", glow: "#f59e0b", badge: "⚡", label: "CHARGE" },
    info:     { fill: "#3b82f6", stroke: "#93c5fd", glow: "#3b82f6", badge: s.fastCharge ? "⚡" : "🔌", label: "" },
  }[tier];

  const battBadge = s.batteryAtPoint !== undefined
    ? `<text x="24" y="52" text-anchor="middle" font-size="8" fill="${cfg.stroke}" font-family="monospace" font-weight="bold">${s.batteryAtPoint.toFixed(0)}%</text>`
    : "";

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
    `<svg width="54" height="68" viewBox="0 0 54 68" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="g${idx}">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="${cfg.glow}" flood-opacity="0.8"/>
        </filter>
        ${tier === "critical" ? `<animate attributeName="opacity" values="1;0.5;1" dur="1.2s" repeatCount="indefinite"/>` : ""}
      </defs>
      <!-- Pin body -->
      <path filter="url(#g${idx})"
        d="M27 2C15.4 2 6 11.4 6 23c0 17.4 21 43 21 43s21-25.6 21-43C48 11.4 38.6 2 27 2z"
        fill="${cfg.fill}" stroke="${cfg.stroke}" stroke-width="1.8"/>
      <!-- Inner circle -->
      <circle cx="27" cy="23" r="12" fill="#060c0a" opacity="0.85"/>
      <!-- Emoji icon -->
      <text x="27" y="28" text-anchor="middle" font-size="14">${cfg.badge}</text>
      ${battBadge}
      ${tier !== "info" ? `
      <!-- Urgency ring -->
      <circle cx="44" cy="10" r="8" fill="${cfg.fill}" stroke="#060c0a" stroke-width="1.5"/>
      <text x="44" y="14" text-anchor="middle" font-size="7" fill="#fff" font-weight="900" font-family="sans-serif">${tier === "critical" ? "!" : "GO"}</text>
      ` : ""}
    </svg>`
  );
}

function buildInfoWindowContent(s: ChargingStation): string {
  const tier = getPinTier(s);
  const tierCfg = {
    critical: { color: "#f87171", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",  label: "🛑 MUST STOP — Battery Critical" },
    needed:   { color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", label: "⚡ RECOMMENDED STOP"              },
    info:     { color: "#60a5fa", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", label: "📍 Nearby Charger"               },
  }[tier];

  return `
    <div style="
      background:#0d1710;color:#f0faf2;padding:14px 16px;border-radius:12px;
      border:1px solid ${tierCfg.border};font-family:sans-serif;min-width:220px;max-width:270px;
    ">
      <!-- Tier banner -->
      <div style="
        background:${tierCfg.bg};color:${tierCfg.color};
        border:1px solid ${tierCfg.border};border-radius:8px;
        padding:4px 10px;font-size:10px;font-family:monospace;
        text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;
        font-weight:700;
      ">${tierCfg.label}</div>

      <!-- Station name -->
      <div style="font-weight:700;font-size:13px;margin-bottom:4px;color:#f0faf2;">
        ${s.fastCharge ? "⚡" : "🔌"} ${s.name}
      </div>

      ${s.address ? `<div style="font-size:11px;color:#4d7a5c;margin-bottom:10px;line-height:1.4;">${s.address}</div>` : ""}

      <!-- Battery at this point -->
      ${s.batteryAtPoint !== undefined ? `
      <div style="
        background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);
        border-radius:8px;padding:8px 10px;margin-bottom:10px;
        display:flex;align-items:center;gap:8px;
      ">
        <span style="font-size:16px;">🔋</span>
        <div>
          <div style="font-size:11px;color:#4d7a5c;text-transform:uppercase;letter-spacing:0.06em;font-family:monospace;">Est. battery on arrival</div>
          <div style="font-size:16px;font-weight:800;color:${s.batteryAtPoint > 20 ? "#4ade80" : s.batteryAtPoint > 10 ? "#fbbf24" : "#f87171"};">
            ${s.batteryAtPoint.toFixed(1)}%
          </div>
        </div>
      </div>` : ""}

      <!-- Tags -->
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <span style="background:rgba(59,130,246,0.12);color:#60a5fa;border:1px solid rgba(59,130,246,0.25);padding:2px 8px;border-radius:10px;font-size:11px;">
          🔌 ${s.connectors} port${s.connectors !== 1 ? "s" : ""}
        </span>
        ${s.fastCharge ? `<span style="background:rgba(245,158,11,0.12);color:#fbbf24;border:1px solid rgba(245,158,11,0.25);padding:2px 8px;border-radius:10px;font-size:11px;">⚡ Fast DC</span>` : ""}
        ${s.powerKw ? `<span style="background:rgba(34,197,94,0.08);color:#4ade80;border:1px solid rgba(34,197,94,0.2);padding:2px 8px;border-radius:10px;font-size:11px;">${s.powerKw}kW</span>` : ""}
        ${s.network ? `<span style="background:rgba(139,92,246,0.08);color:#a78bfa;border:1px solid rgba(139,92,246,0.2);padding:2px 8px;border-radius:10px;font-size:11px;">${s.network}</span>` : ""}
      </div>
    </div>`;
}

declare global { interface Window { google: typeof google } }

export default function RouteMap({
  origin, destination, chargingStations = [],
  batteryPercent = 80, remainingBattery = 50,
}: Props) {
  const mapDivRef  = useRef<HTMLDivElement>(null);
  const mapRef     = useRef<google.maps.Map | null>(null);
  const polyRefs   = useRef<google.maps.Polyline[]>([]);
  const markerRefs = useRef<google.maps.Marker[]>([]);
  const iwRefs     = useRef<google.maps.InfoWindow[]>([]);
  const animRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [sdkReady,  setSdkReady]  = useState(false);

  /* Load SDK */
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey) { setError("Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to .env.local"); setLoading(false); return; }
    if (window.google?.maps) { setSdkReady(true); return; }
    if (document.getElementById("gm-sdk")) {
      const t = setInterval(() => { if (window.google?.maps) { clearInterval(t); setSdkReady(true); } }, 80);
      return () => clearInterval(t);
    }
    const cb = "__gmReady_" + Math.random().toString(36).slice(2);
    (window as any)[cb] = () => { setSdkReady(true); delete (window as any)[cb]; };
    const s = document.createElement("script");
    s.id = "gm-sdk"; s.async = true; s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&loading=async&callback=${cb}`;
    s.onerror = () => { setError("Failed to load Google Maps SDK."); setLoading(false); };
    document.head.appendChild(s);
  }, []);

  /* Init map */
  useEffect(() => {
    if (!sdkReady || !mapDivRef.current || mapRef.current) return;
    mapRef.current = new window.google.maps.Map(mapDivRef.current, {
      center: { lat: (origin.lat + destination.lat) / 2, lng: (origin.lon + destination.lon) / 2 },
      zoom: 9,
      styles: DARK_STYLE as google.maps.MapTypeStyle[],
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: { position: window.google.maps.ControlPosition.RIGHT_CENTER },
      gestureHandling: "cooperative",
    });
  }, [sdkReady, origin, destination]);

  /* Fetch route */
  const fetchRoute = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const r = await fetch(`/api/google-route?originLat=${origin.lat}&originLng=${origin.lon}&destLat=${destination.lat}&destLng=${destination.lon}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Route failed");
      setRouteData(d);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [origin, destination]);

  useEffect(() => { if (sdkReady) fetchRoute(); }, [sdkReady, fetchRoute]);

  /* Draw everything */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !routeData || !window.google?.maps) return;

    // Clear old overlays
    polyRefs.current.forEach(p => p.setMap(null)); polyRefs.current = [];
    markerRefs.current.forEach(m => m.setMap(null)); markerRefs.current = [];
    iwRefs.current.forEach(iw => iw.close()); iwRefs.current = [];
    if (animRef.current) clearInterval(animRef.current);

    const path = decodePolyline(routeData.encodedPolyline);

    // ── Route polylines ────────────────────────────────────────────────────
    const glow = new window.google.maps.Polyline({ path, map, strokeColor: "#22c55e", strokeOpacity: 0.15, strokeWeight: 20 });
    const main = new window.google.maps.Polyline({
      path, map, strokeColor: "#22c55e", strokeOpacity: 0.95, strokeWeight: 5,
      icons: [{ icon: { path: window.google.maps.SymbolPath.FORWARD_OPEN_ARROW, scale: 3, strokeColor: "#22c55e", strokeWeight: 2 }, repeat: "110px" }],
    });
    const dot = new window.google.maps.Polyline({
      path, map, strokeOpacity: 0,
      icons: [{ icon: { path: window.google.maps.SymbolPath.CIRCLE, scale: 6, fillColor: "#4ade80", fillOpacity: 1, strokeColor: "#22c55e", strokeWeight: 2 }, offset: "0%" }],
    });
    polyRefs.current = [glow, main, dot];
    let offset = 0;
    animRef.current = setInterval(() => {
      offset = (offset + 0.35) % 100;
      const icons = dot.get("icons"); icons[0].offset = offset + "%"; dot.set("icons", icons);
    }, 40);

    // ── Origin & destination pins ──────────────────────────────────────────
    const pinSvg = (emoji: string, bg: string, shadow: string) =>
      "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
        `<svg width="54" height="66" viewBox="0 0 54 66" xmlns="http://www.w3.org/2000/svg">
          <defs><filter id="f"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${shadow}" flood-opacity="0.55"/></filter></defs>
          <path filter="url(#f)" d="M27 3C15.4 3 6 12.4 6 24c0 17.4 21 39 21 39s21-21.6 21-39C48 12.4 38.6 3 27 3z" fill="${bg}"/>
          <circle cx="27" cy="24" r="11" fill="#060c0a"/>
          <text x="27" y="29.5" text-anchor="middle" font-size="14">${emoji}</text>
        </svg>`);

    markerRefs.current.push(
      new window.google.maps.Marker({ position: { lat: origin.lat, lng: origin.lon }, map, zIndex: 20,
        icon: { url: pinSvg("🚗","#22c55e","#22c55e"), scaledSize: new window.google.maps.Size(54,66), anchor: new window.google.maps.Point(27,64) } }),
      new window.google.maps.Marker({ position: { lat: destination.lat, lng: destination.lon }, map, zIndex: 20,
        icon: { url: pinSvg("🏁","#f97316","#f97316"), scaledSize: new window.google.maps.Size(54,66), anchor: new window.google.maps.Point(27,64) } }),
    );

    // ── Charging station pins — ALL of them, colour-coded by tier ─────────
    // z-order: critical (15) > needed (12) > info (8)
    chargingStations.forEach((s, idx) => {
      const tier    = getPinTier(s);
      const zIndex  = tier === "critical" ? 15 : tier === "needed" ? 12 : 8;
      const svgUrl  = buildChargingPinSvg(s, idx);

      const mk = new window.google.maps.Marker({
        position: { lat: s.lat, lng: s.lon },
        map,
        zIndex,
        title: s.name,
        icon: {
          url: svgUrl,
          scaledSize: new window.google.maps.Size(54, 68),
          anchor: new window.google.maps.Point(27, 66),
        },
      });

      const iw = new window.google.maps.InfoWindow({ content: buildInfoWindowContent(s) });
      mk.addListener("click", () => {
        iwRefs.current.forEach(w => w.close());
        iw.open({ map, anchor: mk });
      });

      markerRefs.current.push(mk);
      iwRefs.current.push(iw);
    });

    // ── Fit bounds: route + all station pins ──────────────────────────────
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach(p => bounds.extend(p));
    chargingStations.forEach(s => bounds.extend({ lat: s.lat, lng: s.lon }));
    map.fitBounds(bounds, { top: 80, bottom: 80, left: 60, right: 60 });

    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [routeData, sdkReady, origin, destination, chargingStations]);

  const willReach  = remainingBattery > 5;
  const originCity = origin.display_name.split(",")[0];
  const destCity   = destination.display_name.split(",")[0];

  const criticalCount = chargingStations.filter(s => s.isCritical).length;
  const neededCount   = chargingStations.filter(s => s.isNeeded && !s.isCritical).length;
  const infoCount     = chargingStations.filter(s => !s.isNeeded).length;

  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ height: 500, border: "1px solid rgba(34,197,94,0.14)", boxShadow: "0 32px 100px rgba(0,0,0,0.65)", background: "#060c0a" }}>
      <div ref={mapDivRef} className="w-full h-full" />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
          style={{ background: "rgba(6,12,10,0.88)", backdropFilter: "blur(8px)" }}>
          <div className="w-10 h-10 rounded-full border-2 border-green-500/15 border-t-green-500 animate-spin" />
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>Fetching route…</span>
        </div>
      )}

      {/* Error overlay */}
      {error && !loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 px-6"
          style={{ background: "rgba(6,12,10,0.9)", backdropFilter: "blur(8px)" }}>
          <div className="text-center max-w-sm">
            <div className="font-syne font-bold text-lg text-red-400 mb-2">⚠️ Map Error</div>
            <div className="font-mono text-xs mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>{error}</div>
            <button onClick={fetchRoute} className="px-5 py-2 rounded-xl font-mono text-xs text-green-400 cursor-pointer"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Top bar */}
      {!loading && !error && (
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-2 flex-1 min-w-0 rounded-full px-4 py-2"
            style={{ background: "rgba(6,12,10,0.9)", backdropFilter: "blur(14px)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <span className="font-syne font-bold text-sm text-green-400 truncate">{originCity}</span>
            <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>→</span>
            <span className="font-syne font-bold text-sm text-orange-400 truncate">{destCity}</span>
          </div>
          {routeData && (
            <div className="flex gap-2 flex-shrink-0">
              {[{ icon: "📍", text: routeData.distanceText }, { icon: "⏱", text: routeData.durationText }].map(c => (
                <div key={c.text} className="flex items-center gap-1.5 rounded-full px-3 py-2"
                  style={{ background: "rgba(6,12,10,0.9)", backdropFilter: "blur(14px)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <span className="text-xs">{c.icon}</span>
                  <span className="font-mono text-xs whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>{c.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Battery arcs */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-2xl px-3 py-2"
        style={{ background: "rgba(6,12,10,0.9)", backdropFilter: "blur(14px)", border: "1px solid rgba(34,197,94,0.15)" }}>
        <BatArc pct={batteryPercent} label="Start" color="#60a5fa" />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>→</span>
        <BatArc pct={Math.max(0, remainingBattery)} label="Arrive" color={willReach ? "#4ade80" : "#f87171"} />
      </div>

      {/* Legend bar — shows pin colour key */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2 flex-wrap"
          style={{ background: "rgba(6,12,10,0.92)", backdropFilter: "blur(14px)", border: "1px solid rgba(34,197,94,0.15)" }}>
          {/* Route */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-green-500" />
            <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Route</span>
          </div>
          <span style={{ color: "var(--text-muted)", fontSize: 10 }}>·</span>
          <span className="text-xs">🚗</span><span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>Start</span>
          <span className="text-xs">🏁</span><span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>End</span>

          {chargingStations.length > 0 && (
            <>
              <div className="w-px h-3" style={{ background: "var(--border)" }} />
              {/* Critical */}
              {criticalCount > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="font-mono text-[10px] font-bold" style={{ color: "#f87171" }}>
                    {criticalCount} Must Stop
                  </span>
                </div>
              )}
              {/* Needed */}
              {neededCount > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="font-mono text-[10px] font-bold" style={{ color: "#fbbf24" }}>
                    {neededCount} Recommended
                  </span>
                </div>
              )}
              {/* Info */}
              {infoCount > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="font-mono text-[10px]" style={{ color: "#60a5fa" }}>
                    {infoCount} Nearby
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {routeData && routeData.steps.length > 0 && (
          <button onClick={() => setShowSteps(v => !v)}
            className="rounded-xl px-4 py-2 font-mono text-xs text-green-400 cursor-pointer flex-shrink-0"
            style={{ background: "rgba(6,12,10,0.9)", backdropFilter: "blur(14px)", border: "1px solid rgba(34,197,94,0.2)" }}>
            {showSteps ? "Hide ▲" : "Directions ▼"}
          </button>
        )}
      </div>

      {/* Turn-by-turn drawer */}
      {showSteps && routeData && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col max-h-[52%]"
          style={{ background: "rgba(8,15,10,0.97)", backdropFilter: "blur(18px)", borderTop: "1px solid rgba(34,197,94,0.15)" }}>
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(34,197,94,0.1)" }}>
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Turn-by-Turn</span>
            <button onClick={() => setShowSteps(false)} className="font-mono text-xs cursor-pointer" style={{ color: "var(--text-muted)", background: "none", border: "none" }}>✕</button>
          </div>
          <div className="overflow-y-auto">
            {routeData.steps.map((s, i) => (
              <div key={i} className="flex gap-3 items-start px-4 py-3" style={{ borderBottom: "1px solid rgba(34,197,94,0.06)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm text-green-400 font-mono mt-0.5"
                  style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  {arrowIcon(s.maneuver)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-syne font-semibold text-xs leading-snug" style={{ color: "#c8e6d0" }}>{s.instruction}</div>
                  <div className="font-mono text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{s.distanceText} · {s.durationText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BatArc({ pct, label, color }: { pct: number; label: string; color: string }) {
  const r = 17, circ = 2 * Math.PI * r, fill = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative w-10 h-10">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="3.5" />
          <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="3.5"
            strokeDasharray={`${fill} ${circ}`} strokeDashoffset={circ * 0.25}
            strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-syne font-extrabold text-[11px]" style={{ color }}>{pct.toFixed(0)}%</span>
        </div>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}