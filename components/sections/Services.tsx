import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";

const KEYS = ["production", "recording", "soundDesign", "composition"] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="px-6 md:px-10 py-24 md:py-32 bg-off-white scroll-mt-20">
      <FadeIn as="section">
        <p className="font-mono text-xs uppercase tracking-wider text-cobalt mb-3">
          {t("eyebrow")}
        </p>
      </FadeIn>

      <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {KEYS.map((key, i) => (
          <FadeIn key={key} delay={i * 100} as="section" className="border-t border-charcoal/15 pt-6">
            <span className="font-mono text-xs text-charcoal/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display font-bold uppercase text-2xl mt-2">
              {t(`${key}.title`)}
            </h3>
            <p className="text-sm text-charcoal/70 mt-3 max-w-md">
              {t(`${key}.description`)}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
