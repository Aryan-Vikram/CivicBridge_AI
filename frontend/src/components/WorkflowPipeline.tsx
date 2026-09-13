import { motion } from "framer-motion";
import { User, Sparkles, GitBranch, GraduationCap, Factory, Landmark, TrendingUp } from "lucide-react";

const steps = [
  { icon: User, label: "Citizen" },
  { icon: Sparkles, label: "AI analysis" },
  { icon: GitBranch, label: "Smart matching" },
  { icon: GraduationCap, label: "University research" },
  { icon: Factory, label: "Industry support" },
  { icon: Landmark, label: "Implementation" },
  { icon: TrendingUp, label: "Impact" },
];

export function WorkflowPipeline() {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex flex-col items-center text-center"
          >
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-royal-100 bg-white text-royal-600 shadow-soft dark:border-royal-500/20 dark:bg-navy-800 dark:text-royal-400">
              <s.icon size={22} />
            </div>
            <span className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">{s.label}</span>
            {i < steps.length - 1 && (
              <svg
                className="pointer-events-none absolute left-1/2 top-7 hidden h-[2px] w-full lg:block"
                style={{ transform: "translateX(50%)" }}
              >
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className="animate-flow text-royal-200 dark:text-royal-500/30"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
