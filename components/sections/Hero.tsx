import { useTranslations } from "next-intl";
import { WaveformBackground } from "@/components/animations/WaveformBackground";
import { BOOKING_URL } from "@/lib/constants";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-10 pt-28 pb-10 bg-off-white overflow-hidden">
      <WaveformBackground />

      <div className="flex justify-between items-start font-mono text-xs uppercase tracking-wider">
        <span>{t("location")}</span>
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
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-mono text-xs uppercase tracking-wider border border-charcoal px-5 py-2.5 hover:bg-charcoal hover:text-off-white transition-colors"
        >
          {t("cta")} →
        </a>

        <div className="mt-4 max-w-md flex flex-col sm:flex-row gap-2 sm:gap-3">
          {[
            { href: "/#el-crate", label: t("quickMusic"), icon: <MusicIcon /> },
            { href: "/#services", label: t("quickServices"), icon: <ServicesIcon /> },
            { href: "/#work", label: t("quickWork"), icon: <WorkIcon /> },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex-1 flex items-center justify-between gap-3 border border-charcoal/20 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider hover:border-charcoal hover:text-cobalt transition-colors"
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="font-mono text-xs uppercase tracking-wider opacity-60">
        Scroll
      </div>
    </section>
  );
}

function MusicIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="1" y="6" width="2" height="5" fill="currentColor" />
      <rect x="5" y="2" width="2" height="9" fill="currentColor" />
      <rect x="9" y="4" width="2" height="7" fill="currentColor" />
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
      <line x1="2" y1="1" x2="2" y2="11" stroke="currentColor" strokeWidth="1.2" />
      <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.2" />
      <line x1="10" y1="1" x2="10" y2="11" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="2" cy="4" r="1.3" fill="currentColor" />
      <circle cx="6" cy="8" r="1.3" fill="currentColor" />
      <circle cx="10" cy="3" r="1.3" fill="currentColor" />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="1" y="1.5" width="10" height="9" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 4L8 6L5 8Z" fill="currentColor" />
    </svg>
  );
}
