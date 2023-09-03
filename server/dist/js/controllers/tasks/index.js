"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../../models/task"));
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
        const task = new task_1.default({
            summary: body.summary,
            memberId: body.memberId
        });
        const newTask = await task.save();
        const allTasks = await task_1.default.find();
        res.status(201).json({
            message: "Task added",
            task: newTask,
            tasks: allTasks
        });
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
        const deletedTask = await task_1.default.findByIdAndRemove(req.params.id);
        const allTasks = await task_1.default.find();
        res.status(200).json({
            message: "Task deleted",
            task: deletedTask,
            tasks: allTasks
        });
    }
    catch (err) {
        throw err;
    }
};
exports.deleteTask = deleteTask;
