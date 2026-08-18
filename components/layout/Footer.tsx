import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SketchfabEmbed } from "@/components/ui/SketchfabEmbed";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/anitamusicm/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ana-maidana/" },
  { label: "TikTok", href: "https://www.tiktok.com/@anitamusicm" },
  { label: "Substack", href: "https://anamaidana.substack.com/" },
  { label: "Facebook", href: "https://www.facebook.com/ana.maidana.79656" },
];

export function Footer() {
  const t = useTranslations();
  const year = 2026;

  return (
    <footer className="bg-deep-navy text-off-white px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-4">
        <div>
          <p className="font-display font-bold uppercase text-lg mb-3">Ana Maidana</p>
          <p className="text-sm text-pale-haze max-w-xs">{t("artistStatement.line1")}</p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-silver-haze mb-3">
            {t("contact.eyebrow")}
          </p>
          <a
            href="mailto:anitamusicm@gmail.com"
            className="block text-sm hover:text-cobalt transition-colors mb-2"
          >
            anitamusicm@gmail.com
          </a>
          <a
            href="https://calendar.app.google/qVfVty7bfK5PcsoM7"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm hover:text-cobalt transition-colors"
          >
            {t("contact.booking")} →
          </a>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-silver-haze mb-3">
            {t("contact.follow")}
          </p>
          <ul className="flex flex-col gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-cobalt transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <SketchfabEmbed />
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-off-white/10 flex flex-col md:flex-row justify-between gap-2 font-mono text-xs text-silver-haze">
        <p>
          © {year} Ana Maidana. {t("footer.rights")}
        </p>
        <Link href="/" className="hover:text-off-white transition-colors">
          anitamusic
        </Link>
      </div>
    </footer>
  );
}
