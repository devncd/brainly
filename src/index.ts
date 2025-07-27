import express from 'express';
const app = express();

// to parse JSON request bodies
app.use(express.json());

// Registers a new user
app.post('/api/v1/signup', (req, res)=>{

})

// Handles user login
app.post('/api/v1/signin', (req, res)=>{

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