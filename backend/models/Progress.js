import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roadmap: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  completedMilestones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Milestone" }],
}, { timestamps: true });

export default mongoose.model("Progress", progressSchema);