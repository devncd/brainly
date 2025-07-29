import {Schema, Types, model} from 'mongoose';
import { UserModel } from './user.model';

const linkSchema = new Schema({
    hash: {type: String, required: true, unique: true},
    userId: {type: Types.ObjectId, required: true, ref: 'User'}
});

// enforce userId validation
linkSchema.pre('save', async function (next){
    const user = await UserModel.findById(this.userId);
    if(!user){
        console.error("User doesn't exist.");
    }
})

export const LinkModel = model('Link', linkSchema);