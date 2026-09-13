import { Router } from "express";
import Problem from "../models/Problem.js";
import { isDbConnected } from "../utils/db.js";
import { demoStore } from "../utils/demoStore.js";

const router = Router();

router.post("/:id/accept", async (req, res, next) => {
  try {
    const update = { status: "University Accepted" };
    if (isDbConnected) {
      const updated = await Problem.findByIdAndUpdate(req.params.id, update, { new: true });
      return res.json(updated);
    }
    const p = demoStore.problems.find((x) => x.id === req.params.id);
    if (p) Object.assign(p, update);
    res.json(p || { message: "Accepted (demo mode)" });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/milestones", async (req, res, next) => {
  try {
    const milestone = req.body;
    if (isDbConnected) {
      const updated = await Problem.findByIdAndUpdate(req.params.id, { $push: { milestones: milestone } }, { new: true });
      return res.json(updated);
    }
    const p = demoStore.problems.find((x) => x.id === req.params.id);
    if (p) {
      p.milestones = p.milestones || [];
      p.milestones.push(milestone);
    }
    res.json(p || { message: "Milestone added (demo mode)" });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/timeline", async (req, res, next) => {
  try {
    const data = isDbConnected
      ? await Problem.findById(req.params.id)
      : demoStore.problems.find((p) => p.id === req.params.id);
    res.json(data?.milestones || []);
  } catch (err) {
    next(err);
  }
});

export default router;
