import Milestone from "../models/Milestone.js";
import Resource from "../models/Resource.js";
import User from "../models/User.js";


export const createResource = async(req,res)=>{
    try {
        
        const {title, url , type} = req.body;
        const { milestoneId } = req.params; // Here the name of (milestoneId) is taken because it is described in the route
      //  req.params contains the url contents
        const newResource = new Resource({
            title,
            url,
            type,
            milestone:milestoneId,
        })
    
        await newResource.save();
         await Milestone.findByIdAndUpdate(milestoneId,{
                $push: { resources : newResource._id}
            })
        
        res.status(201).json({message:"Resource created successfully",newResource})

    } catch (error) {
         res.status(500).json({ error: 'Failed to create resource', message: error.message });
    } 
}


export const getResourcesByMilestoneId = async(req,res)=>{
    try {
        const {id} = req.params
        const milestone = await Milestone.findById(id).populate('resources');
        res.status(200).json(milestone.resources);

        res.status(200).json(milestone)
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch resources', message: error.message })
    }
}

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resource', message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Resource not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resource', message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });

    // Remove from milestone's resources array
    await Milestone.findByIdAndUpdate(resource.milestone, {
      $pull: { resources: resource._id },
    });

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource', message: error.message });
  }
};


export const toggleCompleteResource = async(req,res)=>{
  try {
    const userId = req.user._id; 
    const {resourceId} = req.params 
    console.log("resourceId:", resourceId);


    // Find user 
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

        // ✅ Fallback in case completedResources is undefined
    if (!user.completedResources) user.completedResources = [];
    
       const index = user.completedResources.findIndex((id) => {
       return id.toString() === resourceId.toString();
     });


   if (index > -1) {
      // Already completed → uncomplete
      user.completedResources.splice(index, 1); 
                                    // index,num of elements
      await user.save();
      return res.status(200).json({
        message: "Resource marked as incomplete",
        completedResources: user.completedResources,
      });
    } else {
      // Not completed → mark as complete
      user.completedResources.push(resourceId);
      await user.save();
      return res.status(200).json({
        message: "Resource marked as completed",
        completedResources: user.completedResources,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not toggle resource",error:error.message});
  }
}

