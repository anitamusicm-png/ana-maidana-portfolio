import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export default async function ProjectsArchivePage() {
  const t = await getTranslations("work");
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="pt-28 px-6 md:px-10 pb-24">
      <p className="font-mono text-xs uppercase tracking-wider text-cobalt mb-8">
        {t("eyebrow")}
      </p>
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
