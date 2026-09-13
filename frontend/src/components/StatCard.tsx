import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";

function useCountUp(target: number, duration = 1400, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  suffix = "",
  accent = "royal",
}: {
  label: string;
  value: number;
  icon?: LucideIcon;
  suffix?: string;
  accent?: "royal" | "emerald" | "amber" | "indigo" | "violet";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, 1400, inView);

  const accentMap: Record<string, string> = {
    royal: "text-royal-600 bg-royal-50 dark:bg-royal-500/10",
    emerald: "text-emerald2-600 bg-emerald2-50 dark:bg-emerald2-500/10",
    amber: "text-amber2-600 bg-amber2-50 dark:bg-amber2-500/10",
    indigo: "text-indigo2-600 bg-indigo2-500/10",
    violet: "text-violet2-500 bg-violet2-500/10",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-navy-800"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-display text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
            {count.toLocaleString("en-IN")}
            {suffix}
          </div>
          <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</div>
        </div>
        {Icon && (
          <div className={`rounded-lg p-2 ${accentMap[accent]}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
