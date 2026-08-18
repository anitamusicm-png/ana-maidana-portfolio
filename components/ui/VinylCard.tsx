"use client";

import { useTranslations } from "next-intl";
import type { MusicTrack } from "@/types";
import { useAudio } from "@/components/audio/AudioContext";

const LABEL_COLORS = [
  "var(--color-burnt-amber)",
  "var(--color-cobalt)",
  "var(--color-gold-ochre)",
  "var(--color-mid-blue)",
  "var(--color-terracotta)",
];

function externalUrl(source: MusicTrack["source"]) {
  if (source.type === "spotify") return `https://open.spotify.com/track/${source.id}`;
  if (source.type === "youtube") return `https://youtu.be/${source.id}`;
  return null;
}

interface VinylCardProps {
  track: MusicTrack;
  index: number;
}

export function VinylCard({ track, index }: VinylCardProps) {
  const t = useTranslations();
  const { isPlaying, toggle } = useAudio();

  const fileUrl = track.source.type === "file" ? track.source.url : null;
  const playing = fileUrl !== null && isPlaying(fileUrl);
  const labelColor = LABEL_COLORS[index % LABEL_COLORS.length];
  const openUrl = externalUrl(track.source);

  const disc = (
    <span
      className="vinyl-disc absolute inset-0 rounded-full"
      style={{ animationPlayState: playing ? "running" : "paused" }}
    >
      <span
        className="absolute inset-[38%] rounded-full flex items-center justify-center font-display font-bold text-off-white text-xs"
        style={{ background: labelColor }}
      >
        {track.artist
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      </span>
    </span>
  );

  const iconOverlay = (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="flex items-center justify-center w-11 h-11 rounded-full bg-off-white/95 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-sm">
        {playing ? (
          <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <rect width="3" height="10" />
            <rect x="6" width="3" height="10" />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M0 0 L10 5 L0 10 Z" />
          </svg>
        )}
      </span>
    </span>
  );

  return (
    <div className="shrink-0 w-[200px] flex flex-col items-center text-center">
      {fileUrl ? (
        <button
          type="button"
          onClick={() => toggle(fileUrl)}
          aria-label={`${playing ? "Pause" : "Play"} ${track.title}`}
          className="group relative w-[168px] h-[168px] rounded-full"
        >
          {disc}
          {iconOverlay}
        </button>
      ) : (
        <a
          href={openUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${track.title} — ${track.source.type === "spotify" ? "Spotify" : "YouTube"}`}
          className="group relative w-[168px] h-[168px] rounded-full"
        >
          {disc}
          {iconOverlay}
        </a>
      )}

      <h3 className="font-display font-bold uppercase text-sm mt-4 leading-tight">
        {track.title}
      </h3>
      <p className="font-mono text-[10px] uppercase tracking-wider text-charcoal/60 mt-2">
        {track.artist}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-cobalt mt-0.5">
        {t(`musicRoles.${track.roleKey}`)}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-charcoal/45 mt-0.5">
        {t(`musicStyles.${track.styleKey}`)}
      </p>

      <style jsx>{`
        .vinyl-disc {
          background: repeating-radial-gradient(
            circle at center,
            var(--color-charcoal) 0px,
            var(--color-charcoal) 1.5px,
            transparent 1.5px,
            transparent 4px
          );
          background-color: var(--color-deep-navy);
          animation: vinyl-spin 6s linear infinite;
        }
        @keyframes vinyl-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
