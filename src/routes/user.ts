import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {connectDB} from '../database/connection';
import { UserModel } from '../models/user.model';
import { validateLogin, validateSignup } from '../middlewares/validate';
import {Router} from 'express';
import { config } from '../conifg/env';

export const userRouter = Router();

// Initialize MongoDB database connection
connectDB();

// Registers a new user
userRouter.post('/signup', validateSignup, async (req, res)=>{
    const {username, password} = req.body;

    try {
        // hash password
        const saltRounds = 5;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModel.create({
            username,
            password: hashedPassword
        });
    } catch(e) {
        console.error(`Unexpected error during signup process: ${e}`)
        return res.status(500).json({
            message: "An unexpected internal server error occurred during signup. Please try again later."
        })
    }

    return res.status(200).json({
        message: "Signed up succesfully."
    })
})

// Handles user login
userRouter.post('/signin', validateLogin, async (req, res)=>{
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({
            username
        });

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password."
            })
        }

        // verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid username or password."
            })
        }

        const token = jwt.sign({
            userid: user._id
        }, config.JWT_USER_SECRET!);

        return res.status(200).json({
            message: "Login successful.",
            authorization: token
        })
    } catch(e) {
        console.error(`Unexpected error during login process: ${e}`);
        return res.status(500).json({
            message: "An unexpected internal server error occurred during login. Please try again later."
        })
    }
})