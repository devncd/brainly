import express from 'express';
const app = express();
import { userRouter } from './routes/user';
import { contentRouter } from './routes/content';
import { brainRouter } from './routes/brain';

// to parse JSON request bodies
app.use(express.json());

// Route handlers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/brain', brainRouter);

app.listen(3000);