import express from 'express';
const app = express();
import { UserModel } from './db';

// to parse JSON request bodies
app.use(express.json());

// Registers a new user
app.post('/api/v1/signup', async (req, res)=>{
    // todo >> zod validation, bcrypt password hashing
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username,
            password
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
app.post('/api/v1/signin', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserModel.findOne({
            username
        });

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password."
            })
        }

        const isMatch = (password === user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password."
            })
        }

        return res.status(200).json({
            message: "Login successful.",
            user: {
                userId: user._id,
                username: user.username
            }
        })
    } catch(e) {
        console.error(`Unexpected error during login process: ${e}`);
        return res.status(500).json({
            message: "An unexpected internal server error occurred during login. Please try again later."
        })
    }
})

// Handles adding new content
app.post('/api/v1/content', (req, res)=>{

})

// Fetches all existing documents (no pagination)
app.get('/api/v1/content', (req, res)=>{

})

// Deletes a document
app.delete('/api/v1/content', (req, res)=>{

})

// Creates a sharable link for the user's second brain
app.post('/api/v1/brain/share', (req, res)=>{

})

// Fetches the content of another user's second brain
app.get('/api/v1/brain/:shareLink', (req, res)=>{

})

app.listen(3000);