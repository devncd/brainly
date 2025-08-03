import { Router } from "express";
import { LinkModel } from "../models/link.model";
import { ContentModel } from "../models/content.model";
import { UserModel } from "../models/user.model";
export const sharedRouter = Router();

// Fetches the content of another user's second brain
sharedRouter.get('/b/:shareLink', async (req, res)=>{
    const hash: string = req.params.shareLink;

    try {
        // fetch link
        const link = await LinkModel.findOne({
            hash: hash,
            shareOne: false
        });

        if(!link){
            return res.status(400).json({
                message: "Invalid link."
            })
        }

        const userId = link.userId;

        // fetch user's collections
        const collections = await ContentModel.find({
            userId: userId
        }).populate('tags');

        // fetch user
        const user = await UserModel.findOne({
            _id: userId
        })

        if(collections.length === 0){
            return res.status(200).json({
                message: `${user?.username}'s second brain is empty.`
            })
        }

        // clean data -> remove objectIds from collections and tags
        const finalCollections = collections.map((col)=> (
            {
                id: col._id,
                title: col.title,
                type: col.type,
                link: col.link,
                tags: col.tags.map(tag => ((tag as any).title))
            }
        ));

        return res.status(200).json({
            message: "Collections retrieved succesfully.",
            sharedBy: user?.username,
            collections: finalCollections
        });

    } catch(e) {
        console.error("Error accessing a shared link: ", e);
        return res.status(500).json({message: "Failed to access shared link."});
    }
})

// Fetches a shared collection
sharedRouter.get('/c/:shareLink', async (req, res)=>{
    const hash: string = req.params.shareLink;

    try {
        // fetch link
        const link = await LinkModel.findOne({
            hash: hash,
            shareOne: true
        });

        if(!link){
            return res.status(400).json({
                message: "Invalid link."
            })
        }

        const userId = link.userId;
        const contentId = link.contentId;

        // Inform typescript of the populated type (to access collection.userId.username)
        interface IUser {
            username: string;
        }

        // fetch the collection
        const collection = await ContentModel.findOne({
            _id: contentId,
            userId: userId
        }).populate<{ userId: IUser }>('tags userId');

        if(!collection){
            return res.status(400).json({
                message: "The collection you're trying to access has been deleted."
            })
        }

        const username = collection.userId.username;

        // clean data -> remove objectIds from collection and tags
        const finalCollection = {
                title: collection?.title,
                type: collection?.type,
                link: collection?.link,
                tags: collection?.tags.map(tag => ((tag as any).title))
        };

        return res.status(200).json({
            message: "Collection retrieved succesfully.",
            sharedBy: username,
            collection: finalCollection
        });

    } catch(e) {
        console.error("Error accessing a shared link: ", e);
        return res.status(500).json({message: "Failed to access shared link."});
    }
})