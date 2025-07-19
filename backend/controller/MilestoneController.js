import Milestone from "../models/Milestone.js";


export const createMilestone = async(req,res)=>{
    try {
        const {title, description, order,resources} = req.body;
        const { roadmapid } = req.params;

        const milestone = new Milestone({
            title,
            description,
            order,
            roadmap:roadmapid,
            resources})
        await milestone.save();

        res.status(201).json({message:'Milestone created successfully',milestone}); // status 201 indicates resource has been created
    } catch (error) {
        res.status(500).json({ message: 'Error creating milestone', error: error.message });
    }
}

export const getMilestonesByRoadmap = async (req, res) => {
    try {
        const {roadmapid} = req.params;
        const milestones = await Milestone.find({ roadmap:roadmapid }).sort({order:1})
    
        res.status(200).json(milestones);   
    } catch (error) {
         res.status(500).json({ message: 'Error fetching milestones', error: error.message });
    }

}

export const getMilestoneById = async(req, res) => {
    try {
        const { id } = req.params;

        const milestone = await Milestone.findById(id).populate('resources');
        if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

        res.status(200).json(milestone);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching milestone', error: error.message });
    }
}

export const updateMilestone = async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedData = req.body;

        const updateMilestone = await Milestone.findByIdAndUpdate(id,updatedData,{
            new :true,
            runValidators:true
        })
     
/*
 new: true           | Return the updated document instead of the old one                  
 runValidators: true | Ensures that validation rules from the schema are applied on update */
        
        
        res.status(200).json({updateMilestone}) 
    } catch (error) {
        res.status(500).json({message:'Error updating milestone',error:error.message})
    }
}

export const deleteMilestone = async(req,res)=>{
    try {
          const { id } = req.params;
    // console.log("Attempting to delete milestone with ID:", id);

    const milestone = await Milestone.findByIdAndDelete(id);
    // console.log("Result from findByIdAndDelete:", milestone);

    if (!milestone) {
      console.log("Milestone not found or already deleted.");
      return res.status(404).json({ message: 'Milestone not found' });
    }

// In most cases, findByIdAndDelete is preferable because:
// It's more concise
// It's atomic
// It has the same end result
// It's more performant (single roundtrip to database)

        res.status(200).json({ message: 'Milestone deleted successfully' });
    } catch (error) {
         res.status(500).json({ message: 'Error deleting milestone', error: error.message });
    }
}