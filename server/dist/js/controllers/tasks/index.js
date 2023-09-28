"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../../models/task"));
const mongoose_1 = __importDefault(require("mongoose"));
const column_1 = __importDefault(require("../../models/column"));
const getTasks = async (req, res) => {
    try {
        const tasks = await task_1.default.find();
        res.status(200).json({ tasks });
    }
    catch (err) {
        throw err;
    }
};
exports.getTasks = getTasks;
const addTask = async (req, res) => {
    try {
        const body = req.body;
        const columnId = body.columnId;
        const task = new task_1.default({
            summary: body.summary,
            memberId: body.memberId
        });
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        const newTask = await task.save({ session });
        await column_1.default.findByIdAndUpdate({ _id: columnId }, { $push: { taskIds: newTask._id } }, { new: true })
            .session(session);
        const allTasks = await task_1.default.find().session(session);
        await session.commitTransaction();
        res.status(201).json({
            message: "Task added",
            task: newTask,
            tasks: allTasks
        });
        await session.endSession();
    }
    catch (err) {
        throw err;
    }
};
exports.addTask = addTask;
const updateTask = async (req, res) => {
    try {
        const { params: id, body } = req;
        const updatedTask = await task_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTasks = await task_1.default.find();
        res.status(200).json({
            message: "Task updated",
            task: updatedTask,
            tasks: allTasks
        });
    }
    catch (err) {
        throw err;
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        const deletedTask = await task_1.default.findByIdAndRemove(taskId).session(session);
        const allTasks = await task_1.default.find().session(session);
        await column_1.default.findOneAndUpdate({ taskIds: taskId }, { $pull: { taskIds: taskId } }).session(session);
        await session.commitTransaction();
        res.status(200).json({
            message: "Task deleted",
            task: deletedTask,
            tasks: allTasks
        });
        await session.endSession();
    }
    catch (err) {
        throw err;
    }
};
exports.deleteTask = deleteTask;
