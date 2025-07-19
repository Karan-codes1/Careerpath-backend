import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    order: { type: Number, required: true }, // for ordering milestones
    roadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },  // ref:'Modelname' means ref takes the model name 
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  },
  { timestamps: true }
);

const Milestone = mongoose.models.Milestone || mongoose.model('Milestone', milestoneSchema);
export default Milestone;
