import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, FileText, Clock, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { challenges } from "../../data/challenges";
import { ChallengeCard } from "../../components/ChallengeCard";
import { useAuth } from "../../context/AuthContext";

export default function CitizenDashboard() {
  const { user } = useAuth();
  // Demo: treat the primary tracked challenge + a couple others as "mine"
  const myChallenges = useMemo(() => challenges.filter((c) => ["c-10452", "c-2", "c-3"].includes(c.id)), []);

  const counts = {
    submitted: myChallenges.length,
    inProgress: myChallenges.filter((c) => !["Completed", "Impact Verification"].includes(c.status)).length,
    resolved: myChallenges.filter((c) => ["Completed", "Impact Verification"].includes(c.status)).length,
    awaiting: myChallenges.filter((c) => c.status === "Government Review").length,
  };

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Here's what's happening with your reported problems.</p>
        </div>
        <Link to="/report" className="flex items-center gap-2 rounded-lg bg-royal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-royal-700">
          <Plus size={15} /> Report a problem
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Submitted", value: counts.submitted, icon: FileText, color: "text-royal-600 bg-royal-50 dark:bg-royal-500/10" },
          { label: "In progress", value: counts.inProgress, icon: Clock, color: "text-amber2-600 bg-amber2-50 dark:bg-amber2-500/10" },
          { label: "Resolved", value: counts.resolved, icon: CheckCircle2, color: "text-emerald2-600 bg-emerald2-50 dark:bg-emerald2-500/10" },
          { label: "Awaiting update", value: counts.awaiting, icon: AlertCircle, color: "text-slate-500 bg-slate-100 dark:bg-white/5" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl2 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-navy-800">
            <div className={`inline-flex rounded-lg p-2 ${s.color}`}><s.icon size={16} /></div>
            <div className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl2 border border-royal-100 bg-royal-50/40 p-5 dark:border-royal-500/20 dark:bg-royal-500/5">
        <div className="flex items-center gap-2 text-royal-700 dark:text-royal-400">
          <Sparkles size={16} />
          <span className="font-display text-sm font-semibold">AI routing intelligence</span>
        </div>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
          Your challenge CB-JH-2026-10452 is matched with BIT Mesra at 94% confidence based on environmental engineering
          expertise, lab infrastructure, and historical success rate.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Your active challenges</h2>
          <Link to="/explore" className="text-sm font-medium text-royal-600 hover:underline">Explore all challenges</Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myChallenges.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
        </div>
      </div>
    </div>
  );
}
