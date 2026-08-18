"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { Badge } from "./Badge";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { parseVideoUrl } from "@/lib/video";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const t = useTranslations();

  useEffect(() => {
    if (!project) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const video = project.videoUrl ? parseVideoUrl(project.videoUrl) : null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-off-white text-charcoal w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-charcoal text-off-white hover:bg-cobalt transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <div className="aspect-video bg-deep-navy">
          {video ? (
            <iframe
              title={project.title}
              src={video.embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <ImagePlaceholder label={project.heroLabel} register="cool" className="w-full h-full" />
          )}
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.categories.map((cat) => (
              <Badge key={cat}>{t(`work.categories.${cat}`)}</Badge>
            ))}
          </div>

          <h2 className="font-display font-bold uppercase text-3xl md:text-4xl leading-none">
            {project.title}
          </h2>
          <p className="font-mono text-xs uppercase tracking-wider text-charcoal/50 mt-3">
            {project.client} — {project.year}
          </p>

          <p className="text-base leading-relaxed mt-6 max-w-xl">
            {t(`descriptions.${project.descriptionKey}`)}
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-charcoal/50 mb-2">
                {t("project.credits")}
              </p>
              <ul className="text-sm space-y-1">
                {project.credits.map((c) => (
                  <li key={c.role}>
                    <span className="text-charcoal/60">{c.role}:</span> {c.name}
                  </li>
                ))}
              </ul>
            </div>

            {project.screenings && project.screenings.length > 0 && (
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-charcoal/50 mb-2">
                  {t("project.screenings")}
                </p>
                <ul className="text-sm space-y-1">
                  {project.screenings.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
