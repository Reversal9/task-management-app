import { Response, Request } from "express";
import { ITask } from "../../types/task";
import Task from "../../models/task";
import { IMember } from "../../types/member";
import Member from "../../models/member";
import { IColumn } from "../../types/column";
import mongoose from "mongoose";
import Column from "../../models/column";

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
        const body = req.body as Record<"columnId", string> & Pick<ITask, "summary" | "memberId">;
        const columnId: string = body.columnId;
        const task: ITask = new Task({
            summary: body.summary,
            memberId: body.memberId
        });
        
        const session: mongoose.mongo.ClientSession = await mongoose.startSession();
        session.startTransaction();
        
        const newTask: ITask = await task.save({ session });
        
        await Column.findByIdAndUpdate(
        { _id: columnId },
            { $push: { taskIds: newTask._id }},
            { new: true })
                .session(session);
        
        const allTasks: ITask[] = await Task.find().session(session);
        
        await session.commitTransaction();
        
        res.status(201).json({
            message: "Task added",
            task: newTask,
            tasks: allTasks
        });
        
        await session.endSession();
    } catch(err) {
        throw err;
    }
};

const updateTask = async(req: Request, res: Response) => {
    try {
        const {
            params: { id },
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
        const { id: taskId } = req.params;
        
        const session: mongoose.mongo.ClientSession = await mongoose.startSession();
        session.startTransaction();
        
        const deletedTask: ITask | null = await Task.findByIdAndRemove(taskId).session(session);
        const allTasks: ITask[] = await Task.find().session(session);
        
        await Column.findOneAndUpdate({ taskIds: taskId }, { $pull: { taskIds: taskId } }).session(session);
        
        await session.commitTransaction();
        
        res.status(200).json({
            message: "Task deleted",
            task: deletedTask,
            tasks: allTasks
        });
        
        await session.endSession();
    } catch(err) {
        throw err;
    }
};

export { getTasks, addTask, updateTask, deleteTask };