import { useState } from "react";
import { ChevronDown, Check, X, Award } from "lucide-react";
import type { University, UniversityMatch } from "../types";

export function UniversityMatchCard({
  university,
  match,
  rank,
  best,
}: {
  university: University;
  match: UniversityMatch;
  rank: number;
  best?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        "rounded-xl2 border bg-white p-5 shadow-soft transition dark:bg-navy-800 " +
        (best ? "border-royal-300 ring-1 ring-royal-200 dark:border-royal-500/40 dark:ring-royal-500/20" : "border-slate-200 dark:border-white/10")
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 font-display text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
            {rank}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">{university.shortName}</h3>
              {best && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald2-50 px-2 py-0.5 text-xs font-medium text-emerald2-600 dark:bg-emerald2-500/10 dark:text-emerald2-500">
                  <Award size={11} /> Best match
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{university.district} · {university.departments[0]}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="font-display text-2xl font-bold text-royal-600 dark:text-royal-400">{match.matchScore}%</div>
          <div className="text-xs text-slate-400 dark:text-slate-500">match</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-4">
        <div><span className="text-slate-400 dark:text-slate-500">Faculty</span><div>{university.faculty.length}</div></div>
        <div><span className="text-slate-400 dark:text-slate-500">Labs</span><div>{university.labs.length}</div></div>
        <div><span className="text-slate-400 dark:text-slate-500">Past projects</span><div>{university.completedChallenges}</div></div>
        <div><span className="text-slate-400 dark:text-slate-500">Success rate</span><div>{university.successRate}%</div></div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-4 flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
      >
        Why this match?
        <ChevronDown size={16} className={"transition-transform " + (open ? "rotate-180" : "")} />
      </button>

      {open && (
        <ul className="mt-3 space-y-1.5">
          {match.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              {r.positive ? (
                <Check size={14} className="mt-0.5 flex-shrink-0 text-emerald2-500" />
              ) : (
                <X size={14} className="mt-0.5 flex-shrink-0 text-slate-300 dark:text-slate-600" />
              )}
              {r.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
