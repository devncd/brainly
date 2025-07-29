import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
import { validateContent } from '../middlewares/validate';
import { ContentModel } from '../models/content.model';
import { TagModel } from '../models/tag.model';
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
        }).populate('tags userId');

        return res.status(200).json({
            message: "Docs retrieved successfully",
            documents: docs.map((doc) => ({
                link: doc.link,
                type: doc.type,
                title: doc.title,
                tags: doc.tags.map((tag: any) => ({
                    // Exclude _id from tag
                    title: tag.title
                })),
                user: {
                    // Exclude _id from tag
                    username: (doc.userId as any).username
                }
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
contentRouter.delete('/', authMiddleware, (req, res)=>{

})