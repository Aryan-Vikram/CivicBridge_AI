import clsx from "clsx";
import type { Severity, ChallengeStatus } from "../types";

const severityStyles: Record<Severity, string> = {
  Low: "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300",
  Medium: "bg-amber2-50 text-amber2-600 dark:bg-amber2-500/10 dark:text-amber2-500",
  High: "bg-royal-50 text-royal-700 dark:bg-royal-500/10 dark:text-royal-400",
  Critical: "bg-crimson-50 text-crimson-600 dark:bg-crimson-500/10 dark:text-crimson-500",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", severityStyles[severity])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {severity} priority
    </span>
  );
}

const statusGroups: Record<string, ChallengeStatus[]> = {
  early: ["Submitted", "AI Verified"],
  assigned: ["University Assigned", "University Accepted", "Team Formed"],
  active: ["Research", "Solution Proposed", "Prototype Testing"],
  review: ["Government Review", "Field Pilot", "Implementation"],
  done: ["Impact Verification", "Completed"],
};

const statusStyles: Record<string, string> = {
  early: "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300",
  assigned: "bg-indigo2-500/10 text-indigo2-600 dark:text-indigo2-500",
  active: "bg-royal-50 text-royal-700 dark:bg-royal-500/10 dark:text-royal-400",
  review: "bg-amber2-50 text-amber2-600 dark:bg-amber2-500/10 dark:text-amber2-500",
  done: "bg-emerald2-50 text-emerald2-600 dark:bg-emerald2-500/10 dark:text-emerald2-500",
};

export function StatusPill({ status }: { status: ChallengeStatus }) {
  const groupKey = Object.entries(statusGroups).find(([, list]) => list.includes(status))?.[0] ?? "early";
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[groupKey])}>
      {status}
    </span>
  );
}

const categoryColors: Record<string, string> = {
  "Water Management": "#2451FF",
  Health: "#EF4444",
  Education: "#8B5CF6",
  Infrastructure: "#4F46E5",
  Agriculture: "#10B981",
  Environment: "#059669",
  "Waste Management": "#D97706",
  "Public Safety": "#DC2626",
};

export function CategoryDot({ category }: { category: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: categoryColors[category] || "#64748B" }} />;
}

export function categoryColor(category: string) {
  return categoryColors[category] || "#64748B";
}
