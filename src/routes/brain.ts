import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
export const brainRouter = Router();

// Creates a sharable link for the user's second brain
brainRouter.post('/share', authMiddleware, (req, res)=>{

})

// Fetches the content of another user's second brain
brainRouter.get('/:shareLink', (req, res)=>{

})