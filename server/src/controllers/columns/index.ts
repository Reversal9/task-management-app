import { Response, Request } from "express";
import { IColumn } from "../../types/column";
import Column from "../../models/column";
import mongoose from "mongoose";
import Task from "../../models/task";

const getColumns = async(req: Request, res: Response): Promise<void> => {
    try {
        const columns: IColumn[] = await Column.find();
        res.status(200).json({ columns });
    } catch(err) {
        throw err;
    }
};

const addColumn = async(req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IColumn, "title" | "taskIds">;
        const column: IColumn = new Column({
            title: body.title,
            taskIds: body.taskIds
        });
        const newColumn: IColumn = await column.save();
        const allColumns: IColumn[] = await Column.find();
        res.status(201).json({
            message: "Column added",
            column: newColumn,
            columns: allColumns
        });
    } catch(err) {
        throw err;
    }
};

const updateColumn = async(req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body
        } = req;
        const updatedColumn: IColumn | null = await Column.findByIdAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        const allColumns: IColumn[] = await Column.find();
        res.status(200).json({
            message: "Column updated",
            column: updatedColumn,
            columns: allColumns
        });
    } catch(err) {
        throw err;
    }
};

const deleteColumn = async(req: Request, res: Response): Promise<void> => {
    try {
        const session: mongoose.mongo.ClientSession = await mongoose.startSession();
        session.startTransaction();
        
        const deletedColumn: IColumn | null = await Column.findByIdAndRemove(req.params.id).session(session)
        
        // Handle tasks that are leftover inside deleted column.
        // Right now, I will be deleting all the tasks.
        // Later may prompt users to move tasks to another column.
        if (deletedColumn) {
            const taskIds: string[] = deletedColumn.taskIds;
            await Task.deleteMany({"_id": {"$in": taskIds}}).session(session);
        }
        
        const allColumns: IColumn[] = await Column.find().session(session);
        
        await session.commitTransaction();
        
        res.status(200).json({
            message: "Column deleted",
            column: deletedColumn,
            columns: allColumns
        });
        
        await session.endSession();
    } catch(err) {
        throw err;
    }
};

export { getColumns, addColumn, updateColumn, deleteColumn };