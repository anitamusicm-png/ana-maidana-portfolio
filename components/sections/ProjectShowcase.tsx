import { useTranslations } from "next-intl";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";

export function ProjectShowcase() {
  const t = useTranslations("work");

  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32 bg-off-white scroll-mt-20">
      <FadeIn as="section">
        <p className="font-mono text-xs uppercase tracking-wider text-cobalt mb-3">
          {t("eyebrow")}
        </p>
      </FadeIn>

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {featuredProjects.map((project, i) => (
          <FadeIn key={project.slug} delay={(i % 3) * 100} as="section">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
