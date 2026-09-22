export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-10 bg-bronze/50" />
      <span className="h-1.5 w-1.5 rotate-45 border border-bronze/70" />
      <span className="h-px w-10 bg-bronze/50" />
    </div>
  );
}
