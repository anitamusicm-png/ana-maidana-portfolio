"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { parseVideoUrl } from "@/lib/video";

interface FilmReelProps {
  films: Project[];
}

function anaRole(project: Project) {
  return project.credits.find((c) => c.name === "Ana Maidana")?.role;
}

function directorName(project: Project) {
  return project.credits.find((c) => c.role.toLowerCase() === "director")?.name;
}

export function FilmReel({ films }: FilmReelProps) {
  const t = useTranslations("project");
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!stage) return;
        const index = Math.round(stage.scrollTop / stage.clientHeight);
        setActive(index);
        setLoaded((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
      });
    }

    stage.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      stage.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  function scrollToIndex(i: number) {
    const stage = stageRef.current;
    if (!stage) return;
    stage.scrollTo({ top: i * stage.clientHeight, behavior: "smooth" });
  }

  if (films.length === 0) return null;

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start">
      <div className="relative">
        {/* stacked-card effect: faint duplicates peeking out behind the stage */}
        <div className="absolute inset-x-3 -bottom-2 top-2 bg-charcoal/8 -z-10" aria-hidden="true" />
        <div className="absolute inset-x-1.5 -bottom-1 top-1 bg-charcoal/12 -z-10" aria-hidden="true" />

        <div
          ref={stageRef}
          className="film-reel-stage relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-deep-navy"
        >
          {films.map((film, i) => {
            const video = film.videoUrl ? parseVideoUrl(film.videoUrl) : null;
            const shouldLoad = loaded.has(i);

            return (
              <div key={film.slug} className="snap-start snap-always w-full h-full shrink-0">
                {shouldLoad && video ? (
                  <iframe
                    title={film.title}
                    src={video.embedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={film.title}
                    className="group relative w-full h-full block"
                  >
                    {video?.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={video.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-off-white/90 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                        <svg width="14" height="14" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                          <path d="M0 0 L10 5 L0 10 Z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <nav
        aria-label="Films"
        className="flex md:flex-col gap-x-5 gap-y-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:w-48"
      >
        {films.map((film, i) => {
          const role = anaRole(film);
          const director = directorName(film);
          const isExpanded = expanded === i;

          return (
            <div key={film.slug} className="shrink-0 md:w-full">
              <button
                type="button"
                onClick={() => {
                  scrollToIndex(i);
                  setExpanded(isExpanded ? null : i);
                }}
                aria-current={active === i}
                aria-expanded={isExpanded}
                className={`text-left font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  active === i ? "text-cobalt" : "text-charcoal/45 hover:text-charcoal"
                }`}
              >
                {film.title}
              </button>

              {isExpanded && (role || director) && (
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-charcoal/50 leading-relaxed max-w-[13rem]">
                  {director && <p>Dir. {director}</p>}
                  {role && (
                    <p className="mt-0.5">
                      {t("role")}: {role}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <style jsx>{`
        .film-reel-stage {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .film-reel-stage::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
