import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import { universities } from "../data/universities";

export default function Universities() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">University network</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Institutions across Jharkhand contributing faculty expertise, labs, and student research capacity to solve societal challenges.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {universities.map((u) => (
          <Link
            key={u.id}
            to={`/universities/${u.id}`}
            className="group rounded-xl2 border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-navy-800"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-royal-50 p-2 text-royal-600 dark:bg-royal-500/10 dark:text-royal-400">
                <GraduationCap size={18} />
              </div>
              <div className="text-right">
                <div className="font-display text-xl font-bold text-slate-900 dark:text-white">{u.civicScore}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">civic score</div>
              </div>
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-slate-900 group-hover:text-royal-600 dark:text-white">{u.shortName}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{u.district}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {u.topExpertise.slice(0, 3).map((e) => (
                <span key={e} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300">{e}</span>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-slate-500 dark:text-slate-400">
              <div><div className="font-display text-sm font-semibold text-slate-900 dark:text-white">{u.completedChallenges}</div>completed</div>
              <div><div className="font-display text-sm font-semibold text-slate-900 dark:text-white">{u.successRate}%</div>success</div>
              <div><div className="font-display text-sm font-semibold text-slate-900 dark:text-white">{u.avgCompletionDays}d</div>avg time</div>
            </div>

            <div className="mt-5 flex items-center gap-1 text-sm font-medium text-royal-600">
              View profile <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
