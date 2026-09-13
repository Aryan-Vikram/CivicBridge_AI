// Thin client for the Python AI microservice (see /ai-service).
// Falls back to a deterministic local mock if the AI service is
// unreachable, so problem submission never breaks in demo mode.

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

async function callAI(path, body) {
  try {
    const res = await fetch(`${AI_SERVICE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`AI service responded ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[aiClient] Falling back to local mock for ${path}:`, err.message);
    return mockResponse(path, body);
  }
}

function mockResponse(path, body) {
  const text = `${body.title || ""} ${body.description || ""}`.toLowerCase();
  const category = text.includes("water") ? "Water Management" : text.includes("road") || text.includes("bridge") ? "Infrastructure" : "Public Safety";
  const severity = body.affectedCitizens > 1000 ? "Critical" : body.affectedCitizens > 400 ? "High" : "Medium";

  if (path === "/ai/analyze-problem") {
    return {
      category,
      severity,
      priority_score: severity === "Critical" ? 9.1 : severity === "High" ? 7.8 : 6.0,
      affected_population: body.affectedCitizens || 0,
      required_expertise: ["Environmental Engineering", "Civil Engineering"],
      confidence: 0.85,
    };
  }
  if (path === "/ai/match-university") return { matches: [] };
  if (path === "/ai/detect-duplicates") return { duplicates: [] };
  return {};
}

export const aiClient = {
  analyzeProblem: (payload) => callAI("/ai/analyze-problem", payload),
  detectDuplicates: (payload) => callAI("/ai/detect-duplicates", payload),
  matchUniversity: (payload) => callAI("/ai/match-university", payload),
  explainMatch: (payload) => callAI("/ai/explain-match", payload),
};
