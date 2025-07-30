import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, min: 4, max: 20, unique: true, required: true},
    password: {type: String, max: 1000, required: true} // stores password hash
});

export const UserModel = model('User', userSchema);