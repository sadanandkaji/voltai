// app/components/landing/RouteShowcase.tsx
"use client";

import { motion, type Variants, type Easing } from "framer-motion";

type Charger = {
  id: string;
  x: number; // 0–100, position along the route (%)
  y: number; // px offset from the route line (+/- wobble)
  label: string;
};

const CHARGERS: Charger[] = [
  { id: "c1", x: 18, y: -22, label: "Supercharger · 6 stalls" },
  { id: "c2", x: 46, y: 20, label: "Level 3 · 4 stalls" },
  { id: "c3", x: 74, y: -18, label: "Supercharger · 8 stalls" },
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
// static positional/flip transform on its wrapping <g>, since framer-motion
// owns the "transform" attribute on motion elements it animates)
const pinGlyph: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

const SVG_WIDTH = 640;
const SVG_HEIGHT = 160;
const ROUTE_Y = SVG_HEIGHT / 2;
const PIN_SCALE = 0.62;

function chargerPoint(x: number, y: number) {
  return {
    cx: (x / 100) * SVG_WIDTH,
    cy: ROUTE_Y + y,
  };
}

// Map-pin marker, drawn tip-first at local (0,0) with the rounded head
// above it. The wrapping <g> flips it vertically when the charger sits
// below the route line, so the tip always touches the stub line's end
// and the head always points away from the road.
function ChargerPin({ x, y }: { x: number; y: number }) {
  const isBelow = y > ROUTE_Y;
  const flip = isBelow ? -PIN_SCALE : PIN_SCALE;

  return (
    <g transform={`translate(${x} ${y}) scale(${PIN_SCALE} ${flip})`}>
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
// bottoms rest on it) and the body rising in -y. Headlight sits on the
// right so it reads as driving in the direction of travel.
function CarMarker() {
  return (
    <g>
      <ellipse cx="0" cy="0.5" rx="19" ry="2" fill="#000" opacity="0.16" />
      <path
        d="M-20 -8 C-20 -13 -17 -14 -14 -15 L-11 -21 C-10 -23 -8 -24 -5 -24 L7 -24 C10 -24 12 -23 13 -21 L16 -15 C19 -14 20 -13 20 -8 L20 -7 C20 -5.5 19 -5 17.5 -5 L-17.5 -5 C-19 -5 -20 -5.5 -20 -7 Z"
        fill="var(--green)"
        stroke="#04140a"
        strokeWidth={1}
      />
      <path
        d="M-9 -21 C-8.5 -22.5 -7.5 -23 -5 -23 L6 -23 C8 -23 9.5 -22 10.5 -20.3 L12 -16 L-11 -16 Z"
        fill="#04140a"
        opacity={0.9}
      />
      <line x1="0" y1="-23" x2="0" y2="-16" stroke="var(--green)" strokeWidth={0.8} opacity={0.5} />
      <circle cx="18.5" cy="-10" r="1.6" fill="#fff" opacity={0.9} />
      <circle cx="-11" cy="-4.5" r="4.5" fill="#04140a" stroke="var(--green)" strokeWidth={1.4} />
      <circle cx="11" cy="-4.5" r="4.5" fill="#04140a" stroke="var(--green)" strokeWidth={1.4} />
      <circle cx="-11" cy="-4.5" r="1.6" fill="var(--green)" />
      <circle cx="11" cy="-4.5" r="1.6" fill="var(--green)" />
    </g>
  );
}

export default function RouteShowcase() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={styles.wrap}
    >
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.routeLabel}>San Francisco → Los Angeles</span>
          <span style={styles.rangeBadge}>62% battery at arrival</span>
        </div>

        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width="100%"
          height="auto"
          style={styles.svg}
        >
          {/* base route line */}
          <line
            x1={0}
            y1={ROUTE_Y}
            x2={SVG_WIDTH}
            y2={ROUTE_Y}
            stroke="var(--border)"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* animated draw-on route line */}
          <motion.line
            x1={0}
            y1={ROUTE_Y}
            x2={SVG_WIDTH}
            y2={ROUTE_Y}
            stroke="var(--green)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="0 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.1 }}
          />

          {/* start marker */}
          <circle cx={0} cy={ROUTE_Y} r={7} fill="var(--green)" />
          {/* end marker */}
          <circle
            cx={SVG_WIDTH}
            cy={ROUTE_Y}
            r={7}
            fill="var(--surface)"
            stroke="var(--green)"
            strokeWidth={2.5}
          />

          {/* charger stub lines + pins */}
          {CHARGERS.map((c) => {
            const { cx, cy } = chargerPoint(c.x, c.y);
            return (
              <g key={c.id}>
                <motion.line
                  x1={cx}
                  y1={ROUTE_Y}
                  x2={cx}
                  y2={cy}
                  stroke="var(--border)"
                  strokeWidth={1.5}
                  variants={pin}
                />
                <ChargerPin x={cx} y={cy} />
              </g>
            );
          })}

          {/* moving vehicle marker */}
          <motion.g
            initial={{ x: 0, y: ROUTE_Y }}
            animate={{ x: SVG_WIDTH, y: ROUTE_Y }}
            transition={{
              duration: 5.5,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          >
            <CarMarker />
          </motion.g>
        </svg>

        <motion.div variants={container} style={styles.chargerList}>
          {CHARGERS.map((c) => (
            <motion.div key={c.id} variants={pin} style={styles.chargerChip}>
              <span style={styles.chargerDot} />
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
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