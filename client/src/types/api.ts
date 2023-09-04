import { IColumn } from "./column";
import { ITask } from "./task";

interface ApiDataType {
    message: string,
    status: string
}

export interface ColumnApi extends ApiDataType {
    columns: IColumn[],
    column: IColumn
}

export interface TaskApi extends ApiDataType {
    tasks: ITask[],
    task: ITask
}