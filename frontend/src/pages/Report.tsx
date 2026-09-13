import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, MapPin, Loader2 } from "lucide-react";
import { EvidenceUploader, type UploadedEvidence } from "../components/EvidenceUploader";
import { AIAnalysisCard } from "../components/AIAnalysisCard";
import { UniversityMatchCard } from "../components/UniversityMatchCard";
import { aiService } from "../services/aiService";
import { matchingService } from "../services/matchingService";
import { problemService } from "../services/problemService";
import { getUniversityById } from "../data/universities";
import type { AIAnalysis, Category, Challenge, UniversityMatch } from "../types";
import { getChallengeById } from "../data/challenges";

const DISTRICTS = ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Dumka", "Giridih"];
const CATEGORIES: Category[] = ["Water Management", "Health", "Education", "Infrastructure", "Agriculture", "Environment", "Waste Management", "Public Safety"];
const DISTRICT_COORDS: Record<string, [number, number]> = {
  Ranchi: [23.3441, 85.3096],
  Jamshedpur: [22.8046, 86.2029],
  Dhanbad: [23.7957, 86.4304],
  Bokaro: [23.6693, 85.9606],
  Deoghar: [24.4823, 86.6957],
  Hazaribagh: [23.9925, 85.363],
  Dumka: [24.2676, 87.2496],
  Giridih: [24.1913, 86.3],
};

const STEP_LABELS = ["Problem", "Evidence", "AI analysis", "AI result", "Smart matching"];

const ANALYSIS_STEPS = [
  "Understanding description",
  "Detecting location",
  "Identifying category",
  "Checking similar challenges",
  "Estimating severity",
  "Extracting expertise",
  "Finding suitable institutions",
];

