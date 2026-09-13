import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema(
  { type: String, name: String, url: String, verified: { type: Boolean, default: false } },
  { _id: false }
);

const aiAnalysisSchema = new mongoose.Schema(
  {
    category: String,
    severity: String,
    priorityScore: Number,
    estimatedAffected: Number,
    similarChallengeCount: Number,
    requiredExpertise: [String],
    confidence: Number,
    reasoning: [String],
  },
  { _id: false }
);

const milestoneSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    organization: String,
    progressPercent: Number,
    status: { type: String, enum: ["completed", "in-progress", "upcoming"] },
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    displayId: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: String,
    district: String,
    lat: Number,
    lng: Number,
    category: String,
    severity: String,
    priorityScore: Number,
    affectedCitizens: Number,
    status: { type: String, default: "Submitted" },
    progress: { type: Number, default: 0 },
    evidence: [evidenceSchema],
    aiAnalysis: aiAnalysisSchema,
    similarProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
    assignedUniversity: String,
    assignedDepartment: String,
    assignedTeam: [{ name: String, role: String }],
    milestones: [milestoneSchema],
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Problem || mongoose.model("Problem", problemSchema);
