import { Link } from "react-router-dom";
import { User, Sparkles, GitBranch, ShieldCheck, Gauge, GraduationCap, Users, FlaskConical, Factory, Landmark, MapPinned, TrendingUp, MessageSquareHeart } from "lucide-react";

const stages = [
  { icon: User, title: "Citizen submits a real problem", text: "A citizen reports a societal challenge with description, location, and evidence — photos, video, or documents." },
  { icon: Sparkles, title: "AI understanding", text: "Natural language understanding extracts what happened, where, and who is affected from the unstructured report." },
  { icon: GitBranch, title: "Classification", text: "The problem is classified into a category — Water, Health, Infrastructure, Agriculture, Environment, and more." },
  { icon: ShieldCheck, title: "Duplicate detection", text: "AI checks for similar existing challenges nearby, preventing fragmented, duplicate reports of the same issue." },
  { icon: Gauge, title: "Severity & priority", text: "A transparent priority score (1–10) is calculated from severity, affected population, and evidence clarity." },
  { icon: GraduationCap, title: "Smart university matching", text: "Institutions are ranked by expertise, past performance, infrastructure, faculty availability, proximity, and workload." },
  { icon: Users, title: "University acceptance & team formation", text: "The matched university reviews and accepts the challenge, then forms a faculty + student research team." },
  { icon: FlaskConical, title: "Research & prototype", text: "The team researches the problem and develops a solution proposal, then builds and tests a prototype." },
  { icon: Factory, title: "Industry collaboration", text: "Industry partners provide manufacturing, funding, technology, or deployment support to help scale the solution." },
  { icon: Landmark, title: "Government review", text: "Government reviews progress, approves pilots, and coordinates implementation — without becoming a bottleneck." },
  { icon: MapPinned, title: "Field implementation", text: "The solution is deployed and implemented in the field where the original problem was reported." },
  { icon: TrendingUp, title: "Impact measurement", text: "Outcomes are measured against the original problem — citizens benefited, metrics improved, evidence documented." },
  { icon: MessageSquareHeart, title: "Citizen feedback", text: "The citizen who reported the problem sees every milestone and can confirm the real-world impact." },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">How CivicBridge AI works</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Every problem moves through the same transparent pipeline — from a citizen's report to measured, real-world impact.
        </p>
      </div>

      <div className="relative mt-14 space-y-10 border-l border-slate-200 pl-8 dark:border-white/10">
        {stages.map((s, i) => (
          <div key={s.title} className="relative">
            <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border border-royal-200 bg-white text-royal-600 dark:border-royal-500/30 dark:bg-navy-800 dark:text-royal-400">
              <s.icon size={15} />
            </div>
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">Stage {i + 1}</div>
            <h3 className="mt-1 font-display text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-3 rounded-xl2 border border-slate-200 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">See the matching engine in action</h3>
        <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">Walk through a live example of how a real problem gets classified and matched to the right institution.</p>
        <Link to="/ai-matching" className="mt-2 rounded-lg bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal-700">
          Open the AI matching engine
        </Link>
      </div>
    </div>
  );
}
