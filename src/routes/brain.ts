import jwt from 'jsonwebtoken';
import {config} from '../conifg/env';
import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
import { ContentModel } from '../models/content.model';
import { UserModel } from '../models/user.model';
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
brainRouter.get('/:shareLink', async (req, res)=>{
    const shareHash = req.params.shareLink;
    try {
        const decoded = jwt.verify(shareHash, config.JWT_USER_SECRET);

        if(typeof decoded === 'object' && decoded && 'userId' in decoded){
            const userId = decoded.userId;
            const collections = await ContentModel.find({
                userId: userId
            }).populate('tags userId');

            // remove objectIds
            const finalCollections = collections.map((col)=> (
                {
                    title: col.title,
                    type: col.type,
                    link: col.link,
                    tags: col.tags.map(tag => ((tag as any).title))
                }
            ));

            const user = await UserModel.findOne({
                _id: userId
            });
            const username = (user as any).username;

            return res.status(200).json({
                message: "Collections retrieved succesfully.",
                sharedBy: username,
                collections: finalCollections
            });
        } else {
            return res.status(400).json({message: "Share link has expired."});
        }
    } catch(e) {
        console.error("Error accessing a share link: ", e);
        return res.status(500).json({message: "Failed to access share link."});
    }
})