export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-[10px] uppercase tracking-wider border border-current/40 px-2 py-1">
      {children}
    </span>
  );
}
