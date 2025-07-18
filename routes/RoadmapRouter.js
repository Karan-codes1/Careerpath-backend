import express from "express"
import ensureAuthenticated from "../Middlewares/Auth.js";
import { createRoadmap,getAllRoadmaps,getRoadmapById} from "../controller/RoadmapController.js";

const router = express.Router();

router.post('/',ensureAuthenticated,createRoadmap)// Only logged in users can createe new roadmap
router.get('/',getAllRoadmaps)
router.get('/:id', getRoadmapById); // get a single roadmap

export default router;