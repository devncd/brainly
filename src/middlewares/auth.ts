import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../conifg/env';

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers['authorization'];

    if(token == null){
        return res.status(401).json({
            message: "Unauthorized access. You're not logged in."
        })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_USER_SECRET!);

        if(typeof decoded === "object" && decoded && "userId" in decoded){
            req.userId = (decoded as JwtPayload).userId;
            next()
        } else {
            return res.status(401).json({
                message: "Unauthorized access. Invalid token."
            })
        }
    } catch(e) {
        return res.status(401).json({
                message: "Unauthorized access. Invalid token."
            })
    }
    
}