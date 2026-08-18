"use client";

import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { parseVideoUrl } from "@/lib/video";

interface FilmRowProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function FilmRow({ project, onOpen }: FilmRowProps) {
  const t = useTranslations();
  const video = project.videoUrl ? parseVideoUrl(project.videoUrl) : null;

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-14 items-center border-t border-charcoal/15 py-10 first:border-t-0">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`${t("work.viewProject")}: ${project.title}`}
        className="group relative aspect-video w-full overflow-hidden bg-charcoal/5"
      >
        {video?.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnailUrl}
            alt=""
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-deep-navy">
            <span className="font-mono text-[10px] uppercase tracking-wider text-silver-haze">
              {project.heroLabel}
            </span>
          </div>
        )}

        <span className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-off-white/90 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
            <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M0 0 L10 5 L0 10 Z" />
            </svg>
          </span>
        </span>
      </button>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="font-mono text-[10px] uppercase tracking-wider text-charcoal/45"
            >
              {t(`work.categories.${cat}`)}
            </span>
          ))}
        </div>

        <h3 className="font-display font-bold uppercase text-2xl md:text-3xl leading-none">
          {project.title}
        </h3>

        <p className="font-mono text-xs uppercase tracking-wider text-charcoal/50">
          {project.client} — {project.year}
        </p>

        <p className="text-sm text-charcoal/70 max-w-md line-clamp-2">
          {t(`descriptions.${project.descriptionKey}`)}
        </p>

        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-2 self-start font-mono text-xs uppercase tracking-wider text-cobalt hover:underline"
        >
          {t("work.viewProject")} →
        </button>
      </div>
    </div>
  );
}
