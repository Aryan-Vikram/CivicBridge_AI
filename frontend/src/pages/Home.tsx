import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, ShieldCheck, GraduationCap, Factory, Landmark, X, Check } from "lucide-react";
import { WorkflowPipeline } from "../components/WorkflowPipeline";
import { StatCard } from "../components/StatCard";
import { MapPanel } from "../components/MapPanel";
import { SceneSlideshow } from "../components/SceneSlideshow";
import { challenges } from "../data/challenges";
import { universities } from "../data/universities";

const trust = [
  { icon: Sparkles, label: "AI-powered routing" },
  { icon: ShieldCheck, label: "Transparent tracking" },
  { icon: GraduationCap, label: "University collaboration" },
  { icon: Factory, label: "Industry support" },
  { icon: Landmark, label: "Government oversight" },
];

const caseStudy = [
  { label: "Before", text: "Unsafe village drinking water" },
  { label: "Research", text: "University environmental engineering team" },
  { label: "Solution", text: "Low-cost filtration prototype" },
  { label: "Pilot", text: "50 households" },
  { label: "After", text: "Safe drinking water access" },
];

export default function Home() {
  const previewChallenges = challenges.slice(0, 20);

  return (
    <div>
      {/* HERO — cinematic auto-changing backdrop */}
      <section className="relative isolate overflow-hidden">
        <SceneSlideshow />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-6xl">
              From public problems<br />to real solutions.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              CivicBridge AI connects citizens, universities, government and industry to transform real societal
              challenges into measurable solutions.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/report"
                className="flex items-center gap-2 rounded-xl bg-royal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-royal-600/30 transition hover:-translate-y-0.5 hover:bg-royal-500 hover:shadow-xl"
              >
                Report a problem <ArrowRight size={16} />
              </Link>
              <Link
                to="/explore"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Explore challenges
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-16 max-w-5xl rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8"
          >
            <WorkflowPipeline />
          </motion.div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm text-white/80">
                <t.icon size={15} className="text-white" />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOT ANOTHER COMPLAINT PORTAL */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Not another complaint portal.</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Government portals ask which officer should receive a complaint. CivicBridge AI asks which university,
            expert, research team and industry partner are best equipped to actually solve it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl2 border border-slate-200 p-6 dark:border-white/10">
            <h3 className="font-display text-sm font-semibold text-slate-400 dark:text-slate-500">Traditional complaint portal</h3>
            <div className="mt-5 space-y-4">
              {["Complaint", "Department", "Status update"].map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:bg-white/5 dark:text-slate-400">
                  <X size={15} className="flex-shrink-0 text-slate-300 dark:text-slate-600" /> {s}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl2 border border-royal-200 bg-royal-50/40 p-6 dark:border-royal-500/30 dark:bg-royal-500/5">
            <h3 className="font-display text-sm font-semibold text-royal-700 dark:text-royal-400">CivicBridge AI</h3>
            <div className="mt-5 space-y-3">
              {["Problem", "AI understanding", "Expert matching", "University research", "Industry collaboration", "Implementation & impact"].map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-soft dark:bg-navy-800 dark:text-slate-200">
                  <Check size={15} className="flex-shrink-0 text-emerald2-500" /> {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE METRICS */}
      <section className="border-y border-slate-100 bg-slate-50/60 py-16 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Live platform metrics</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Problems submitted" value={2458} />
            <StatCard label="Active challenges" value={612} accent="indigo" />
            <StatCard label="Solutions implemented" value={145} accent="emerald" />
            <StatCard label="Universities" value={28} accent="violet" />
            <StatCard label="Industry partners" value={41} accent="amber" />
            <StatCard label="Districts covered" value={18} />
          </div>
        </div>
      </section>

      {/* LIVE MAP PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Challenges across Jharkhand</h2>
          <Link to="/explore" className="flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:underline">
            View all challenges <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-6">
          <MapPanel challenges={previewChallenges} height={440} />
        </div>
      </section>

      {/* IMPACT CASE STUDY */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-slate-900 dark:text-white">A problem, followed all the way through</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-5">
            {caseStudy.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative rounded-xl2 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-navy-800"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-royal-600 dark:text-royal-400">{c.label}</span>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.text}</p>
                {i < caseStudy.length - 1 && (
                  <ArrowDown size={16} className="absolute -bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-300 dark:text-slate-600 sm:hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/impact" className="text-sm font-semibold text-royal-600 hover:underline">
              See the full impact dashboard →
            </Link>
          </div>
        </div>
      </section>

      {/* UNIVERSITY NETWORK STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">A growing network of research institutions</h2>
          <Link to="/universities" className="flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:underline">
            View network <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {universities.slice(0, 3).map((u) => (
            <Link
              key={u.id}
              to={`/universities/${u.id}`}
              className="rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-navy-800"
            >
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">{u.shortName}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{u.district} · Civic score {u.civicScore}/100</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {u.topExpertise.slice(0, 2).map((e) => (
                  <span key={e} className="rounded-full bg-royal-50 px-2.5 py-0.5 text-xs text-royal-700 dark:bg-royal-500/10 dark:text-royal-400">{e}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-100 py-20 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Have a societal problem worth solving?</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Submit it in minutes. Let AI find the right minds to work on it.</p>
          <Link
            to="/report"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-royal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-royal-700"
          >
            Report a problem <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
