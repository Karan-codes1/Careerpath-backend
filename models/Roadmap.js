import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }],
  },
  { timestamps: true }
);

const Roadmap = mongoose.models.Roadmap || mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
