import { Response, Request } from "express";
import { ITask } from "../../types/task";
import Task from "../../models/task";
import { IMember } from "../../types/member";
import Member from "../../models/member";

const getTasks = async(req: Request, res: Response) => {
    try {
        const tasks: ITask[] = await Task.find();
        res.status(200).json({ tasks });
    } catch(err) {
        throw err;
    }
};

const addTask = async(req: Request, res: Response) => {
    try {
        const body = req.body as Pick<ITask, "summary" | "memberId">;
        const task: ITask = new Task({
            summary: body.summary,
            memberId: body.memberId
        });
        const newTask: ITask = await task.save();
        const allTasks: ITask[] = await Task.find();
        res.status(201).json({
            message: "Task added",
            task: newTask,
            tasks: allTasks
        });
    } catch(err) {
        throw err;
    }
};

const updateTask = async(req: Request, res: Response) => {
    try {
        const {
            params: id,
            body
        } = req;
        const updatedTask: ITask | null = await Task.findByIdAndUpdate(
            { _id: id },
            body);
        const allTasks: ITask[] = await Task.find();
        res.status(200).json({
            message: "Task updated",
            task: updatedTask,
            tasks: allTasks
        });
    } catch(err) {
        throw err;
    }
};

const deleteTask = async(req: Request, res: Response) => {
    try {
        const deletedTask: ITask | null = await Task.findByIdAndRemove(req.params.id);
        const allTasks: ITask[] = await Task.find();
        res.status(200).json({
            message: "Task deleted",
            task: deletedTask,
            tasks: allTasks
        });
    } catch(err) {
        throw err;
    }
};

export { getTasks, addTask, updateTask, deleteTask };