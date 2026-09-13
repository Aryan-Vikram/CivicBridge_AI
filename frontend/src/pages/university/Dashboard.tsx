import { Link } from "react-router-dom";
import { Award, Clock, TrendingUp, FlaskConical } from "lucide-react";
import { challenges } from "../../data/challenges";
import { getUniversityById } from "../../data/universities";
import { ChallengeCard } from "../../components/ChallengeCard";
import { EmptyState } from "../../components/EmptyState";

const MY_UNI_ID = "u-bitm"; // demo university session

export default function UniversityDashboard() {
  const university = getUniversityById(MY_UNI_ID)!;
  const assigned = challenges.filter((c) => c.assignedUniversityId === MY_UNI_ID);
  const active = assigned.filter((c) => !["Completed", "Impact Verification"].includes(c.status));
  const completed = assigned.filter((c) => ["Completed", "Impact Verification"].includes(c.status));

  const recommended = challenges.filter((c) => !c.assignedUniversityId).slice(0, 3);

  return (
    <div className="max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{university.name}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Environmental Engineering Department · Overview</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl2 border border-slate-200 p-4 dark:border-white/10">
          <FlaskConical size={15} className="text-royal-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{assigned.length}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Assigned</div>
        </div>
        <div className="rounded-xl2 border border-slate-200 p-4 dark:border-white/10">
          <Clock size={15} className="text-amber2-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{active.length}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Active projects</div>
        </div>
        <div className="rounded-xl2 border border-slate-200 p-4 dark:border-white/10">
          <Award size={15} className="text-emerald2-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{university.completedChallenges}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Completed (all-time)</div>
        </div>
        <div className="rounded-xl2 border border-slate-200 p-4 dark:border-white/10">
          <Clock size={15} className="text-indigo2-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{university.avgCompletionDays}d</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Avg completion</div>
        </div>
        <div className="rounded-xl2 border border-slate-200 p-4 dark:border-white/10">
          <TrendingUp size={15} className="text-royal-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{university.successRate}%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Success rate</div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Recommended challenges for your university</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">AI-matched based on your department's expertise and current capacity.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.length === 0 ? <EmptyState title="No recommendations right now" /> : recommended.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Assigned challenges</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assigned.map((c) => (
            <Link key={c.id} to={`/university/challenges/${c.id}`}>
              <ChallengeCard challenge={c} />
            </Link>
          ))}
          {assigned.length === 0 && <EmptyState title="No challenges assigned yet" />}
        </div>
      </div>

      {completed.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Completed</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
          </div>
        </div>
      )}
    </div>
  );
}
