import { useTranslations } from "next-intl";
import { featuredProjects, reelFilms } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FilmReel } from "@/components/ui/FilmReel";
import { FadeIn } from "@/components/animations/FadeIn";

export function ProjectShowcase() {
  const t = useTranslations("work");

  const rest = featuredProjects.filter((p) => !p.categories.includes("post-production"));

  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32 bg-off-white scroll-mt-20">
      <FadeIn as="section">
        <p className="font-mono text-xs uppercase tracking-wider text-cobalt mb-3">
          {t("eyebrow")}
        </p>
      </FadeIn>

      <div className="mt-8 max-w-5xl mx-auto">
        <FadeIn as="section">
          <FilmReel films={reelFilms} />
        </FadeIn>
      </div>

      {rest.length > 0 && (
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 mt-20">
          {rest.map((project, i) => (
            <FadeIn key={project.slug} delay={(i % 3) * 100} as="section">
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  );
}