export default function Report() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [affected, setAffected] = useState<number>(0);
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [evidence, setEvidence] = useState<UploadedEvidence[]>([]);

  const [, setAnalyzing] = useState(false);
  const [visibleAnalysisSteps, setVisibleAnalysisSteps] = useState(0);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [duplicates, setDuplicates] = useState<Challenge[]>([]);
  const [duplicateChoice, setDuplicateChoice] = useState<"separate" | string | null>(null);

  const [matches, setMatches] = useState<UniversityMatch[]>([]);
  const [matching, setMatching] = useState(false);
  const [submitted, setSubmitted] = useState<Challenge | null>(null);

  const canContinueStep0 = title.trim().length > 3 && description.trim().length > 15 && location.trim().length > 2;

  const runAnalysis = async () => {
    setStep(2);
    setAnalyzing(true);
    setVisibleAnalysisSteps(0);
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 420));
      setVisibleAnalysisSteps(i + 1);
    }
    const [result, dupes] = await Promise.all([
      aiService.analyzeProblem({ title, description, affectedCitizens: affected, district }),
      aiService.detectDuplicates({ title, description, affectedCitizens: affected, district }),
    ]);
    setAnalysis(result);
    setDuplicates(dupes);
    setAnalyzing(false);
    setStep(3);
  };

  const runMatching = async () => {
    setStep(4);
    setMatching(true);
    const [lat, lng] = DISTRICT_COORDS[district] || DISTRICT_COORDS.Ranchi;
    const result = await matchingService.matchUniversities(analysis!, lat, lng, 3);
    setMatches(result);
    setMatching(false);
  };

  const handleSubmit = async () => {
    const [lat, lng] = DISTRICT_COORDS[district] || DISTRICT_COORDS.Ranchi;
    const best = matches[0];
    const displayId = problemService.nextDisplayId();
    const totalAffected = duplicateChoice && duplicateChoice !== "separate"
      ? (getChallengeById(duplicateChoice)?.affectedCitizens || 0) + affected
      : affected;

    const challenge: Challenge = {
      id: `c-${displayId.split("-").pop()}`,
      displayId,
      title,
      description,
      location,
      district,
      lat,
      lng,
      category: analysis!.category,
      severity: analysis!.severity,
      priorityScore: analysis!.priorityScore,
      affectedCitizens: totalAffected,
      status: "University Assigned",
      progress: 24,
      evidence: evidence.map((e) => ({ id: e.id, type: e.type, name: e.name, url: "", uploadedAt: new Date().toISOString(), verified: true })),
      aiAnalysis: analysis!,
      similarChallengeIds: duplicates.map((d) => d.id),
      assignedUniversityId: best?.universityId,
      assignedDepartment: analysis!.requiredExpertise[0],
      milestones: [
        { id: "m1", title: "Problem Submitted", description: "Citizen report filed with supporting evidence.", date: new Date().toISOString(), organization: "Citizen", progressPercent: 8, status: "completed" },
        { id: "m2", title: "AI Verified", description: `Classified as ${analysis!.category}, ${analysis!.severity} severity.`, date: new Date().toISOString(), organization: "CivicBridge AI", progressPercent: 16, status: "completed" },
        { id: "m3", title: "University Assigned", description: `Matched with ${best ? getUniversityById(best.universityId)?.shortName : "a suitable institution"} at ${best?.matchScore ?? "--"}% confidence.`, date: new Date().toISOString(), organization: "CivicBridge AI", progressPercent: 24, status: "in-progress" },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedBy: "You",
      verified: true,
    };

    await problemService.create(challenge);
    setSubmitted(challenge);
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald2-50 text-emerald2-600 dark:bg-emerald2-500/10">
          <Check size={28} />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold text-slate-900 dark:text-white">Challenge submitted</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">{submitted.displayId}</span> has been created and matched.
          You can track every milestone from here.
        </p>
        <button
          onClick={() => navigate(`/track/${submitted.displayId}`)}
          className="mt-6 rounded-lg bg-royal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-royal-700"
        >
          Track this challenge
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Report a problem</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Tell us what's happening. AI will handle the rest.</p>

      {/* Stepper */}
      <div className="mt-8 flex items-center gap-1.5">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-1.5">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold " +
                  (i < step ? "bg-emerald2-500 text-white" : i === step ? "bg-royal-600 text-white" : "bg-slate-100 text-slate-400 dark:bg-white/10")
                }
              >
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && <div className={"h-0.5 flex-1 " + (i < step ? "bg-emerald2-400" : "bg-slate-100 dark:bg-white/10")} />}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: PROBLEM */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Water contamination in village well"
                  className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe what's happening, since when, and who is affected..."
                  className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Location</label>
                  <div className="relative mt-1.5">
                    <MapPin size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Village / area name"
                      className="focus-ring w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3.5 text-sm dark:border-white/10 dark:bg-navy-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">District</label>
                  <select value={district} onChange={(e) => setDistrict(e.target.value)} className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800">
                    {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Affected people (approx.)</label>
                  <input
                    type="number"
                    min={0}
                    value={affected || ""}
                    onChange={(e) => setAffected(parseInt(e.target.value) || 0)}
                    placeholder="e.g. 850"
                    className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Duration</label>
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 weeks"
                    className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Category <span className="font-normal text-slate-400">(optional — AI will suggest one)</span></label>
                <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="focus-ring mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800">
                  <option value="">Let AI decide</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </motion.div>
          )}

          {/* STEP 1: EVIDENCE */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <EvidenceUploader files={evidence} onChange={setEvidence} />
              <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">Location and timestamp are captured automatically from your device (simulated in this demo).</p>
            </motion.div>
          )}

          {/* STEP 2: AI ANALYSIS ANIMATION */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl2 border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-navy-800">
              <div className="flex items-center gap-2 text-royal-600 dark:text-royal-400">
                <Loader2 size={18} className="animate-spin" />
                <span className="font-display text-sm font-semibold">Analyzing your challenge...</span>
              </div>
              <ul className="mt-6 space-y-3">
                {ANALYSIS_STEPS.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    {i < visibleAnalysisSteps ? (
                      <Check size={16} className="text-emerald2-500" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border-2 border-slate-200 dark:border-white/15" />
                    )}
                    <span className={i < visibleAnalysisSteps ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* STEP 3: AI RESULT */}
          {step === 3 && analysis && (
            <motion.div key="s3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-6">
              <AIAnalysisCard analysis={analysis} />

              {duplicates.length > 0 && (
                <div className="rounded-xl2 border border-amber2-200 bg-amber2-50/50 p-5 dark:border-amber2-500/30 dark:bg-amber2-500/5">
                  <h3 className="font-display text-sm font-semibold text-amber2-700 dark:text-amber2-500">
                    We found {duplicates.length} similar challenge{duplicates.length > 1 ? "s" : ""} nearby
                  </h3>
                  <div className="mt-3 space-y-2">
                    {duplicates.map((d) => (
                      <label key={d.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800">
                        <input type="radio" name="dup" checked={duplicateChoice === d.id} onChange={() => setDuplicateChoice(d.id)} />
                        <span className="flex-1">{d.title} <span className="text-slate-400">· {d.displayId}</span></span>
                      </label>
                    ))}
                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-white/10 dark:bg-navy-800">
                      <input type="radio" name="dup" checked={duplicateChoice === "separate" || duplicateChoice === null} onChange={() => setDuplicateChoice("separate")} />
                      Submit as a separate challenge
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: SMART MATCHING */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
              {matching ? (
                <div className="rounded-xl2 border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-navy-800">
                  <Loader2 size={22} className="mx-auto animate-spin text-royal-600" />
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Ranking institutions by expertise, performance and capacity...</p>
                </div>
              ) : (
                matches.map((m, i) => {
                  const uni = getUniversityById(m.universityId)!;
                  return <UniversityMatchCard key={m.universityId} university={uni} match={m} rank={i + 1} best={i === 0} />;
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* NAV BUTTONS */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || step === 2 || matching}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 disabled:opacity-0 dark:text-slate-400"
        >
          <ChevronLeft size={15} /> Back
        </button>

        {step === 0 && (
          <button
            onClick={() => setStep(1)}
            disabled={!canContinueStep0}
            className="flex items-center gap-1.5 rounded-lg bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            Continue <ChevronRight size={15} />
          </button>
        )}
        {step === 1 && (
          <button onClick={runAnalysis} className="flex items-center gap-1.5 rounded-lg bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white">
            Run AI analysis <ChevronRight size={15} />
          </button>
        )}
        {step === 3 && (
          <button onClick={runMatching} className="flex items-center gap-1.5 rounded-lg bg-royal-600 px-5 py-2.5 text-sm font-semibold text-white">
            Find matching universities <ChevronRight size={15} />
          </button>
        )}
        {step === 4 && !matching && matches.length > 0 && (
          <button onClick={handleSubmit} className="flex items-center gap-1.5 rounded-lg bg-emerald2-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald2-500">
            Submit challenge <Check size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
