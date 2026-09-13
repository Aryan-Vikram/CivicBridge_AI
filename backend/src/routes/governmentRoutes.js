import { Router } from "express";
import { analytics } from "../controllers/governmentController.js";

const router = Router();
router.get("/analytics", analytics);
export default router;
