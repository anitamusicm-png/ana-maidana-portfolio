import clsx from "clsx";

interface ImagePlaceholderProps {
  label: string;
  register?: "warm" | "cool";
  className?: string;
}

export function ImagePlaceholder({ label, register = "cool", className }: ImagePlaceholderProps) {
  return (
    <div
      className={clsx(
        "relative flex items-end justify-start p-4 overflow-hidden",
        register === "warm"
          ? "bg-gradient-to-br from-pale-dust via-warm-gold to-burnt-amber"
          : "bg-gradient-to-br from-pale-haze via-mid-blue to-deep-navy",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 12px)",
        }}
        aria-hidden="true"
      />
      <span className="relative font-mono text-[10px] uppercase tracking-wider text-off-white/90 bg-charcoal/30 px-2 py-1">
        {label}
      </span>
    </div>
  );
}
