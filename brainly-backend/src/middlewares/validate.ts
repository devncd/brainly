import { LoginSchema, SignupSchema, LoginInput, SignupInput } from '../schemas/auth.schema';
import { Request, Response, NextFunction } from 'express';
import { ContentSchema, ContentType } from '../schemas/content.schema';
import path from 'path';

export const validateLogin = (req: Request, res: Response, next: NextFunction)=>{
    const { username, password } = req.body as LoginInput;
    const parsed: ReturnType<typeof LoginSchema.safeParse> = LoginSchema.safeParse({username, password});

    if(!parsed.success){
        const validationIssues = parsed.error.issues;
        const simplifiedIssues = validationIssues.map((issue)=>{
            return {
                path: issue.path.join('.'),
                message: issue.message
            }
        });
        return res.status(400).json({
            message: "Invalid input.",
            errors: simplifiedIssues
        })
    }

    req.body = {username, password};
    next();
}

export const validateSignup = (req: Request, res: Response, next: NextFunction)=>{
    const { username, password } = req.body as SignupInput;
    const parsed: ReturnType<typeof SignupSchema.safeParse> = SignupSchema.safeParse({username, password});

    if(!parsed.success){
        const validationIssues = parsed.error.issues;
        const simplifiedIssues = validationIssues.map((issue)=>{
            return {
                path: issue.path.join('.'),
                message: issue.message
            }
        });
        return res.status(400).json({
            message: "Invalid input.",
            errors: simplifiedIssues
        })
    }

    req.body = {username, password};
    next();
}

export const validateContent = (req: Request, res: Response, next: NextFunction)=>{
    const {link, type, title, tags} = req.body as ContentType;
    const userId = req.userId;

    const parsed = ContentSchema.safeParse({link, type, title, tags});

    if(!parsed.success){
        const validationIssues = parsed.error.issues;
        const simplifiedIssues = validationIssues.map((issue)=>{
            return {
                path: issue.path.join('.'),
                errors: issue.message
            }
        });
        return res.status(400).json({
            message: "Invalid input.",
            errors: simplifiedIssues
        })
    }

    req.body = {link, type, title, tags, userId};
    next();
}