// In demo mode this reads from a static dataset mirroring the frontend's
// /src/data/universities.ts so the API contract matches what the UI expects
// once a real database is connected.
import universities from "../utils/demoUniversities.js";

export function listUniversities(req, res) {
  res.json(universities);
}

export function getUniversity(req, res) {
  const uni = universities.find((u) => u.id === req.params.id);
  if (!uni) return res.status(404).json({ error: "University not found" });
  res.json(uni);
}
