import { Link } from "react-router-dom";
import { MapPin, Users, ShieldCheck } from "lucide-react";
import type { Challenge } from "../types";
import { SeverityBadge, CategoryDot } from "./StatusBadge";
import { getUniversityById } from "../data/universities";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const university = challenge.assignedUniversityId ? getUniversityById(challenge.assignedUniversityId) : undefined;

  return (
    <Link
      to={`/track/${challenge.displayId}`}
      className="group flex flex-col rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-navy-800"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <CategoryDot category={challenge.category} />
          {challenge.category}
        </div>
        <SeverityBadge severity={challenge.severity} />
      </div>

      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-slate-900 group-hover:text-royal-600 dark:text-white dark:group-hover:text-royal-400">
        {challenge.title}
      </h3>

      <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <MapPin size={14} />
        {challenge.location}
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Users size={14} />
          {challenge.affectedCitizens.toLocaleString("en-IN")} affected
        </span>
        {challenge.verified && (
          <span className="flex items-center gap-1.5 text-emerald2-600 dark:text-emerald2-500">
            <ShieldCheck size={14} />
            Verified
          </span>
        )}
      </div>

      {university && (
        <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Assigned to <span className="font-medium text-slate-900 dark:text-white">{university.shortName}</span>
        </div>
      )}

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{challenge.status}</span>
          <span>{challenge.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
          <div className="h-full rounded-full bg-royal-600" style={{ width: `${challenge.progress}%` }} />
        </div>
      </div>
    </Link>
  );
}
