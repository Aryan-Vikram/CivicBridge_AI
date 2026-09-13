import { Router } from "express";
import { listOpportunities } from "../controllers/industryController.js";

const router = Router();
router.get("/opportunities", listOpportunities);
export default router;
