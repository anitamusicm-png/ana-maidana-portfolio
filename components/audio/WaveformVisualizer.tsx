"use client";

interface WaveformVisualizerProps {
  seed: string;
  active: boolean;
  barCount?: number;
}

function seededPeaks(seed: string, count: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const peaks: number[] = [];
  for (let i = 0; i < count; i++) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    peaks.push(0.15 + (hash % 100) / 100);
  }
  return peaks;
}

export function WaveformVisualizer({ seed, active, barCount = 48 }: WaveformVisualizerProps) {
  const peaks = seededPeaks(seed, barCount);

  return (
    <div className="flex items-center gap-[2px] h-8 w-full" aria-hidden="true">
      {peaks.map((peak, i) => (
        <span
          key={i}
          className={`flex-1 rounded-full transition-colors duration-300 ${
            active ? "bg-cobalt" : "bg-current/30"
          }`}
          style={{
            height: `${peak * 100}%`,
            animation: active ? `waveform-pulse 900ms ease-in-out ${i * 25}ms infinite` : "none",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes waveform-pulse {
          0%,
          100% {
            transform: scaleY(0.6);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}
