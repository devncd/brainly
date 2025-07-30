import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in environment variables.")
}

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
if(!JWT_USER_SECRET){
    throw new Error("JWT_USER_SECRET is not defined in environment variables.")
}

export const config = {
    MONGODB_URI,
    JWT_USER_SECRET
}