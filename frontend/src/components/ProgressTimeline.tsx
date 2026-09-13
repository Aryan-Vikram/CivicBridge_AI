import { motion } from "framer-motion";
import { Check, Circle, FileText, Image as ImageIcon } from "lucide-react";
import type { Milestone } from "../types";

export function ProgressTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className="relative border-l border-slate-200 pl-6 dark:border-white/10">
      {milestones.map((m, i) => (
        <motion.li
          key={m.id}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: i * 0.03 }}
          className="mb-8 last:mb-0"
        >
          <span
            className={
              "absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full border-2 " +
              (m.status === "completed"
                ? "border-emerald2-500 bg-emerald2-500 text-white"
                : m.status === "in-progress"
                ? "border-royal-600 bg-white text-royal-600 dark:bg-navy-900"
                : "border-slate-300 bg-white text-slate-300 dark:border-white/20 dark:bg-navy-900")
            }
          >
            {m.status === "completed" ? (
              <Check size={12} strokeWidth={3} />
            ) : m.status === "in-progress" ? (
              <span className="h-2 w-2 animate-pulseDot rounded-full bg-royal-600" />
            ) : (
              <Circle size={8} fill="currentColor" />
            )}
          </span>

          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h4
              className={
                "font-display text-sm font-semibold " +
                (m.status === "upcoming" ? "text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white")
              }
            >
              {m.title}
            </h4>
            {m.date && <span className="text-xs text-slate-400 dark:text-slate-500">{new Date(m.date).toDateString()}</span>}
          </div>

          {m.status !== "upcoming" && (
            <>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{m.description}</p>
              <div className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">{m.organization}</div>
              {(m.evidenceUrls?.length || m.documentUrls?.length) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.evidenceUrls?.map((e) => (
                    <span key={e} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
                      <ImageIcon size={12} /> {e}
                    </span>
                  ))}
                  {m.documentUrls?.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
                      <FileText size={12} /> {d}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
