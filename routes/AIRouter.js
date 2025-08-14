import express from 'express'
import ensureAuthenticated from '../Middlewares/Auth.js'
import { generateProjectIdeas } from '../controller/AIController.js';

const router = express.Router();


router.post('/projects',ensureAuthenticated,generateProjectIdeas)

export default router