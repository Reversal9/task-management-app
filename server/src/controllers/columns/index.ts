import { Response, Request } from "express";
import { IColumn } from "../../types/column";
import Column from "../../models/column";

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
            body
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
        const deletedColumn: IColumn | null = await Column.findByIdAndRemove(req.params.id);
        const allColumns: IColumn[] = await Column.find();
        res.status(200).json({
            message: "Column deleted",
            column: deletedColumn,
            columns: allColumns
        });
    } catch(err) {
        throw err;
    }
};

export { getColumns, addColumn, updateColumn, deleteColumn };