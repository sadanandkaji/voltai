// app/components/landing/RouteShowcase.tsx
"use client";

import { motion, type Variants, type Easing } from "framer-motion";

type Charger = {
  id: string;
  label: string;
};

const CHARGERS: Charger[] = [
  { id: "c1", label: "Supercharger · 6 stalls" },
  { id: "c2", label: "Level 3 · 4 stalls" },
  { id: "c3", label: "Supercharger · 8 stalls" },
];

const EASE_OUT: Easing = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const pin: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

// entrance animation for the pin glyph itself (kept separate from the
// static positional/rotation transform on its wrapping <g>, since
// framer-motion owns the "transform" attribute on elements it animates)
const pinGlyph: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

const PIN_SCALE = 0.62;

type Point = { x: number; y: number };

function segmentLengths(points: Point[]) {
  const lens: number[] = [];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    lens.push(Math.sqrt(dx * dx + dy * dy));
  }
  return lens;
}

// proportional keyframe times (0..1) so the car moves at roughly constant
// speed across unevenly-sized zigzag segments
function polylineTimes(points: Point[]) {
  const lens = segmentLengths(points);
  const total = lens.reduce((a, b) => a + b, 0);
  const times = [0];
  let acc = 0;
  for (const l of lens) {
    acc += l;
    times.push(acc / total);
  }
  return times;
}

// heading (degrees) of each segment, so the car can bank through turns
function segmentAngles(points: Point[]) {
  const angles: number[] = [];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    angles.push((Math.atan2(dy, dx) * 180) / Math.PI);
  }
  return angles;
}

