import express from "express"
import ensureAuthenticated from "../Middlewares/Auth.js";
import { createMultipleRoadmaps, createRoadmap,getAllRoadmaps,getRoadmapById, getRoadmapProgress} from "../controller/RoadmapController.js";


const router = express.Router();

router.post('/',ensureAuthenticated,createMultipleRoadmaps)// Only logged in users can createe new roadmap
router.get('/',getAllRoadmaps)
router.get('/:id', getRoadmapById); // get a single roadmap
router.get('/:roadmapId/progress',ensureAuthenticated,getRoadmapProgress)

export default router;