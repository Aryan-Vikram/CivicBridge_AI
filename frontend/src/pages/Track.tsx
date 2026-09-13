import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Users, GraduationCap, UserCog, FileText, ImageIcon, MessageSquare, Plus } from "lucide-react";
import { trackingService } from "../services/trackingService";
import { getUniversityById } from "../data/universities";
import { ProgressTimeline } from "../components/ProgressTimeline";
import { SeverityBadge, StatusPill } from "../components/StatusBadge";
import { EmptyState } from "../components/EmptyState";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import type { Challenge } from "../types";

export default function Track() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    trackingService.getChallenge(challengeId || "").then((c) => {
      if (mounted) setChallenge(c ?? null);
    });
    return () => {
      mounted = false;
    };
  }, [challengeId]);

  if (challenge === undefined) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-14">
        <LoadingSkeleton rows={4} />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <EmptyState title="Challenge not found" description={`We couldn't find a challenge with ID "${challengeId}".`} action={<Link to="/explore" className="text-sm font-semibold text-royal-600">Browse challenges</Link>} />
      </div>
    );
  }

  const university = challenge.assignedUniversityId ? getUniversityById(challenge.assignedUniversityId) : undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6 dark:border-white/10">
        <div>
          <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500">{challenge.displayId}</span>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{challenge.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusPill status={challenge.status} />
            <SeverityBadge severity={challenge.severity} />
            <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"><MapPin size={14} /> {challenge.location}</span>
            <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"><Users size={14} /> {challenge.affectedCitizens.toLocaleString("en-IN")} affected</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-bold text-royal-600 dark:text-royal-400">{challenge.progress}%</div>
          <div className="text-xs text-slate-400 dark:text-slate-500">overall progress</div>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        <div className="h-full rounded-full bg-royal-600 transition-all" style={{ width: `${challenge.progress}%` }} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Timeline</h2>
          <div className="mt-5">
            <ProgressTimeline milestones={challenge.milestones} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Assignment</h3>
            {university ? (
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><GraduationCap size={14} className="text-royal-500" /> {university.shortName}</div>
                <div className="text-slate-500 dark:text-slate-400">{challenge.assignedDepartment}</div>
                {challenge.facultyMentor && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><UserCog size={14} className="text-royal-500" /> {challenge.facultyMentor}</div>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">Awaiting assignment.</p>
            )}
          </div>

          {challenge.researchTeam && (
            <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Research team</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {challenge.researchTeam.map((m) => (
                  <li key={m.name} className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-200">{m.name}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Evidence</h3>
            <ul className="mt-3 space-y-2">
              {challenge.evidence.map((e) => (
                <li key={e.id} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  {e.type === "photo" ? <ImageIcon size={14} /> : <FileText size={14} />} {e.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">
              <MessageSquare size={14} /> Ask for update
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">
              <Plus size={14} /> Provide additional evidence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
