import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, X, HelpCircle, Users, FileText, Sparkles } from "lucide-react";
import { getChallengeById } from "../../data/challenges";
import { AIAnalysisCard } from "../../components/AIAnalysisCard";
import { ProgressTimeline } from "../../components/ProgressTimeline";
import { SeverityBadge, StatusPill } from "../../components/StatusBadge";
import { EmptyState } from "../../components/EmptyState";

export default function UniversityChallengeWorkspace() {
  const { id } = useParams();
  const challenge = getChallengeById(id || "");
  const [accepted, setAccepted] = useState(challenge ? challenge.progress > 24 : false);
  const [milestoneNote, setMilestoneNote] = useState("");

  if (!challenge) {
    return <EmptyState title="Challenge not found" action={<Link to="/university/dashboard" className="text-sm font-semibold text-royal-600">Back to dashboard</Link>} />;
  }

  return (
    <div className="max-w-5xl">
      <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500">{challenge.displayId}</span>
      <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">{challenge.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <StatusPill status={challenge.status} />
        <SeverityBadge severity={challenge.severity} />
      </div>

      <div className="mt-6 rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
        <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Problem overview</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{challenge.description}</p>
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{challenge.location}, {challenge.district} · {challenge.affectedCitizens.toLocaleString("en-IN")} citizens affected</p>
      </div>

      <div className="mt-6">
        <AIAnalysisCard analysis={challenge.aiAnalysis} />
      </div>

      {!accepted ? (
        <div className="mt-6 rounded-xl2 border border-royal-200 bg-royal-50/40 p-5 dark:border-royal-500/30 dark:bg-royal-500/5">
          <div className="flex items-center gap-2 text-royal-700 dark:text-royal-400">
            <Sparkles size={16} /> <span className="font-display text-sm font-semibold">Why we were matched</span>
          </div>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
            Matched based on Environmental Engineering expertise, available lab infrastructure, and historical
            success rate on similar water management challenges.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setAccepted(true)} className="flex items-center gap-1.5 rounded-lg bg-emerald2-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald2-500">
              <Check size={14} /> Accept challenge
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:text-slate-200">
              <HelpCircle size={14} /> Request clarification
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-crimson-200 px-4 py-2 text-sm font-medium text-crimson-600 dark:border-crimson-500/30">
              <X size={14} /> Decline with reason
            </button>
          </div>
        </div>
      ) : (
        <>
          {challenge.researchTeam && (
            <div className="mt-6 rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Users size={15} /> <h2 className="font-display text-sm font-semibold">Research team</h2>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {challenge.researchTeam.map((m) => (
                  <li key={m.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-white/5">
                    <span className="text-slate-700 dark:text-slate-200">{m.name}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Timeline & milestones</h2>
            <div className="mt-4"><ProgressTimeline milestones={challenge.milestones} /></div>
          </div>

          <div className="mt-6 rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <FileText size={15} /> <h2 className="font-display text-sm font-semibold">Post a milestone update</h2>
            </div>
            <textarea
              value={milestoneNote}
              onChange={(e) => setMilestoneNote(e.target.value)}
              rows={3}
              placeholder="Describe research progress, test results, or next steps..."
              className="focus-ring mt-3 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-900"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setMilestoneNote("")}
                className="rounded-lg bg-royal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-royal-700"
              >
                Post update
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Updates automatically appear on the citizen's tracking page and the government dashboard.</p>
          </div>
        </>
      )}
    </div>
  );
}
