import dotenv from "dotenv";
dotenv.config();
import mongoose, { Model, model, Schema } from "mongoose";
import { string } from "zod";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in environment variables.")
}

mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected.")
    })
    .catch((err: Error)=>{
        console.error(`MongoDB connection error: ${err}`);
        process.exit(1);
    });

const userSchema = new Schema({
    username: {type: String, min: 4, max: 20, unique: true, required: true},
    password: {type: String, max: 1000, required: true} // stores password hash
});

export const UserModel = model('User', userSchema);