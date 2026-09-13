import type { AIAnalysis, MatchReason, University, UniversityMatch } from "../types";
import { universities } from "../data/universities";

// Weighting scheme shown on the /ai-matching page:
// 30% expertise · 20% past performance · 15% infrastructure
// 15% faculty availability · 10% proximity · 10% current workload
const WEIGHTS = {
  expertise: 0.3,
  pastPerformance: 0.2,
  infrastructure: 0.15,
  facultyAvailability: 0.15,
  proximity: 0.1,
  workload: 0.1,
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function scoreExpertise(u: University, required: string[]) {
  const hits = required.filter((r) => u.topExpertise.some((e) => e.toLowerCase().includes(r.toLowerCase()) || r.toLowerCase().includes(e.toLowerCase())));
  return Math.min(100, (hits.length / Math.max(1, required.length)) * 100);
}

function delay<T>(value: T, ms = 1100): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const matchingService = {
  /** POST /ai/match-university equivalent */
  async matchUniversities(analysis: AIAnalysis, problemLat: number, problemLng: number, limit = 3): Promise<UniversityMatch[]> {
    const scored = universities.map((u) => {
      const expertise = scoreExpertise(u, analysis.requiredExpertise);
      const pastPerformance = u.successRate;
      const infrastructure = Math.min(100, u.labs.length * 30 + 10);
      const facultyAvailability = Math.min(100, u.faculty.length * 28 + 16);
      const distanceKm = haversineKm(problemLat, problemLng, u.lat, u.lng);
      const proximity = Math.max(10, 100 - distanceKm * 1.1);
      const workload = Math.max(10, 100 - u.currentWorkload);

      const breakdown = { expertise, pastPerformance, infrastructure, facultyAvailability, proximity, workload };
      const matchScore = Math.round(
        expertise * WEIGHTS.expertise +
          pastPerformance * WEIGHTS.pastPerformance +
          infrastructure * WEIGHTS.infrastructure +
          facultyAvailability * WEIGHTS.facultyAvailability +
          proximity * WEIGHTS.proximity +
          workload * WEIGHTS.workload
      );

      const reasons: MatchReason[] = [
        { label: `${analysis.requiredExpertise[0] || "Relevant"} expertise on faculty`, positive: expertise > 50 },
        { label: `${u.completedChallenges} similar completed projects`, positive: u.completedChallenges > 15 },
        { label: "Required laboratory infrastructure available", positive: infrastructure > 60 },
        { label: "Faculty specialization available", positive: facultyAvailability > 55 },
        { label: `${u.successRate}% historical project success`, positive: u.successRate > 80 },
        { label: `Current workload at ${u.currentWorkload}%`, positive: u.currentWorkload < 75 },
        { label: `${Math.round(distanceKm)} km from problem location`, positive: distanceKm < 120 },
      ];

      return { universityId: u.id, matchScore, reasons, breakdown };
    });

    const ranked = scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
    return delay(ranked, 1200);
  },

  /** POST /ai/explain-match equivalent */
  async explainMatch(match: UniversityMatch): Promise<string[]> {
    return delay(match.reasons.filter((r) => r.positive).map((r) => r.label), 300);
  },
};
