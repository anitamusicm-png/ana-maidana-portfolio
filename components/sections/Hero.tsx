import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 pb-10 bg-off-white overflow-hidden">
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 200" className="w-full h-40" preserveAspectRatio="none">
          <path
            d="M0,100 Q50,20 100,100 T200,100 T300,40 T400,100 T500,160 T600,100 T700,20 T800,100 T900,140 T1000,100 T1100,60 T1200,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

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
      </div>

      <div className="font-mono text-xs uppercase tracking-wider opacity-60">
        Scroll
      </div>
    </section>
  );
}
