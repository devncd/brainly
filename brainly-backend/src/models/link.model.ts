import {Schema, Types, model} from 'mongoose';
import { UserModel } from './user.model';
import { ContentModel } from './content.model';

const linkSchema = new Schema({
    hash: {type: String, required: true, unique: true},
    userId: {type: Types.ObjectId, required: true, ref: 'User'},
    contentId: {type: Types.ObjectId, ref: 'Content'}, // optional
    shareOne: {type: Boolean, required: true}
});

// enforce userId and contentId validation
linkSchema.pre('save', async function (next){
    const user = await UserModel.findById(this.userId);
    const content = await ContentModel.findById(this.contentId);
    if(!user){
        console.error("User doesn't exist.");
    }
    if(!content){
        console.error("Collection doesn't exist.");
    }
})

export const LinkModel = model('Link', linkSchema);