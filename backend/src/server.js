import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./utils/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import governmentRoutes from "./routes/governmentRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "civicbridge-backend" }));

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/government", governmentRoutes);
app.use("/api/industry", industryRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().finally(() => {
  app.listen(PORT, () => console.log(`[civicbridge-backend] listening on port ${PORT}`));
});
