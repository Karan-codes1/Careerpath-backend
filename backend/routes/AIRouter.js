import express from 'express'
import ensureAuthenticated from '../Middlewares/Auth.js'
import { generateAIExplanation, generateProjectIdeas } from '../controller/AIController.js';

const router = express.Router();


router.post('/projects',ensureAuthenticated,generateProjectIdeas)
router.post('/explanation',ensureAuthenticated,generateAIExplanation)

export default router