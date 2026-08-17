"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navigation() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > window.innerHeight * 0.6);
      setProgress(max > 0 ? Math.min(scrollY / max, 1) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#work", label: t("work") },
    { href: "/#ep", label: t("ep") },
    { href: "/#services", label: t("services") },
    { href: "/about", label: t("about") },
  ];

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-cobalt z-50 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-transform duration-500 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-off-white/90 backdrop-blur-sm border-b border-charcoal/10">
          <Link href="/" className="font-display font-bold uppercase tracking-tight text-sm">
            Ana Maidana
          </Link>

          <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-cobalt transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/contact"
              className="font-mono text-xs uppercase tracking-wider border border-charcoal px-4 py-2 hover:bg-charcoal hover:text-off-white transition-colors"
            >
              {t("contact")}
            </Link>
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="md:hidden font-mono text-xs uppercase tracking-wider"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-off-white border-b border-charcoal/10 px-6 py-6 flex flex-col gap-4 font-mono text-sm uppercase tracking-wider">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              {t("contact")}
            </Link>
            <LanguageSwitcher />
          </div>
        )}
      </header>
    </>
  );
}
