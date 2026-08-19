import { useTranslations } from "next-intl";
import { WaveformBackground } from "@/components/animations/WaveformBackground";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 pb-10 bg-off-white overflow-hidden">
      <WaveformBackground />

      <div className="flex justify-between items-start font-mono text-xs uppercase tracking-wider">
        <span>{t("location")}</span>
        <span className="w-2 h-2 rounded-full bg-cobalt" aria-hidden="true" />
      </div>

      <div className="relative">
        <h1 className="font-display font-bold uppercase leading-[0.9] text-[13vw] md:text-[8vw]">
          Ana
          <br />
          Maidana
        </h1>
        <p className="mt-6 max-w-xl text-sm md:text-base font-mono uppercase tracking-wide text-charcoal/80">
          {t("role")}
        </p>
        <p className="mt-3 max-w-xl text-xs md:text-sm font-mono tracking-wide text-charcoal/50">
          {t("credentials")}
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block font-mono text-xs uppercase tracking-wider border border-charcoal px-5 py-2.5 hover:bg-charcoal hover:text-off-white transition-colors"
        >
          {t("cta")} →
        </Link>
      </div>

      <div className="font-mono text-xs uppercase tracking-wider opacity-60">
        Scroll
      </div>
    </section>
  );
}
