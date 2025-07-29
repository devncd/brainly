import mongoose, { model, Schema } from "mongoose";
import { config } from '../conifg/env';

export const connectDB = async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("MongoDB connected.")
    } catch(e) {
        console.error(`MongoDB connection error: ${e}`);
        process.exit(1);
    }
}