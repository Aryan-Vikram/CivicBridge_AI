import { useParams, Link } from "react-router-dom";
import { GraduationCap, Award, Clock, TrendingUp } from "lucide-react";
import { getUniversityById } from "../data/universities";
import { challenges } from "../data/challenges";
import { ChallengeCard } from "../components/ChallengeCard";
import { EmptyState } from "../components/EmptyState";

export default function UniversityProfile() {
  const { id } = useParams();
  const university = getUniversityById(id || "");
  const projects = challenges.filter((c) => c.assignedUniversityId === id);

  if (!university) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <EmptyState title="University not found" description="This institution isn't part of the demo dataset." action={<Link to="/universities" className="text-sm font-semibold text-royal-600">Back to network</Link>} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-100 pb-8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-royal-50 p-3 text-royal-600 dark:bg-royal-500/10 dark:text-royal-400">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">{university.name}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{university.district}, Jharkhand</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-4xl font-bold text-royal-600 dark:text-royal-400">{university.civicScore}<span className="text-lg text-slate-400">/100</span></div>
          <div className="text-xs text-slate-400 dark:text-slate-500">Civic Innovation Score</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
          <Award size={16} className="text-emerald2-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{university.completedChallenges}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Completed challenges</div>
        </div>
        <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
          <TrendingUp size={16} className="text-royal-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{university.successRate}%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Success rate</div>
        </div>
        <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
          <Clock size={16} className="text-amber2-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{university.avgCompletionDays} days</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Average completion</div>
        </div>
        <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
          <GraduationCap size={16} className="text-indigo2-500" />
          <div className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{university.activeProjects}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Active projects</div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Current & past projects</h2>
          {projects.length === 0 ? (
            <div className="mt-4"><EmptyState title="No projects yet" description="This university hasn't been assigned a challenge in the demo dataset." /></div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {projects.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Top expertise</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {university.topExpertise.map((e) => (
                <span key={e} className="rounded-full bg-royal-50 px-2.5 py-1 text-xs font-medium text-royal-700 dark:bg-royal-500/10 dark:text-royal-400">{e}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Departments</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
              {university.departments.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Faculty</h3>
            <ul className="mt-3 space-y-3">
              {university.faculty.map((f) => (
                <li key={f.id} className="text-sm">
                  <div className="font-medium text-slate-800 dark:text-slate-100">{f.name}</div>
                  <div className="text-slate-500 dark:text-slate-400">{f.title}, {f.department}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Labs & infrastructure</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
              {university.labs.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
