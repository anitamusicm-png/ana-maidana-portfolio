import Image from "next/image";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 bg-pale-dust scroll-mt-20">
      <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-start">
        <FadeIn as="section">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/portraits/ana-studio.jpeg"
              alt="Ana Maidana"
              fill
              className="object-cover object-top"
              sizes="(min-width: 768px) 40vw, 90vw"
              priority={false}
            />
          </div>
        </FadeIn>

        <FadeIn as="section" delay={100}>
          <p className="font-mono text-xs uppercase tracking-wider text-burnt-amber mb-3">
            {t("eyebrow")}
          </p>
          <p className="text-base md:text-lg leading-relaxed">{t("bio1")}</p>
          <p className="text-sm md:text-base leading-relaxed mt-4 text-charcoal/80">{t("bio2")}</p>
          <p className="text-sm md:text-base leading-relaxed mt-4 text-charcoal/80">{t("bio3")}</p>

          <div className="mt-8 grid grid-cols-2 gap-6 font-mono text-xs uppercase tracking-wider">
            <div>
              <p className="text-charcoal/50 mb-1">{t("educationTitle")}</p>
              <p className="normal-case font-sans text-sm">{t("education")}</p>
            </div>
            <div>
              <p className="text-charcoal/50 mb-1">{t("toolsTitle")}</p>
              <p className="normal-case font-sans text-sm">{t("tools")}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
