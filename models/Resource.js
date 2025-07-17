import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // Resource title (e.g., "Intro to HTML")
    url: { type: String, required: true, trim: true },   // Link to the resource
    type: { 
      type: String, 
      enum: ['video', 'article', 'book', 'course'], 
      required: true 
    }, // Resource type for filtering
    milestone: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Milestone', 
      required: true 
    }, // Link to the milestone it belongs to
  },
  { timestamps: true }
);

const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
export default Resource;
