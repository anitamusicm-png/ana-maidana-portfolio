"use client";

import { useTranslations } from "next-intl";

export type BeforeAfterValue = "before" | "after";

interface BeforeAfterToggleProps {
  value: BeforeAfterValue;
  onChange: (value: BeforeAfterValue) => void;
  className?: string;
}

export function BeforeAfterToggle({ value, onChange, className }: BeforeAfterToggleProps) {
  const t = useTranslations("music");

  return (
    <div
      className={`inline-flex border border-charcoal/30 font-mono text-[10px] uppercase tracking-wider ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={() => onChange("before")}
        aria-pressed={value === "before"}
        className={`px-3 py-1 transition-colors ${
          value === "before" ? "bg-charcoal text-off-white" : "text-charcoal/60 hover:text-charcoal"
        }`}
      >
        {t("before")}
      </button>
      <button
        type="button"
        onClick={() => onChange("after")}
        aria-pressed={value === "after"}
        className={`px-3 py-1 border-l border-charcoal/30 transition-colors ${
          value === "after" ? "bg-charcoal text-off-white" : "text-charcoal/60 hover:text-charcoal"
        }`}
      >
        {t("after")}
      </button>
    </div>
  );
}
