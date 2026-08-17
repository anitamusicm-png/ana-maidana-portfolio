import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/types";
import { Badge } from "./Badge";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

const WARM_CATEGORIES = new Set(["recording", "composition"]);

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations();
  const isWarm = project.categories.some((c) => WARM_CATEGORIES.has(c));

  return (
    <article className="group flex flex-col gap-4">
      <Link href={`/projects/${project.slug}`}>
        <ImagePlaceholder
          label={project.heroLabel}
          register={isWarm ? "warm" : "cool"}
          className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-wrap gap-2">
        {project.categories.map((cat) => (
          <Badge key={cat}>{t(`work.categories.${cat}`)}</Badge>
        ))}
      </div>

      <div>
        <Link href={`/projects/${project.slug}`} className="block">
          <h3 className="font-display font-bold uppercase text-xl leading-tight group-hover:text-cobalt transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="font-mono text-xs uppercase tracking-wider text-charcoal/50 mt-1">
          {project.client} — {project.year}
        </p>
      </div>

      <p className="text-sm text-charcoal/80 line-clamp-2">
        {t(`descriptions.${project.descriptionKey}`)}
      </p>

      <AudioPlayer src={project.audioPreview} label={project.title} />

      <Link
        href={`/projects/${project.slug}`}
        className="font-mono text-xs uppercase tracking-wider text-cobalt hover:underline w-fit"
      >
        {t("work.viewProject")} →
      </Link>
    </article>
  );
}
