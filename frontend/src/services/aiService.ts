import type { AIAnalysis, Category, Severity } from "../types";
import { challenges } from "../data/challenges";

// ---------------------------------------------------------------------------
// This module is an abstraction layer over the AI capabilities described in
// the CivicBridge AI FastAPI service (/ai/analyze-problem, /ai/classify, etc).
// In this prototype it returns deterministic, keyword-driven results so the
// full product experience works offline. Swapping in a real LLM/embeddings
// backend later only requires changing the function bodies below — every
// caller in the UI already talks to this interface.
// ---------------------------------------------------------------------------

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  "Water Management": ["water", "well", "contaminat", "borewell", "drink", "pond", "groundwater", "irrigation supply"],
  Health: ["health", "medicine", "clinic", "phc", "illness", "disease", "immunisation", "hospital"],
  Education: ["school", "student", "classroom", "teacher", "education"],
  Infrastructure: ["road", "bridge", "electricity", "transformer", "transport", "building", "crack", "light"],
  Agriculture: ["crop", "farm", "irrigation", "soil", "harvest", "hailstorm", "drought"],
  Environment: ["air quality", "pollution", "emission", "groundwater table", "environment", "industrial discharge"],
  "Waste Management": ["waste", "garbage", "dump", "sewage", "overflow", "bin"],
  "Public Safety": ["safety", "manhole", "accident", "unsafe", "crime", "lighting"],
};

const EXPERTISE_MAP: Record<Category, string[]> = {
  "Water Management": ["Environmental Engineering", "Civil Engineering", "Water Resources", "Chemistry"],
  Health: ["Public Health", "Supply Chain Analytics", "Community Medicine"],
  Education: ["Education Policy", "Civil Engineering", "Social Work"],
  Infrastructure: ["Civil Engineering", "Structural Engineering", "Urban Planning"],
  Agriculture: ["Agriculture Sciences", "Irrigation Planning", "Soil Science"],
  Environment: ["Environmental Science", "Air Quality Monitoring", "Groundwater Systems"],
  "Waste Management": ["Environmental Engineering", "Urban Infrastructure", "Waste Management"],
  "Public Safety": ["Urban Design", "Public Safety Engineering", "Electrical Engineering"],
};

function detectCategory(text: string): Category {
  const lower = text.toLowerCase();
  let best: Category = "Infrastructure";
  let bestScore = -1;
  (Object.keys(CATEGORY_KEYWORDS) as Category[]).forEach((cat) => {
    const score = CATEGORY_KEYWORDS[cat].filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  });
  return best;
}

function detectSeverity(text: string, affected: number): Severity {
  const lower = text.toLowerCase();
  const criticalWords = ["contaminat", "collapse", "critical", "outbreak", "toxic", "death"];
  const highWords = ["shortage", "illness", "damage", "unsafe", "failure", "overflow"];
  if (criticalWords.some((w) => lower.includes(w)) || affected > 2500) return "Critical";
  if (highWords.some((w) => lower.includes(w)) || affected > 800) return "High";
  if (affected > 200) return "Medium";
  return "Low";
}

function severityWeight(s: Severity) {
  return { Low: 3.5, Medium: 5.8, High: 7.8, Critical: 9.2 }[s];
}

export interface AnalyzeInput {
  title: string;
  description: string;
  affectedCitizens: number;
  district?: string;
}

function delay<T>(value: T, ms = 900): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const aiService = {
  /** POST /ai/classify equivalent */
  async classify(input: AnalyzeInput): Promise<Category> {
    return delay(detectCategory(`${input.title} ${input.description}`), 400);
  },

  /** POST /ai/analyze-problem equivalent */
  async analyzeProblem(input: AnalyzeInput): Promise<AIAnalysis> {
    const text = `${input.title} ${input.description}`;
    const category = detectCategory(text);
    const severity = detectSeverity(text, input.affectedCitizens || 0);
    const base = severityWeight(severity);
    const jitter = Math.round((Math.random() * 0.6 - 0.3) * 10) / 10;
    const priorityScore = Math.min(10, Math.max(1, Math.round((base + jitter) * 10) / 10));
    const similar = challenges.filter((c) => c.category === category && c.district === input.district).length;

    const reasoning = [
      `Description matched strongest to "${category}" based on key terms and context`,
      `Estimated ${input.affectedCitizens || "an unspecified number of"} affected residents factored into severity`,
      similar > 0
        ? `Found ${similar} historically related challenge${similar === 1 ? "" : "s"} in the same district`
        : "No closely related historical challenges found in this district",
      "Confidence reflects clarity of description and completeness of evidence",
    ];

    return delay(
      {
        category,
        severity,
        priorityScore,
        estimatedAffected: input.affectedCitizens || 0,
        similarChallengeCount: similar,
        requiredExpertise: EXPERTISE_MAP[category],
        confidence: 0.82 + Math.random() * 0.14,
        reasoning,
      },
      1400
    );
  },

  /** POST /ai/detect-duplicates equivalent */
  async detectDuplicates(input: AnalyzeInput) {
    const category = detectCategory(`${input.title} ${input.description}`);
    const matches = challenges
      .filter((c) => c.category === category && (!input.district || c.district === input.district))
      .slice(0, 3);
    return delay(matches, 700);
  },

  /** POST /ai/calculate-priority equivalent (exposed separately per spec) */
  async calculatePriority(severity: Severity, affected: number): Promise<number> {
    const base = severityWeight(severity);
    const affectedBoost = Math.min(1.2, affected / 3000);
    return delay(Math.min(10, Math.round((base + affectedBoost) * 10) / 10), 300);
  },
};
