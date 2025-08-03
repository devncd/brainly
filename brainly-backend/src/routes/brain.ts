import { randomString } from '../utils/randomString';
import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
import { LinkModel } from '../models/link.model';
export const brainRouter = Router();

// Creates a public sharable link for the user's second brain
brainRouter.post('/share', authMiddleware, async (req, res)=>{
    // user passes true or false to share or unshare their brain
    const share: boolean = req.body.share;
    const userId: string | undefined = req.userId;

    try {
        if(share){
            // check and return public link if it already exists
            const linkExists = await LinkModel.findOne({
                userId: userId,
                shareOne: false
            })

            if(linkExists){
                return res.status(200).json({
                    message: "Your second brain is now public.",
                    shareLink: '/shared/b/' + linkExists.hash
                })
            }

            // Create a new link
            // generate a random share hash
            const hash: string = randomString(20);

            // store link
            await LinkModel.create({
                userId: userId,
                hash: hash,
                shareOne: false // to share entire brain
            });
            
            return res.status(200).json({
                message: "Your second brain is now public.",
                shareLink: '/share/' + hash
            })
        }

        // or else delete link
        await LinkModel.deleteOne({
            userId: userId,
            shareOne: false // to filter only shared-brain link
        })

        return res.status(200).json({
            message: "Your second brain is now private."
        });

    } catch(e) {
        console.error("Error sharing brain: ", e);
        return res.status(500).json({ message: "Failed to share/unshare your second brain." })
    }
})