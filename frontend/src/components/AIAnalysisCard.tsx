import { Sparkles, Users, Gauge, ListChecks } from "lucide-react";
import type { AIAnalysis } from "../types";
import { SeverityBadge } from "./StatusBadge";

export function AIAnalysisCard({ analysis }: { analysis: AIAnalysis }) {
  return (
    <div className="rounded-xl2 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-navy-800">
      <div className="flex items-center gap-2 text-royal-600 dark:text-royal-400">
        <Sparkles size={18} />
        <span className="font-display text-sm font-semibold">AI analysis result</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Category</div>
          <div className="mt-1 font-display text-sm font-semibold text-slate-900 dark:text-white">{analysis.category}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Severity</div>
          <div className="mt-1"><SeverityBadge severity={analysis.severity} /></div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Priority score</div>
          <div className="mt-1 flex items-center gap-1 font-display text-sm font-semibold text-slate-900 dark:text-white">
            <Gauge size={14} className="text-royal-600" /> {analysis.priorityScore.toFixed(1)} / 10
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Est. affected</div>
          <div className="mt-1 flex items-center gap-1 font-display text-sm font-semibold text-slate-900 dark:text-white">
            <Users size={14} className="text-royal-600" /> {analysis.estimatedAffected.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <ListChecks size={14} /> Required expertise
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.requiredExpertise.map((e) => (
            <span key={e} className="rounded-full bg-royal-50 px-3 py-1 text-xs font-medium text-royal-700 dark:bg-royal-500/10 dark:text-royal-400">
              {e}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-slate-50 p-4 dark:bg-white/5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{analysis.similarChallengeCount} similar challenges found nearby</span>
          <span>{Math.round(analysis.confidence * 100)}% AI confidence</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <div className="h-full rounded-full bg-royal-600" style={{ width: `${Math.round(analysis.confidence * 100)}%` }} />
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {analysis.reasoning.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-royal-500" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
