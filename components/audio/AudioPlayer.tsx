"use client";

import { useAudio } from "./AudioContext";
import { WaveformVisualizer } from "./WaveformVisualizer";

interface AudioPlayerProps {
  src?: string;
  label: string;
}

export function AudioPlayer({ src, label }: AudioPlayerProps) {
  const { isPlaying, toggle } = useAudio();

  if (!src) {
    return (
      <div className="flex items-center gap-3 opacity-50">
        <span className="font-mono text-xs uppercase tracking-wider">Preview soon</span>
        <WaveformVisualizer seed={label} active={false} />
      </div>
    );
  }

  const active = isPlaying(src);

  return (
    <button
      type="button"
      onClick={() => toggle(src)}
      aria-label={active ? `Pause ${label}` : `Play ${label}`}
      aria-pressed={active}
      className="flex items-center gap-3 w-full group"
    >
      <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full border border-current group-hover:bg-cobalt group-hover:text-off-white group-hover:border-cobalt transition-colors">
        {active ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <rect width="3" height="10" />
            <rect x="6" width="3" height="10" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M0 0 L10 5 L0 10 Z" />
          </svg>
        )}
      </span>
      <WaveformVisualizer seed={label} active={active} />
    </button>
  );
}
