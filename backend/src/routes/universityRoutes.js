import { Router } from "express";
import { listUniversities, getUniversity } from "../controllers/universityController.js";

const router = Router();
router.get("/", listUniversities);
router.get("/:id", getUniversity);
export default router;
