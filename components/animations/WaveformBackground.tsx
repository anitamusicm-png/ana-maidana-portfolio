"use client";

const WIDTH = 1200;
const HEIGHT = 200;

interface WaveConfig {
  cycles: number;
  amplitude: number;
  phase: number;
  strokeWidth: number;
  color: string;
  duration: number;
  direction: 1 | -1;
  colorDuration: number;
  colorDelay: number;
  baseOpacity: number;
  flashOpacity: number;
}

// Deterministic pseudo-random so server/client render match (no hydration mismatch).
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildSinePath(cycles: number, amplitude: number, phase: number) {
  const segments = 160;
  const mid = HEIGHT / 2;
  const points: string[] = [];
  for (let i = 0; i <= segments; i++) {
    const x = (WIDTH * i) / segments;
    const angle = (i / segments) * cycles * Math.PI * 2 + phase;
    const y = mid + Math.sin(angle) * amplitude;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(" ");
}

// Accent glimpses stay within the palette: cobalt, burnt-amber, gold-ochre, mid-blue, deep-sage.
const ACCENTS = [
  "var(--color-cobalt)",
  "var(--color-burnt-amber)",
  "var(--color-gold-ochre)",
  "var(--color-mid-blue)",
  "var(--color-deep-sage)",
];

function makeWaves(seed: number, count: number): WaveConfig[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    cycles: 2 + Math.floor(rand() * 4), // 2-5 full periods -> seamless tiling
    amplitude: 12 + rand() * 46,
    phase: rand() * Math.PI * 2,
    strokeWidth: 1 + rand() * 1.5,
    color: i === 0 ? "var(--color-charcoal)" : ACCENTS[Math.floor(rand() * ACCENTS.length)],
    duration: 22 + rand() * 26,
    direction: rand() > 0.5 ? 1 : -1,
    colorDuration: 4 + rand() * 6,
    colorDelay: rand() * 6,
    baseOpacity: i === 0 ? 0.07 : 0.03 + rand() * 0.03,
    flashOpacity: i === 0 ? 0.12 : 0.16 + rand() * 0.14,
  }));
}

const WAVES = makeWaves(7, 5);

export function WaveformBackground() {
  return (
    <div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-56 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {WAVES.map((wave, i) => {
        const d = buildSinePath(wave.cycles, wave.amplitude, wave.phase);
        return (
          <div
            key={i}
            className="wave-track absolute inset-0"
            style={{
              animationDuration: `${wave.duration}s`,
              animationDirection: wave.direction === 1 ? "normal" : "reverse",
            }}
          >
            <svg
              viewBox={`0 0 ${WIDTH * 2} ${HEIGHT}`}
              className="h-full block"
              style={{ width: "200%" }}
              preserveAspectRatio="none"
            >
              <g
                className="wave-flash"
                style={{
                  color: wave.color,
                  animationDuration: `${wave.colorDuration}s`,
                  animationDelay: `${wave.colorDelay}s`,
                  ["--base-opacity" as string]: wave.baseOpacity,
                  ["--flash-opacity" as string]: wave.flashOpacity,
                }}
              >
                <path d={d} fill="none" stroke="currentColor" strokeWidth={wave.strokeWidth} />
                <path
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={wave.strokeWidth}
                  transform={`translate(${WIDTH}, 0)`}
                />
              </g>
            </svg>
          </div>
        );
      })}

      <style jsx>{`
        .wave-track {
          animation-name: wave-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          width: 200%;
        }

        @keyframes wave-drift {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .wave-flash {
          animation-name: wave-flash;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: var(--base-opacity);
        }

        @keyframes wave-flash {
          0%,
          100% {
            opacity: var(--base-opacity);
          }
          50% {
            opacity: var(--flash-opacity);
          }
        }
      `}</style>
    </div>
  );
}