// Map-pin marker: tip at local (0,0), rounded head above it. `angle`
// rotates the whole glyph (0 = head points up, 90 = right, 180 = down,
// 270 = left) so it can branch off a route running in any direction.
function ChargerPin({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${PIN_SCALE})`}>
      <motion.g variants={pinGlyph}>
        <path
          d="M0,0 C-10,-14 -14,-20 -14,-28 A14,14 0 1 1 14,-28 C14,-20 10,-14 0,0 Z"
          fill="var(--green)"
          stroke="#04140a"
          strokeWidth={1.6}
        />
        <circle cx="0" cy="-28" r="8.5" fill="#04140a" />
        <path
          d="M1.8 -35 L-3.2 -26.8 L-0.4 -26.8 L-1.8 -21 L3.2 -29.2 L0.4 -29.2 Z"
          fill="var(--green)"
        />
      </motion.g>
    </g>
  );
}

// Simple side-profile car, drawn with the road at local y = 0 (wheel
// bottoms rest on it) and the body rising in -y, facing +x by default.
// Simple top-down car icon: nose points along +x by default (matches the
// existing rotation logic in DesktopScene/MobileScene, which assumes
// angle 0 = facing +x). Body centered at local origin so rotation looks
// natural mid-turn instead of pivoting around a wheel.
function CarMarker() {
  return (
    <g>
      {/* soft ground shadow */}
      <ellipse cx="0" cy="0" rx="22" ry="11" fill="#000" opacity="0.16" />

      {/* body */}
      <rect
        x="-21" y="-9" width="42" height="18" rx="6.5"
        fill="var(--green)"
        stroke="#04140a"
        strokeWidth={1.2}
      />

      {/* windshield (front) */}
      <rect x="5" y="-6.5" width="9" height="13" rx="2.2" fill="#04140a" opacity="0.85" />
      {/* rear window */}
      <rect x="-15" y="-6" width="7" height="12" rx="2" fill="#04140a" opacity="0.55" />
      {/* roof */}
      <rect x="-6.5" y="-5.5" width="11.5" height="11" rx="2.4" fill="#04140a" opacity="0.22" />

      {/* headlights */}
      <circle cx="20.5" cy="-5" r="1.4" fill="#fff" opacity="0.95" />
      <circle cx="20.5" cy="5" r="1.4" fill="#fff" opacity="0.95" />
      {/* taillights */}
      <circle cx="-20.5" cy="-5" r="1.1" fill="#f87171" opacity="0.9" />
      <circle cx="-20.5" cy="5" r="1.1" fill="#f87171" opacity="0.9" />

      {/* wheels */}
      <rect x="-14.5" y="-11.5" width="7" height="3" rx="1.3" fill="#04140a" />
      <rect x="-14.5" y="8.5" width="7" height="3" rx="1.3" fill="#04140a" />
      <rect x="7.5" y="-11.5" width="7" height="3" rx="1.3" fill="#04140a" />
      <rect x="7.5" y="8.5" width="7" height="3" rx="1.3" fill="#04140a" />
    </g>
  );
}

// ---------- Desktop: straight horizontal route ----------

const DESKTOP_W = 640;
const DESKTOP_H = 160;
const DESKTOP_ROUTE_Y = DESKTOP_H / 2;
const DESKTOP_CHARGERS = [
  { x: 18, y: -22 },
  { x: 46, y: 20 },
  { x: 74, y: -18 },
];

function DesktopScene() {
  return (
    <svg viewBox={`0 0 ${DESKTOP_W} ${DESKTOP_H}`} width="100%" height="auto" style={styles.svg}>
      <line
        x1={0}
        y1={DESKTOP_ROUTE_Y}
        x2={DESKTOP_W}
        y2={DESKTOP_ROUTE_Y}
        stroke="var(--border)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <motion.line
        x1={0}
        y1={DESKTOP_ROUTE_Y}
        x2={DESKTOP_W}
        y2={DESKTOP_ROUTE_Y}
        stroke="var(--green)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.1 }}
      />

      <circle cx={0} cy={DESKTOP_ROUTE_Y} r={7} fill="var(--green)" />
      <circle cx={DESKTOP_W} cy={DESKTOP_ROUTE_Y} r={7} fill="var(--surface)" stroke="var(--green)" strokeWidth={2.5} />

      {DESKTOP_CHARGERS.map((c, i) => {
        const cx = (c.x / 100) * DESKTOP_W;
        const cy = DESKTOP_ROUTE_Y + c.y;
        const isBelow = c.y > 0;
        return (
          <g key={i}>
            <motion.line x1={cx} y1={DESKTOP_ROUTE_Y} x2={cx} y2={cy} stroke="var(--border)" strokeWidth={1.5} variants={pin} />
            <ChargerPin x={cx} y={cy} angle={isBelow ? 180 : 0} />
          </g>
        );
      })}

      <motion.g
        initial={{ x: 0, y: DESKTOP_ROUTE_Y }}
        animate={{ x: DESKTOP_W, y: DESKTOP_ROUTE_Y }}
        transition={{ duration: 5.5, ease: "linear", repeat: Infinity, repeatDelay: 0.8 }}
      >
        <CarMarker />
      </motion.g>
    </svg>
  );
}

// ---------- Mobile: vertical zigzag route, wide-to-zoom intro ----------

// ---------- Mobile: vertical zigzag route, wide-to-zoom intro ----------

const MOBILE_W = 300;
const MOBILE_H = 560;
const MOBILE_POINTS: Point[] = [
  { x: 150, y: 20 },
  { x: 86, y: 150 },
  { x: 214, y: 290 },
  { x: 86, y: 430 },
  { x: 150, y: 540 },
];
const MOBILE_PATH_D = MOBILE_POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
const MOBILE_TIMES = polylineTimes(MOBILE_POINTS);
const MOBILE_SEG_ANGLES = segmentAngles(MOBILE_POINTS);

// Instant rotation: hold segment angle during travel, snap at vertices
const MOBILE_ROTATE_TIMES: number[] = [];
const MOBILE_ROTATE_VALUES: number[] = [];

for (let i = 0; i < MOBILE_POINTS.length; i++) {
  const t = MOBILE_TIMES[i];
  const angle =
    i < MOBILE_SEG_ANGLES.length
      ? MOBILE_SEG_ANGLES[i]
      : MOBILE_SEG_ANGLES[MOBILE_SEG_ANGLES.length - 1];

  if (i > 0) {
    // Hold previous angle until just before this point
    MOBILE_ROTATE_TIMES.push(t - 0.0001);
    MOBILE_ROTATE_VALUES.push(MOBILE_SEG_ANGLES[i - 1]);
  }

  MOBILE_ROTATE_TIMES.push(t);
  MOBILE_ROTATE_VALUES.push(angle);
}

// interior vertices branch a stub + pin out to whichever side they sit on
const MOBILE_CHARGERS = [
  { anchor: MOBILE_POINTS[1], side: "left" as const },
  { anchor: MOBILE_POINTS[2], side: "right" as const },
  { anchor: MOBILE_POINTS[3], side: "left" as const },
];
const STUB_LEN = 34;

const zoomIn: Variants = {
  hidden: { scale: 0.78 },
  show: { scale: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};

function MobileScene() {
  return (
    <svg viewBox={`0 0 ${MOBILE_W} ${MOBILE_H}`} width="100%" height="auto" style={styles.svg}>
      <motion.g variants={zoomIn} style={{ transformOrigin: `${MOBILE_W / 2}px ${MOBILE_H / 2}px` }}>
        <path
          d={MOBILE_PATH_D}
          fill="none"
          stroke="var(--border)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d={MOBILE_PATH_D}
          fill="none"
          stroke="var(--green)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: EASE_OUT, delay: 0.15 }}
        />

        <circle cx={MOBILE_POINTS[0].x} cy={MOBILE_POINTS[0].y} r={7} fill="var(--green)" />
        <circle
          cx={MOBILE_POINTS[MOBILE_POINTS.length - 1].x}
          cy={MOBILE_POINTS[MOBILE_POINTS.length - 1].y}
          r={7}
          fill="var(--surface)"
          stroke="var(--green)"
          strokeWidth={2.5}
        />

        {MOBILE_CHARGERS.map((c, i) => {
          const dir = c.side === "left" ? -1 : 1;
          const px = c.anchor.x + dir * STUB_LEN;
          return (
            <g key={i}>
              <motion.line
                x1={c.anchor.x}
                y1={c.anchor.y}
                x2={px}
                y2={c.anchor.y}
                stroke="var(--border)"
                strokeWidth={1.5}
                variants={pin}
              />
              <ChargerPin x={px} y={c.anchor.y} angle={c.side === "left" ? 270 : 90} />
            </g>
          );
        })}

        <motion.g
          initial={{ x: MOBILE_POINTS[0].x, y: MOBILE_POINTS[0].y, rotate: MOBILE_ROTATE_VALUES[0] }}
          animate={{
            x: MOBILE_POINTS.map((p) => p.x),
            y: MOBILE_POINTS.map((p) => p.y),
            rotate: MOBILE_ROTATE_VALUES,
          }}
          transition={{
            duration: 6.5,
            ease: "linear",
            times: MOBILE_TIMES,
            repeat: Infinity,
            repeatDelay: 0.8,
            rotate: {
              duration: 6.5,
              times: MOBILE_ROTATE_TIMES,
              ease: "linear",
              // A per-property transition override REPLACES the whole
              // transition for that property rather than merging with the
              // parent — repeat/repeatDelay were only set on the outer
              // object, so rotate played once and then froze while x/y
              // kept looping forever. That's why the car pointed the wrong
              // way (stuck on the last segment's heading) on every loop
              // after the first. Needs its own repeat settings too.
              repeat: Infinity,
              repeatDelay: 0.8,
            },
          }}
        >
          <CarMarker />
        </motion.g>
      </motion.g>
    </svg>
  );
}

// ---------- Shared shell ----------
// Both scenes render; a pure-CSS media query (same pattern as the nav's
// hamburger/desktop-actions toggle in page.tsx) decides which is visible.
// This avoids any JS matchMedia timing/hydration race that could leave
// the desktop (horizontal) scene showing on a mobile viewport.

export default function RouteShowcase() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.routeLabel}>San Francisco → Los Angeles</span>
          <span style={styles.rangeBadge}>62% battery at arrival</span>
        </div>

        <div className="voltiq-route-desktop">
          <DesktopScene />
        </div>
        <div className="voltiq-route-mobile" style={styles.mobileFrame}>
          <MobileScene />
        </div>

        <motion.div variants={container} style={styles.chargerList}>
          {CHARGERS.map((c) => (
            <motion.div key={c.id} variants={pin} style={styles.chargerChip}>
              <span style={styles.chargerDot} />
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .voltiq-route-mobile { display: none; }
        @media (max-width: 720px) {
          .voltiq-route-desktop { display: none !important; }
          .voltiq-route-mobile { display: block !important; }
        }
      `}</style>
    </motion.div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    width: "100%",
    maxWidth: 640,
  },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 18,
    padding: "20px 20px 18px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  routeLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--text)",
  },
  rangeBadge: {
    fontSize: 11.5,
    fontWeight: 700,
    color: "var(--green)",
    background: "var(--green-dim)",
    border: "1px solid var(--green-border)",
    borderRadius: 20,
    padding: "3px 10px",
  },
  svg: {
    display: "block",
    overflow: "visible",
  },
  mobileFrame: {
    maxWidth: 260,
    margin: "0 auto",
  },
  chargerList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  chargerChip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11.5,
    color: "var(--text2)",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "5px 10px",
  },
  chargerDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--green)",
    flexShrink: 0,
  },
};