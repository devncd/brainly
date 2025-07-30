import jwt from 'jsonwebtoken';
import {config} from '../conifg/env';
import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
export const brainRouter = Router();

// Creates a sharable link for the user's second brain
brainRouter.get('/share', authMiddleware, (req, res)=>{
    // Logic: response should include userId with JWT signature
    // Anyone with a shareHash (a jwt payload) can access the user's collections
    const userId = req.userId;

    try {
        const shareHash = jwt.sign({
            userId: userId
        }, config.JWT_USER_SECRET);

        return res.status(200).json({
            message: "Share link created.",
            shareHash: shareHash
        });
    } catch(e) {
        console.error("Error creating share link: ", e);
        return res.status(500).json({ message: "Failed to create share link." })
    }
})

// Fetches the content of another user's second brain
brainRouter.get('/:shareLink', (req, res)=>{

})