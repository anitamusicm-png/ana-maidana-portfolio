"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-current/40">/</span>}
          <button
            type="button"
            aria-label={`Switch to ${loc === "en" ? "English" : "Español"}`}
            aria-current={locale === loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={
              locale === loc
                ? "text-cobalt"
                : "opacity-50 hover:opacity-100 transition-opacity"
            }
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
