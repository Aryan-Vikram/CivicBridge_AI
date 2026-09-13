import { Router } from "express";
import {
  listProblems, getProblem, createProblem, updateProblem,
  analyzeProblem, matchProblem, similarProblems,
} from "../controllers/problemController.js";

const router = Router();
router.get("/", listProblems);
router.post("/", createProblem);
router.get("/:id", getProblem);
router.put("/:id", updateProblem);
router.post("/:id/analyze", analyzeProblem);
router.post("/:id/match", matchProblem);
router.get("/:id/similar", similarProblems);
export default router;
