import { randomString } from '../utils/randomString';
import { LinkModel } from '../models/link.model';
import mongoose from 'mongoose';
import { authMiddleware } from '../middlewares/auth';
import {Router} from 'express';
import { validateContent } from '../middlewares/validate';
import { ContentModel } from '../models/content.model';
import { TagModel } from '../models/tag.model';
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


// Creates a public shareable link for a collection
contentRouter.post('/share', authMiddleware, async (req, res)=>{
    const userId: string | undefined = req.userId;
    // user passes share:true|false to share|unshare a collection
    const { share, contentId } = req.body;

    try{
        if(share){
            // Check if contentId is a valid ObjectId string (Format check)
            if(!mongoose.Types.ObjectId.isValid(contentId)){
                return res.status(400).json({ message: "Invalid content ID." });
            }

            // validate collection (Existence check)
            const contentExists = await ContentModel.findOne({
                _id: contentId
            });

            if(!contentExists){
                return res.status(400).json({ message: "The collection you are trying to share doesn't exist." })
            }

            // check and return share link if it already exists
            const linkExists = await LinkModel.findOne({
                contentId: contentId
            });

            if(linkExists){
                return res.status(200).json({
                    message: "Public link for collection generated.",
                    shareLink: '/shared/c/' + linkExists.hash
                })
            }
            
            // generate a random share hash
            const hash: string = randomString(20);

            // store link
            await LinkModel.create({
                userId: userId,
                contentId: contentId,
                hash: hash,
                shareOne: true // to share a single collection
            });
            
            return res.status(200).json({
                message: "Public link for collection generated.",
                shareLink: '/share/c/' + hash
            })
        }

        // or else delete the link for this collection
        await LinkModel.deleteOne({
            userId: userId,
            contentId: contentId
        })

        return res.status(200).json({
            message: "Collection unshared."
        });

    } catch(e){
        console.error("Error sharing a collection: ", e);
        return res.status(500).json({ message: "Failed to share your collection." })
    }
})