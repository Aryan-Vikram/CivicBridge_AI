import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { AlertTriangle, Landmark, GraduationCap } from "lucide-react";
import { challenges } from "../../data/challenges";
import { universities } from "../../data/universities";
import { StatCard } from "../../components/StatCard";
import { StatusPill } from "../../components/StatusBadge";
import { Link } from "react-router-dom";

const byCategory = Object.entries(
  challenges.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const bySeverity = Object.entries(
  challenges.reduce<Record<string, number>>((acc, c) => {
    acc[c.severity] = (acc[c.severity] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const byDistrict = Object.entries(
  challenges.reduce<Record<string, number>>((acc, c) => {
    acc[c.district] = (acc[c.district] || 0) + 1;
    return acc;
  }, {})
).map(([district, count]) => ({ district, count }));

const SEVERITY_COLORS: Record<string, string> = { Low: "#94A3B8", Medium: "#F59E0B", High: "#2451FF", Critical: "#EF4444" };

const attention = [
  { text: "3 projects delayed beyond expected timeline", severity: "warning" as const },
  { text: "5 critical severity challenges pending university acceptance", severity: "critical" as const },
  { text: "2 university responses pending beyond SLA", severity: "warning" as const },
  { text: "4 field pilots awaiting government approval", severity: "info" as const },
];

export default function GovernmentDashboard() {
  const critical = challenges.filter((c) => c.severity === "Critical").length;
  const implemented = challenges.filter((c) => ["Implementation", "Impact Verification", "Completed"].includes(c.status)).length;
  const activeProjects = challenges.filter((c) => !["Completed"].includes(c.status)).length;

  return (
    <div className="max-w-7xl">
      <div className="flex items-center gap-2 text-royal-600 dark:text-royal-400">
        <Landmark size={18} />
        <span className="text-xs font-semibold uppercase tracking-wide">Government oversight</span>
      </div>
      <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">Jharkhand Societal Challenge Command Center</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        <StatCard label="Total challenges" value={challenges.length} />
        <StatCard label="Critical" value={critical} accent="amber" />
        <StatCard label="Active projects" value={activeProjects} accent="indigo" />
        <StatCard label="Implemented" value={implemented} accent="emerald" />
        <StatCard label="Universities" value={universities.length} accent="violet" />
        <StatCard label="Industry partners" value={41} accent="amber" />
        <StatCard label="Implementation rate" value={62} suffix="%" />
        <StatCard label="Avg. resolution" value={44} suffix="d" />
      </div>

      <div className="mt-10 rounded-xl2 border border-amber2-200 bg-amber2-50/40 p-5 dark:border-amber2-500/30 dark:bg-amber2-500/5">
        <div className="flex items-center gap-2 text-amber2-700 dark:text-amber2-500">
          <AlertTriangle size={16} />
          <span className="font-display text-sm font-semibold">Attention required</span>
        </div>
        <ul className="mt-3 space-y-2">
          {attention.map((a, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 text-sm dark:bg-navy-800">
              <span className="text-slate-700 dark:text-slate-200">{a.text}</span>
              <button className="text-xs font-semibold text-royal-600 hover:underline">Review</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
          <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Problems by district</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byDistrict}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="district" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="count" fill="#2451FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10">
          <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Severity distribution</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bySeverity} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {bySeverity.map((s) => <Cell key={s.name} fill={SEVERITY_COLORS[s.name]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl2 border border-slate-200 p-5 dark:border-white/10 lg:col-span-2">
          <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Problems by category</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="value" fill="#4F46E5" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">University performance</h3>
          <Link to="/universities" className="text-sm font-medium text-royal-600 hover:underline">View network</Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl2 border border-slate-200 dark:border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-white/5 dark:text-slate-500">
              <tr>
                <th className="px-4 py-3">University</th>
                <th className="px-4 py-3">Completed</th>
                <th className="px-4 py-3">Success rate</th>
                <th className="px-4 py-3">Avg. days</th>
                <th className="px-4 py-3">Workload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {universities.map((u) => (
                <tr key={u.id}>
                  <td className="flex items-center gap-2 px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
                    <GraduationCap size={14} className="text-royal-500" /> {u.shortName}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.completedChallenges}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.successRate}%</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.avgCompletionDays}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.currentWorkload}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Recent challenge activity</h3>
        <div className="mt-4 space-y-2">
          {challenges.slice(0, 6).map((c) => (
            <Link key={c.id} to={`/track/${c.displayId}`} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm hover:border-royal-200 dark:border-white/10">
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-100">{c.title}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{c.district} · {c.assignedUniversityId ? universities.find(u=>u.id===c.assignedUniversityId)?.shortName : "Unassigned"}</div>
              </div>
              <StatusPill status={c.status} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
