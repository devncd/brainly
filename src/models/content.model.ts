import {Schema, model, Types} from 'mongoose';
import { UserModel } from './user.model';

const contentTypes = ['image', 'video', 'article', 'audio'];
const contentSchema = new Schema({
    link: {type: String, required: true},
    type: {type: String, required: true, enum: contentTypes},
    title: {type: String, required: true},
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    userId: {type: Types.ObjectId, ref: 'User', required: true}
});

// enforce userId validation
contentSchema.pre('save', async function (next){
    const user = await UserModel.findById(this.userId);
    if(!user){
        console.error("User doesn't exist.");
    }
})

export const ContentModel = model('Content', contentSchema);