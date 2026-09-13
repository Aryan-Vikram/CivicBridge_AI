import { useMemo, useState } from "react";
import { Search, LayoutGrid, Map as MapIcon } from "lucide-react";
import { challenges } from "../data/challenges";
import { ChallengeCard } from "../components/ChallengeCard";
import { MapPanel } from "../components/MapPanel";
import { EmptyState } from "../components/EmptyState";
import type { Category, ChallengeStatus, Severity } from "../types";

const TABS = ["All", "Critical", "Trending", "Nearby", "In Progress", "Implemented"] as const;
const CATEGORIES: Category[] = ["Water Management", "Health", "Education", "Infrastructure", "Agriculture", "Environment", "Waste Management", "Public Safety"];
const DISTRICTS = Array.from(new Set(challenges.map((c) => c.district))).sort();

const IN_PROGRESS_STATUSES: ChallengeStatus[] = ["University Assigned", "University Accepted", "Team Formed", "Research", "Solution Proposed", "Prototype Testing", "Government Review", "Field Pilot"];

export default function Explore() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [district, setDistrict] = useState<string>("All");
  const [severity, setSeverity] = useState<Severity | "All">("All");
  const [view, setView] = useState<"grid" | "map">("grid");

  const filtered = useMemo(() => {
    let list = [...challenges];

    if (tab === "Critical") list = list.filter((c) => c.severity === "Critical");
    if (tab === "Trending") list = list.filter((c) => c.affectedCitizens > 800).sort((a, b) => b.affectedCitizens - a.affectedCitizens);
    if (tab === "Nearby") list = list.filter((c) => c.district === "Ranchi");
    if (tab === "In Progress") list = list.filter((c) => IN_PROGRESS_STATUSES.includes(c.status));
    if (tab === "Implemented") list = list.filter((c) => ["Implementation", "Impact Verification", "Completed"].includes(c.status));

    if (category !== "All") list = list.filter((c) => c.category === category);
    if (district !== "All") list = list.filter((c) => c.district === district);
    if (severity !== "All") list = list.filter((c) => c.severity === severity);

    if (query.trim()) {
      const q = query.toLowerCase();
      // naive "natural language" support: pull out a number threshold if present
      const numberMatch = q.match(/(\d+)/);
      const threshold = numberMatch ? parseInt(numberMatch[1], 10) : null;
      const wantsUnresolved = q.includes("unresolved") || q.includes("pending");
      list = list.filter((c) => {
        const textMatch = `${c.title} ${c.description} ${c.category} ${c.district}`.toLowerCase().includes(q.replace(/show|unresolved|problems|affecting|more than|people|pending/g, "").trim() || q);
        const affectedMatch = threshold ? c.affectedCitizens >= threshold : true;
        const statusMatch = wantsUnresolved ? !["Completed", "Impact Verification"].includes(c.status) : true;
        return (textMatch || threshold !== null) && affectedMatch && statusMatch;
      });
    }

    return list;
  }, [tab, category, district, severity, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Explore challenges</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Browse societal problems currently moving through AI matching, university research, and implementation.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl2 border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-navy-800">
        <Search size={16} className="text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "unresolved water problems affecting more than 500 people"'
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition " +
              (tab === t
                ? "bg-royal-600 text-white"
                : "border border-slate-200 text-slate-600 hover:border-slate-300 dark:border-white/10 dark:text-slate-300")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-navy-800">
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-navy-800">
            <option value="All">All districts</option>
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={severity} onChange={(e) => setSeverity(e.target.value as any)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-navy-800">
            <option value="All">All severities</option>
            {(["Low", "Medium", "High", "Critical"] as Severity[]).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-white/10">
          <button onClick={() => setView("grid")} className={"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm " + (view === "grid" ? "bg-slate-100 dark:bg-white/10" : "text-slate-500")}>
            <LayoutGrid size={14} /> List
          </button>
          <button onClick={() => setView("map")} className={"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm " + (view === "map" ? "bg-slate-100 dark:bg-white/10" : "text-slate-500")}>
            <MapIcon size={14} /> Map
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-400 dark:text-slate-500">{filtered.length} challenges found</div>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <EmptyState title="No challenges found" description="Try a different filter or search term." />
        ) : view === "map" ? (
          <MapPanel challenges={filtered} height={560} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
          </div>
        )}
      </div>
    </div>
  );
}
