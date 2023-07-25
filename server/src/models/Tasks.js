import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    priorityLevel: { type: Number, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});

export const TaskModel = mongoose.model("tasks", TaskSchema);