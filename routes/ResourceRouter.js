import express from 'express'
import ensureAuthenticated from '../Middlewares/Auth.js';
import { createResource, deleteResource, getResourceById, getResourcesByMilestoneId, updateResource } from '../controller/ResourceController.js';

const router = express.Router();

router.post('/:milestoneId', createResource); // Create a new resource for a milestone
router.get('/milestone/:milestoneId', getResourcesByMilestoneId); // Get all resources of a milestone
router.get('/:id',ensureAuthenticated, getResourceById); // Get single resource by ID
router.put('/:id',ensureAuthenticated, updateResource); // Update a resource
router.delete('/:id',ensureAuthenticated, deleteResource); // Delete a resource


export default router
