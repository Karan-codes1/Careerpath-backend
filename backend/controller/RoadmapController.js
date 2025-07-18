import Roadmap from "../models/Roadmap.js";

export const createRoadmap = async (req,res)=>{
    try {
        const {title,description,category} = req.body;

        const newRoadmap = new Roadmap({
            title,
            description,
            category,
            createdBy:req.user._id,
        })

        await newRoadmap.save()
        return res.status(201).json({ message: 'Roadmap created', roadmap: newRoadmap });
    } catch (error) {
         return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

export const getAllRoadmaps = async(req,res)=>{
    try {
        const allroadmaps = await Roadmap.find()
        return res.status(200).json({allroadmaps})
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


export const getRoadmapById = async(req,res)=>{
    try {
        const roadmap = await Roadmap.findById(req.params.id); 
        if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });  

        return res.status(200).json({ roadmap });

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}    