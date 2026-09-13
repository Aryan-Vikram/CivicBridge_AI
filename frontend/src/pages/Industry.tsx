import { Link } from "react-router-dom";
import { Factory, ArrowRight } from "lucide-react";
import { industryOpportunities } from "../data/industry";
import { getUniversityById } from "../data/universities";
import { getChallengeById } from "../data/challenges";

export default function Industry() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber2-50 px-3 py-1 text-xs font-medium text-amber2-600 dark:bg-amber2-500/10">
          <Factory size={13} /> Industry collaboration
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">Help scale what universities have already proven</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          University research teams develop working prototypes. Industry partners bring manufacturing, funding, technology and
          deployment capacity to take them from pilot to real-world scale.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {industryOpportunities.map((op) => {
          const university = getUniversityById(op.universityId);
          const challenge = getChallengeById(op.challengeId);
          return (
            <div key={op.id} className="rounded-xl2 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-navy-800">
              <span className="rounded-full bg-amber2-50 px-2.5 py-1 text-xs font-medium text-amber2-600 dark:bg-amber2-500/10">{op.needType}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-slate-900 dark:text-white">{op.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{op.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>{university?.shortName}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{op.estimatedCost}</span>
              </div>
              {challenge && (
                <Link to={`/track/${challenge.displayId}`} className="mt-4 flex items-center gap-1.5 text-sm font-medium text-royal-600 hover:underline">
                  View underlying challenge <ArrowRight size={13} />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-xl2 border border-slate-200 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Ready to partner?</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Register as an industry partner to get matched with relevant university-developed solutions.</p>
        <Link to="/register" className="mt-4 inline-block rounded-lg bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal-700">
          Register as industry partner
        </Link>
      </div>
    </div>
  );
}
