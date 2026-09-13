import Problem from "../models/Problem.js";
import { isDbConnected } from "../utils/db.js";
import { demoStore } from "../utils/demoStore.js";

export async function analytics(req, res, next) {
  try {
    const data = isDbConnected ? await Problem.find() : demoStore.problems;
    const byCategory = {};
    const bySeverity = {};
    data.forEach((p) => {
      byCategory[p.category] = (byCategory[p.category] || 0) + 1;
      bySeverity[p.severity] = (bySeverity[p.severity] || 0) + 1;
    });
    res.json({ total: data.length, byCategory, bySeverity });
  } catch (err) {
    next(err);
  }
}
