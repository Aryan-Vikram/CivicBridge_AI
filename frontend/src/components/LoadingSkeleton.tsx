export function LoadingSkeleton({ rows = 3, className = "" }: { rows?: number; className?: string }) {
  return (
    <div className={"animate-pulse space-y-3 " + className}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 rounded-xl2 bg-slate-100 dark:bg-white/5" />
      ))}
    </div>
  );
}

export function LoadingDots({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-royal-500" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-royal-500" style={{ animationDelay: "200ms" }} />
        <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-royal-500" style={{ animationDelay: "400ms" }} />
      </span>
      {label}
    </div>
  );
}
