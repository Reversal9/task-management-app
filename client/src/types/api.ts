import { IColumn } from "./column";
import { ITask } from "./task";

interface IApiDataType {
    message: string,
    status: string
}

export interface IColumnApi extends IApiDataType {
    columns: IColumn[],
    column?: IColumn
}

export interface ITaskApi extends IApiDataType {
    tasks: ITask[],
    task?: ITask
}