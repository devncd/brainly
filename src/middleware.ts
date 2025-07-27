import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

export const userMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers['authorization'];

    if(token == null){
        return res.status(401).json({
            message: "Unauthorized access. You're not logged in."
        })
    }

    const decoded = jwt.verify(token, JWT_USER_SECRET!);

    if(decoded){
        //@ts-ignore
        req.userId = decoded._id;
        next()
    } else {
        return res.status(401).json({
            message: "Unauthorized access. You're not logged in."
        })
    }
}