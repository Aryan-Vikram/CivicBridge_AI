import { Factory, Wrench, HandCoins, Rocket, Users } from "lucide-react";
import { industryOpportunities } from "../../data/industry";
import { getUniversityById } from "../../data/universities";
import { getChallengeById } from "../../data/challenges";
import { StatCard } from "../../components/StatCard";

const actionIcons: Record<string, typeof Wrench> = {
  "Manufacturing Partner": Wrench,
  Funding: HandCoins,
  Technology: Rocket,
  Deployment: Rocket,
  Mentorship: Users,
  Scaling: Rocket,
};

export default function IndustryDashboard() {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center gap-2 text-amber2-600 dark:text-amber2-500">
        <Factory size={18} />
        <span className="text-xs font-semibold uppercase tracking-wide">Industry partner</span>
      </div>
      <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">Opportunities for industry</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">University-developed solutions ready for manufacturing, funding, or deployment support.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Open opportunities" value={industryOpportunities.length} accent="amber" />
        <StatCard label="Active collaborations" value={12} accent="royal" />
        <StatCard label="Prototypes funded" value={7} accent="emerald" />
        <StatCard label="Citizens impacted" value={9800} accent="indigo" />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {industryOpportunities.map((op) => {
          const university = getUniversityById(op.universityId);
          const challenge = getChallengeById(op.challengeId);
          const Icon = actionIcons[op.needType] || Wrench;
          return (
            <div key={op.id} className="rounded-xl2 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-navy-800">
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-amber2-50 p-2 text-amber2-600 dark:bg-amber2-500/10">
                  <Icon size={17} />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{op.estimatedCost}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-slate-900 dark:text-white">{op.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{op.description}</p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                {university?.shortName} {challenge && `· ${challenge.displayId}`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-lg bg-royal-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-royal-700">Offer support</button>
                <button className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 dark:border-white/10 dark:text-slate-200">Provide mentor</button>
                <button className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 dark:border-white/10 dark:text-slate-200">Sponsor pilot</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
