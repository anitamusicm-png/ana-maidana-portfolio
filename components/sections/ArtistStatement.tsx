import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";

export function ArtistStatement() {
  const t = useTranslations("artistStatement");

  return (
    <section className="px-6 md:px-10 py-28 md:py-40 bg-off-white">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn as="section">
          <p className="font-display text-2xl md:text-4xl leading-snug">{t("line1")}</p>
        </FadeIn>
        <FadeIn as="section" delay={150}>
          <p className="mt-6 font-mono text-sm md:text-base uppercase tracking-wide text-charcoal/60">
            {t("line2")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
