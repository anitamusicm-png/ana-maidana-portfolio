"use client";

import type { MusicTrack } from "@/types";
import { useTranslations } from "next-intl";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface RecordPlayerProps {
  track: MusicTrack;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onVolumeChange: (v: number) => void;
  onSeek: (t: number) => void;
}

export function RecordPlayer({
  track,
  playing,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onPrev,
  onNext,
  onVolumeChange,
  onSeek,
}: RecordPlayerProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center w-[320px] shrink-0">
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
        {/* deck plate */}
        <div className="absolute inset-0 rounded-full bg-off-white border-[3px] border-charcoal shadow-[0_20px_40px_-15px_rgba(44,44,44,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]" />

        {/* vinyl disc, offset like a record resting on the deck — spins with the play button below */}
        <div
          className="record-disc absolute inset-[6%] rounded-full"
          style={{ animationPlayState: playing ? "running" : "paused" }}
        >
          <span className="record-sheen absolute inset-0 rounded-full" />
          <span className="absolute inset-[40%] rounded-full bg-cobalt shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]" />
          <span className="absolute inset-[47%] rounded-full bg-off-white/90" />
        </div>

        {/* tonearm */}
        <div
          className="absolute top-[5%] right-[1%] w-11 h-11 rounded-full bg-gradient-to-br from-charcoal to-charcoal/80 shadow-[0_3px_6px_rgba(0,0,0,0.35)] z-10"
          aria-hidden="true"
        />
        <div
          className="tonearm absolute top-[9%] right-[6%] w-[4px] h-[46%] bg-gradient-to-b from-charcoal to-charcoal/70 rounded-full origin-top z-10 shadow-[1px_0_2px_rgba(0,0,0,0.25)]"
          style={{ transform: playing ? "rotate(22deg)" : "rotate(-8deg)" }}
          aria-hidden="true"
        >
          <span className="absolute -bottom-1.5 -left-[7px] w-4 h-3 rounded-[3px] bg-charcoal shadow-sm" />
          <span className="absolute -bottom-1 -left-[4px] w-[10px] h-[6px] rounded-[2px] bg-cobalt" />
        </div>

        {/* volume slider */}
        <div className="absolute -right-14 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-2">
          <button
            type="button"
            aria-label="Volume up"
            onClick={() => onVolumeChange(Math.min(1, volume + 0.1))}
            className="w-6 h-6 rounded-full border border-charcoal/40 flex items-center justify-center text-xs hover:border-charcoal transition-colors bg-off-white shadow-sm"
          >
            +
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="volume-slider"
            aria-label="Volume"
          />
          <button
            type="button"
            aria-label="Volume down"
            onClick={() => onVolumeChange(Math.max(0, volume - 0.1))}
            className="w-6 h-6 rounded-full border border-charcoal/40 flex items-center justify-center text-xs hover:border-charcoal transition-colors bg-off-white shadow-sm"
          >
            −
          </button>
        </div>
      </div>

      <div className="mt-8 text-center w-[280px]">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(currentTime, duration || 0)}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="progress-slider w-[220px]"
          aria-label="Seek"
        />
        <p className="font-mono text-xs text-charcoal/50 mt-2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
        <p className="font-display italic text-lg mt-2 truncate">
          {track.title} <span className="not-italic text-charcoal/50">— {track.artist}</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-cobalt mt-1 truncate">
          {t(`musicRoles.${track.roleKey}`)}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-charcoal/45 mt-0.5 truncate">
          {t(`musicStyles.${track.styleKey}`)}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous track"
          className="flex items-center justify-center w-11 h-11 rounded-full border border-charcoal/40 hover:border-charcoal transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <rect width="2" height="10" />
            <path d="M10 0 L2 5 L10 10 Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onPlayPause}
          aria-label={playing ? "Pause" : "Play"}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-charcoal text-off-white hover:bg-cobalt transition-colors"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <rect width="3" height="10" />
              <rect x="6" width="3" height="10" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M0 0 L10 5 L0 10 Z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next track"
          className="flex items-center justify-center w-11 h-11 rounded-full border border-charcoal/40 hover:border-charcoal transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M0 0 L8 5 L0 10 Z" />
            <rect x="8" width="2" height="10" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .record-disc {
          background: repeating-radial-gradient(
            circle at center,
            var(--color-charcoal) 0px,
            var(--color-charcoal) 1.5px,
            transparent 1.5px,
            transparent 4px
          );
          background-color: var(--color-deep-navy);
          box-shadow: 0 10px 28px -8px rgba(27, 42, 59, 0.55), inset 0 0 0 1px rgba(0, 0, 0, 0.4);
          animation: record-spin 5s linear infinite;
        }
        .record-sheen {
          background: radial-gradient(
            circle at 30% 28%,
            rgba(255, 255, 255, 0.35),
            rgba(255, 255, 255, 0.08) 28%,
            transparent 55%
          );
          pointer-events: none;
        }
        @keyframes record-spin {
          to {
            transform: rotate(360deg);
          }
        }
        .tonearm {
          transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .volume-slider {
          writing-mode: vertical-lr;
          direction: rtl;
          width: 16px;
          height: 70px;
          accent-color: var(--color-cobalt);
          cursor: pointer;
        }
        .volume-slider::-webkit-slider-runnable-track {
          background: var(--color-charcoal);
          width: 3px;
        }
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 8px;
          border-radius: 2px;
          background: var(--color-cobalt);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
          cursor: pointer;
        }
        .progress-slider {
          accent-color: var(--color-cobalt);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
