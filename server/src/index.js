import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { tasksRouter } from './routes/tasks.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/tasks", tasksRouter);

mongoose.connect (
    "mongodb+srv://shuxinweng:XibGbsPGw8NEcwP3@task-manager.qhkbtgw.mongodb.net/task-manager?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(3001, () => console.log("Server Started"));