import { StatCard } from "../components/StatCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowRight } from "lucide-react";

const caseStudy = [
  { label: "Before", text: "Unsafe drinking water access in Barwadih village well after industrial discharge contamination." },
  { label: "Research", text: "BIT Mesra's Environmental Engineering team analysed samples from 6 locations across the village." },
  { label: "Solution", text: "A low-cost multi-stage filtration prototype designed for household-level deployment." },
  { label: "Pilot", text: "Prototype tested and deployed across 50 households over 6 weeks." },
  { label: "After", text: "Verified safe drinking water access restored for the pilot group, ahead of village-wide rollout." },
  { label: "Impact", text: "850 citizens expected to benefit once implementation completes." },
];

const districtImpact = [
  { district: "Ranchi", solved: 38 },
  { district: "Dhanbad", solved: 27 },
  { district: "Jamshedpur", solved: 24 },
  { district: "Bokaro", solved: 16 },
  { district: "Hazaribagh", solved: 12 },
  { district: "Deoghar", solved: 9 },
  { district: "Dumka", solved: 8 },
  { district: "Giridih", solved: 11 },
];

export default function Impact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Impact</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Real outcomes from problems that moved through the full CivicBridge AI pipeline.</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Problems solved" value={145} accent="emerald" />
        <StatCard label="Citizens impacted" value={48210} accent="royal" />
        <StatCard label="Solutions implemented" value={145} accent="indigo" />
        <StatCard label="Districts covered" value={18} />
        <StatCard label="Universities" value={28} accent="violet" />
        <StatCard label="Industry partners" value={41} accent="amber" />
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Solutions implemented by district</h2>
        <div className="mt-5 h-72 rounded-xl2 border border-slate-200 p-4 dark:border-white/10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="district" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 13 }} />
              <Bar dataKey="solved" fill="#2451FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Case study: Barwadih village water contamination</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {caseStudy.map((c) => (
            <div key={c.label} className="rounded-xl2 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-navy-800">
              <span className="text-xs font-semibold uppercase tracking-wide text-royal-600 dark:text-royal-400">{c.label}</span>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.text}</p>
            </div>
          ))}
        </div>
        <a href="/track/CB-JH-2026-10452" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:underline">
          Follow this challenge's full timeline <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
