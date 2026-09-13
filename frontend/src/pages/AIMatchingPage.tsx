import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareText, Brain, Tags, SearchCode, GraduationCap, ListOrdered, Award, ArrowDown } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { aiService } from "../services/aiService";
import { matchingService } from "../services/matchingService";
import { getUniversityById } from "../data/universities";
import { UniversityMatchCard } from "../components/UniversityMatchCard";
import { AIAnalysisCard } from "../components/AIAnalysisCard";
import type { AIAnalysis, UniversityMatch } from "../types";

const pipelineStages = [
  { icon: MessageSquareText, title: "Citizen problem", desc: "Unstructured, real-world description" },
  { icon: Brain, title: "NLP understanding", desc: "Extracts what, where, who is affected" },
  { icon: Tags, title: "Problem classification", desc: "Assigns category and severity" },
  { icon: SearchCode, title: "Semantic search", desc: "Checks for duplicate/similar challenges" },
  { icon: GraduationCap, title: "Expertise matching", desc: "Maps problem to required domains" },
  { icon: ListOrdered, title: "Institution ranking", desc: "Weighted scoring across institutions" },
  { icon: Award, title: "Best match", desc: "Transparent, explainable recommendation" },
];

const WEIGHTS = [
  { name: "Expertise", value: 30, color: "#2451FF" },
  { name: "Past performance", value: 20, color: "#4F46E5" },
  { name: "Infrastructure", value: 15, color: "#10B981" },
  { name: "Faculty availability", value: 15, color: "#F59E0B" },
  { name: "Proximity", value: 10, color: "#8B5CF6" },
  { name: "Current workload", value: 10, color: "#64748B" },
];

const SAMPLE_INPUT = "Village well water has become contaminated after nearby industrial discharge.";

export default function AIMatchingPage() {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [matches, setMatches] = useState<UniversityMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await aiService.analyzeProblem({ title: "Village well contamination", description: SAMPLE_INPUT, affectedCitizens: 850, district: "Ranchi" });
      setAnalysis(result);
      const ranked = await matchingService.matchUniversities(result, 23.3441, 85.3096, 3);
      setMatches(ranked);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="inline-flex items-center rounded-full bg-royal-50 px-3 py-1 text-xs font-medium text-royal-700 dark:bg-royal-500/10 dark:text-royal-400">
          AI matching engine
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
          Not "which officer" — which institution can actually solve this?
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Every problem passes through the same explainable pipeline before it ever reaches a university.
        </p>
      </div>

      {/* PIPELINE */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pipelineStages.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl2 border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-navy-800"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-50 text-royal-600 dark:bg-royal-500/10 dark:text-royal-400">
              <s.icon size={17} />
            </div>
            <h3 className="mt-3 font-display text-sm font-semibold text-slate-900 dark:text-white">{s.title}</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* LIVE EXAMPLE */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Live example</h2>
        <div className="mt-4 rounded-xl2 border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Citizen input</span>
          <p className="mt-1.5 font-display text-base text-slate-800 dark:text-slate-100">"{SAMPLE_INPUT}"</p>
        </div>

        <div className="my-4 flex justify-center text-slate-300 dark:text-slate-600"><ArrowDown size={18} /></div>

        {loading || !analysis ? (
          <div className="h-40 animate-pulse rounded-xl2 bg-slate-100 dark:bg-white/5" />
        ) : (
          <AIAnalysisCard analysis={analysis} />
        )}
      </div>

      {/* SCORING WEIGHTS */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">How the match score is calculated</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Six weighted factors combine into a single, transparent match percentage shown to every institution and citizen.
          </p>
          <ul className="mt-5 space-y-2">
            {WEIGHTS.map((w) => (
              <li key={w.name} className="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2 text-sm dark:border-white/10">
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: w.color }} /> {w.name}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{w.value}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={WEIGHTS} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                {WEIGHTS.map((w) => <Cell key={w.name} fill={w.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RANKING RESULT */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">Resulting institution ranking</h2>
        <div className="mt-5 space-y-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 animate-pulse rounded-xl2 bg-slate-100 dark:bg-white/5" />)
            : matches.map((m, i) => {
                const uni = getUniversityById(m.universityId)!;
                return <UniversityMatchCard key={m.universityId} university={uni} match={m} rank={i + 1} best={i === 0} />;
              })}
        </div>
      </div>
    </div>
  );
}
