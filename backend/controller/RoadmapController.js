import Roadmap from "../models/Roadmap.js";
import Progress from "../models/Progress.js";

export const createMultipleRoadmaps = async (req, res) => {
  try {
    const roadmaps = req.body;

    if (!Array.isArray(roadmaps) || roadmaps.length === 0) {
      return res.status(400).json({ message: "Invalid input. Expected an array of roadmaps." });
    }

    // Attach user ID to each roadmap if available
    const userId = req.user?._id;
    const roadmapsWithUser = roadmaps.map((roadmap) => ({
      ...roadmap,
      createdBy: userId || null,
    }));

    const createdRoadmaps = await Roadmap.insertMany(roadmapsWithUser);
    return res.status(201).json({
      message: `${createdRoadmaps.length} roadmaps created successfully`,
      roadmaps: createdRoadmaps,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// CREATE Roadmap
export const createRoadmap = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      icon,
      duration,
      difficulty,
      learners,
      skills,
    } = req.body;

    const newRoadmap = new Roadmap({
      title,
      description,
      category,
      icon,
      duration,
      difficulty,
      learners: learners || 0,
      skills: skills || [],
      createdBy: req.user._id,
    });

    await newRoadmap.save();
    return res.status(201).json({ message: "Roadmap created", roadmap: newRoadmap });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// GET All Roadmaps
export const getAllRoadmaps = async (req, res) => {
  try {
    const allroadmaps = await Roadmap.find().select(
      "title description category icon duration difficulty learners skills"
    );
    return res.status(200).json({ allroadmaps });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET Single Roadmap by ID
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate('milestones');
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });

    return res.status(200).json({ roadmap, milestones: roadmap.milestones });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getRoadmapProgress = async(req,res)=>{
  try {
    const userid = req.user._id
    const roadmapId = req.params.roadmapId

    const roadmap = await Roadmap.findById(roadmapId).populate('milestones')
    if(!roadmap){
      return res.status(404).json({ message: "Roadmap not found" });
    }

    const totalMilestones = roadmap.milestones.length;
 
    const progress = await Progress.findOne({
      user: userid,
      roadmap : roadmapId,
    })
    
    const completedMilestones = progress ? progress.completedMilestones.length :0
     const progressPercentage = totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0;
    
       return res.status(200).json({
      roadmapId,
      // totalMilestones,
      // completedMilestones,
      progressPercentage,
      completedMilestoneIds: progress?.completedMilestones || [],
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}