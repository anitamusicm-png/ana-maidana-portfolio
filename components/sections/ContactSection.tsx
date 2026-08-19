import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/animations/FadeIn";
import { BOOKING_URL } from "@/lib/constants";

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32 bg-off-white scroll-mt-28">
      <FadeIn as="section" className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wider text-cobalt mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="font-display font-bold uppercase text-4xl md:text-6xl">{t("cta")}</h2>

        <div className="mt-10 flex flex-col gap-4">
          <a
            href="mailto:anitamusicm@gmail.com"
            className="font-mono text-sm md:text-base underline underline-offset-4 hover:text-cobalt transition-colors w-fit"
          >
            anitamusicm@gmail.com
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm md:text-base underline underline-offset-4 hover:text-cobalt transition-colors w-fit"
          >
            {t("booking")} →
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
