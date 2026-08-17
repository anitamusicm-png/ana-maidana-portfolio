import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { projects, getProjectBySlug } from "@/data/projects";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Link } from "@/i18n/navigation";

const WARM_CATEGORIES = new Set(["recording", "composition"]);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations();
  const isWarm = project.categories.some((c) => WARM_CATEGORIES.has(c));

  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((p) => p.slug === slug);
  const prev = sorted[(index - 1 + sorted.length) % sorted.length];
  const next = sorted[(index + 1) % sorted.length];

  return (
    <article className="pt-28 px-6 md:px-10 pb-24 max-w-4xl mx-auto">
      <Link
        href="/#work"
        className="font-mono text-xs uppercase tracking-wider text-cobalt hover:underline"
      >
        ← {t("project.allWork")}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.map((cat) => (
            <Badge key={cat}>{t(`work.categories.${cat}`)}</Badge>
          ))}
        </div>
        <h1 className="font-display font-bold uppercase text-4xl md:text-6xl leading-none">
          {project.title}
        </h1>
        <p className="font-mono text-xs uppercase tracking-wider text-charcoal/50 mt-4">
          {project.client} — {project.year}
        </p>
      </header>

      <div className="mt-10">
        <ImagePlaceholder
          label={project.heroLabel}
          register={isWarm ? "warm" : "cool"}
          className="aspect-video"
        />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <p className="md:col-span-2 text-base leading-relaxed">
          {t(`descriptions.${project.descriptionKey}`)}
        </p>

        <div className="flex flex-col gap-6">
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

      <div className="mt-10">
        <AudioPlayer src={project.audioPreview} label={project.title} />
      </div>

      <nav className="mt-20 pt-8 border-t border-charcoal/15 flex justify-between font-mono text-xs uppercase tracking-wider">
        <Link href={`/projects/${prev.slug}`} className="hover:text-cobalt transition-colors">
          ← {t("project.prev")}: {prev.title}
        </Link>
        <Link href={`/projects/${next.slug}`} className="hover:text-cobalt transition-colors">
          {t("project.next")}: {next.title} →
        </Link>
      </nav>
    </article>
  );
}
