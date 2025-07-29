import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
export const contentRouter = Router();

// Handles adding new content
contentRouter.post('/', authMiddleware, (req, res)=>{

})

// Fetches all existing documents (no pagination)
contentRouter.get('/', authMiddleware, (req, res)=>{

})

// Deletes a document
contentRouter.delete('/', authMiddleware, (req, res)=>{

})