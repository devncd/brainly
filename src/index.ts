import express from 'express';
const app = express();
import { UserModel } from './db';
import jwt from 'jsonwebtoken';
import { userMiddleware } from './middlewares/auth'; // auth middleware
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validateLogin, validateSignup } from './middlewares/validate'; // Zod input validation middlewares
dotenv.config();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

// to parse JSON request bodies
app.use(express.json());

// Registers a new user
app.post('/api/v1/signup', validateSignup, async (req, res)=>{
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
app.post('/api/v1/signin', validateLogin, async (req, res)=>{
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
        }, JWT_USER_SECRET!);

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

// Handles adding new content
app.post('/api/v1/content', userMiddleware, (req, res)=>{

})

// Fetches all existing documents (no pagination)
app.get('/api/v1/content', userMiddleware, (req, res)=>{

})

// Deletes a document
app.delete('/api/v1/content', userMiddleware, (req, res)=>{

})

// Creates a sharable link for the user's second brain
app.post('/api/v1/brain/share', userMiddleware, (req, res)=>{

})

// Fetches the content of another user's second brain
app.get('/api/v1/brain/:shareLink', (req, res)=>{

})

app.listen(3000);