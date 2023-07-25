import express from 'express';
import { TaskModel } from "../models/Tasks.js";
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await TaskModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", verifyToken, async (req, res) => {
    const task = new TaskModel(req.body);
    try {
        const response = await task.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.put("/completed-task", verifyToken, async (req, res) => {
    try {
        const task = await TaskModel.findById(req.body.taskID);
        const user = await UserModel.findById(req.body.userID);
        user.completedTasks.push(task);
        await user.save();
        res.json({ completedTasks: user.completedTasks });
    } catch (err) {
        res.json(err);
    }
});

router.put("/daily-task", async (req, res) => {
    try {
        const task = await TaskModel.findById(req.body.taskID);
        const user = await UserModel.findById(req.body.userID);
        user.dailyTasks.push(task);
        await user.save();
        res.json({ dailyTasks: user.dailyTasks });
    } catch (err) {
        res.json(err);
    }
});

router.get("/completed-task/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ completedTasks: user?.completedTasks });
    } catch (err) {
        res.json(err);
    }
});

router.get("/completed-task/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const completedTasks = await TaskModel.find({
            _id: { $in: user.completedTasks }
        });
        res.json({ completedTasks });
    } catch (err) {
        res.json(err);
    }
});

router.get("/daily-task/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ dailyTasks: user?.dailyTasks });
    } catch (err) {
        res.json(err);
    }
});

router.get("/daily-task/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const dailyTasks = await TaskModel.find ({
            _id: { $in: user.dailyTasks }
        });
        res.json({ dailyTasks });
    } catch (err) {
        res.json(err);
    }
});

router.delete("/completed-task", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        user.completedTasks = user.completedTasks.filter((completedTask) => completedTask.toString() !== req.body.taskID);
        await user.save();
        res.json({ completedTasks: user.completedTasks });
    } catch (err) {
        res.json(err);
    }
});

router.delete("/daily-task", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        user.dailyTasks = user.dailyTasks.filter((dailyTask) => dailyTask.toString() !== req.body.taskID);
        await user.save();
        res.json({ dailyTasks: user.dailyTasks });
    } catch (err) {
        res.json(err);
    }
});

export { router as tasksRouter };