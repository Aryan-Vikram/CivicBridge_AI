import Problem from "../models/Problem.js";
import { isDbConnected } from "../utils/db.js";
import { demoStore } from "../utils/demoStore.js";
import { aiClient } from "../services/aiClient.js";

function nextDisplayId() {
  const n = 10000 + Math.floor(Math.random() * 90000);
  return `CB-JH-2026-${n}`;
}

export async function listProblems(req, res, next) {
  try {
    const data = isDbConnected ? await Problem.find().sort({ createdAt: -1 }) : demoStore.problems;
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getProblem(req, res, next) {
  try {
    const { id } = req.params;
    const data = isDbConnected
      ? (await Problem.findOne({ $or: [{ _id: id }, { displayId: id }] }))
      : demoStore.problems.find((p) => p.id === id || p.displayId === id);
    if (!data) return res.status(404).json({ error: "Problem not found" });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function createProblem(req, res, next) {
  try {
    const payload = { ...req.body, displayId: nextDisplayId(), status: "Submitted", progress: 5 };
    if (isDbConnected) {
      const created = await Problem.create(payload);
      return res.status(201).json(created);
    }
    const created = { id: `demo-${Date.now()}`, ...payload };
    demoStore.problems.unshift(created);
    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateProblem(req, res, next) {
  try {
    const { id } = req.params;
    if (isDbConnected) {
      const updated = await Problem.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: "Problem not found" });
      return res.json(updated);
    }
    const idx = demoStore.problems.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Problem not found" });
    demoStore.problems[idx] = { ...demoStore.problems[idx], ...req.body };
    return res.json(demoStore.problems[idx]);
  } catch (err) {
    next(err);
  }
}

export async function analyzeProblem(req, res, next) {
  try {
    const result = await aiClient.analyzeProblem(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function matchProblem(req, res, next) {
  try {
    const result = await aiClient.matchUniversity(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function similarProblems(req, res, next) {
  try {
    const result = await aiClient.detectDuplicates(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
