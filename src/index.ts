import express, { Request, Response, NextFunction } from 'express';
const app = express();
import { userRouter } from './routes/user';
import { contentRouter } from './routes/content';
import { brainRouter } from './routes/brain';

// to parse JSON request bodies
app.use(express.json());

// Handle invalid JSON errors
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof SyntaxError && 'body' in err){
        return res.status(400).json({
            message: "Invalid JSON in request body."
        })
    }
    next(err);
})

// Route handlers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/brain', brainRouter);

// Global error handler (for other errors)
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    console.error(err);
    return res.status(500).json({
        message: "Internal server error."
    })
})

app.listen(3000);