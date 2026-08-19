"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { musicTracks } from "@/data/musicTracks";
import { RecordPlayer } from "@/components/ui/RecordPlayer";
import { FadeIn } from "@/components/animations/FadeIn";
import type { BeforeAfterValue } from "@/components/ui/BeforeAfterToggle";

const CATALOG_LINKS = [
  { key: "youtube", href: "https://youtu.be/Rsj3gX6vjZ8?si=Dg5b20Q5BAk4ZDvH" },
  {
    key: "spotify",
    href: "https://open.spotify.com/playlist/0T5Z7Apy0Qo3EsubueI2ka?si=3debef0695324dac&pt=9e51b65b1bee81a25fc851ffe65bb411",
  },
  { key: "soundcloud", href: "https://soundcloud.com/anitamusicm/sets" },
] as const;

export function MusicShowcase() {
  const t = useTranslations("music");
  const tCommon = useTranslations();
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingRestoreRef = useRef<{ time: number; playing: boolean } | null>(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [abState, setAbState] = useState<Record<string, BeforeAfterValue>>({});

  const track = musicTracks[index];
  const abValue: BeforeAfterValue = abState[track.slug] ?? "after";
  const trackUrl = track.beforeAfter
    ? track.beforeAfter[abValue]
    : track.source.type === "file"
      ? track.source.url
      : undefined;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    if (playing) audio.play().catch(() => setPlaying(false));
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  }

  function next() {
    setIndex((i) => (i + 1) % musicTracks.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + musicTracks.length) % musicTracks.length);
  }

  function seek(t: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = t;
    setCurrentTime(t);
  }

  function changeAb(value: BeforeAfterValue) {
    const audio = audioRef.current;
    if (audio) {
      pendingRestoreRef.current = { time: audio.currentTime, playing };
    }
    setAbState((prev) => ({ ...prev, [track.slug]: value }));
  }

  function onLoadedMetadata(e: React.SyntheticEvent<HTMLAudioElement>) {
    const audio = e.currentTarget;
    setDuration(audio.duration);

    const pending = pendingRestoreRef.current;
    if (pending) {
      pendingRestoreRef.current = null;
      audio.currentTime = pending.time;
      setCurrentTime(pending.time);
      if (pending.playing) audio.play().catch(() => setPlaying(false));
    }
  }

  return (
    <section id="el-crate" className="px-6 md:px-10 py-24 md:py-32 bg-pale-dust scroll-mt-28">
      <FadeIn as="section" className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wider text-burnt-amber mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="font-display font-bold uppercase text-4xl md:text-6xl">{t("title")}</h2>
        <p className="mt-4 text-sm text-charcoal/70 max-w-xl">{t("subtitle")}</p>
      </FadeIn>

      <FadeIn as="section" delay={150}>
        <div className="mt-16 max-w-4xl mx-auto grid gap-16 lg:grid-cols-[320px_1fr] lg:gap-24 items-center justify-items-center">
          <RecordPlayer
            track={track}
            playing={playing}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            onPlayPause={togglePlay}
            onPrev={prev}
            onNext={next}
            onVolumeChange={setVolume}
            onSeek={seek}
            abValue={track.beforeAfter ? abValue : undefined}
            onAbChange={track.beforeAfter ? changeAb : undefined}
          />

          <ol className="w-full max-w-xl flex flex-col divide-y divide-charcoal/10">
            {musicTracks.map((item, i) => {
              const isActive = i === index;
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setPlaying(true);
                    }}
                    className={`w-full flex items-center gap-4 py-4 text-left transition-colors ${
                      isActive ? "text-cobalt" : "hover:text-charcoal/70"
                    }`}
                  >
                    <span className="font-mono text-xs w-6 shrink-0">
                      {isActive && playing ? "▶" : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-display font-bold uppercase text-base block truncate">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-charcoal/50 block truncate">
                        {item.artist}
                      </span>
                    </span>
                    <span className="hidden sm:block font-mono text-[10px] uppercase tracking-wider text-charcoal/45 text-right shrink-0">
                      {tCommon(`musicStyles.${item.styleKey}`)}
                    </span>
                  </button>
                  {item.quoteKey && (
                    <p className="pb-4 -mt-2 pl-10 pr-4 text-xs italic text-charcoal/60 leading-relaxed">
                      “{tCommon(`musicQuotes.${item.quoteKey}`)}”
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </FadeIn>

      {trackUrl && (
        <audio
          ref={audioRef}
          src={trackUrl}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={next}
          className="hidden"
        />
      )}

      <div className="mt-16 pt-8 border-t border-charcoal/15 flex flex-wrap items-center gap-x-3 gap-y-4">
        <span className="font-mono text-xs uppercase tracking-wider text-charcoal/50">
          {t("discoverMore")}
        </span>
        {CATALOG_LINKS.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider border border-charcoal px-4 py-2 hover:bg-charcoal hover:text-off-white transition-colors"
          >
            {t(key)} →
          </a>
        ))}
      </div>
    </section>
  );
}
