import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
import { validateContent } from '../middlewares/validate';
import { ContentModel } from '../models/content.model';
import { TagModel } from '../models/tag.model';
import jwt from 'jsonwebtoken';
import { config } from '../conifg/env';
import { UserModel } from '../models/user.model';
export const contentRouter = Router();

// Handles adding new content
contentRouter.post('/', authMiddleware, validateContent, async (req, res)=>{
    const {link, type, title, tags, userId} = req.body;

    // TODO: check if tags already exist
    const existingTags = await TagModel.find({
        title: {$in: tags}
    });

    const existingTagTitles = existingTags.map((tag) => tag.title);

    const tagsNotPresent = tags.filter((tag: string) => !(existingTagTitles.includes(tag)));
    
    const newTags = await TagModel.insertMany(
        tagsNotPresent.map((title: string) => ({title}))
    )

    const allTagIds = [
        ...existingTags.map(tag => tag._id),
        ...newTags.map(tag => tag._id)
    ]

    try {
        await ContentModel.create({
            link, 
            type, 
            title, 
            tags: allTagIds, 
            userId
        });
        return res.status(200).json({
            message: "Document successfully created."
        })
    } catch(e) {
        console.error("An internal server error occurred while creating a new document. Error: " + e);
        return res.status(500).json({
            message: "An internal server error occurred while creating a new document. Please try again after some time."
        })
    }
})

// Fetches all existing documents (no pagination)
contentRouter.get('/', authMiddleware, async (req, res)=>{
    const userId = req.userId;

    try {
        const docs = await ContentModel.find({
            userId
        }).populate('tags');

        const user = await UserModel.findOne({
            _id: userId
        });

        const username = (user as any).username;

        return res.status(200).json({
            message: "Collections retrieved successfully",
            username: username,
            collections: docs.map((doc) => ({
                link: doc.link,
                type: doc.type,
                title: doc.title,
                tags: doc.tags.map((tag: any) => (tag.title))
            }))
        })
    } catch(e) {
        console.error("Error while fetching user's documents: " + e);
        return res.status(500).json({
            message: "An unexpected error occurred. Please try again later."
        })
    }
})

// Deletes a document
contentRouter.delete('/:id', authMiddleware, async (req, res)=>{
    const {id}= req.params;
    const userId = req.userId;

    try {
        const result = await ContentModel.deleteOne({
            _id: id,
            userId: userId
        });

        if(result.deletedCount === 0){
            return res.status(400).json({
                message: "Document not found or not authorized."
            })
        }

        return res.status(200).json({
            message: "Document deleted."
        })
    } catch(e) {
        console.error("Error while deleting document: " + e);
        return res.status(500).json({
            message: "Internal server error. Could not delete the document."
        })
    }
})


// Creates a sharable link for the user's specified collection
contentRouter.get('/share/:contentId', authMiddleware, (req, res)=>{
    // Logic: response should include {userId, contentId} with JWT signature
    // Anyone with a shareHash (a jwt payload) can access the collection
    const userId = req.userId;
    const contentId = req.params.contentId;

    try{
        const shareHash = jwt.sign({
            userId: userId,
            contentId: contentId
        }, config.JWT_USER_SECRET);

        return res.status(200).json({
            message: "Share link created.",
            shareHash: shareHash
        });
    } catch(e){
        console.error("Error creating share link: ", e);
        return res.status(500).json({ message: "Failed to create share link." })
    }
})