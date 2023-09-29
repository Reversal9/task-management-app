import axios, { AxiosResponse } from "axios";
import { IColumnApi, ITaskApi } from "@/types/api";
import { IColumn } from "@/types/column";
import { ITask } from "@/types/task";

export const getColumns = async(): Promise<AxiosResponse<IColumnApi>> => {
    return await axios.get("/api/columns");
};

export const getTasks = async(): Promise<AxiosResponse<ITaskApi>> => {
    return await axios.get("/api/tasks");
};

export const addColumn = async(column: Omit<IColumn, "_id">): Promise<AxiosResponse<IColumnApi>> => {
    return await axios.post("/api/columns", column);
};

export const deleteColumn = async(columnId: string): Promise<AxiosResponse<IColumnApi>> => {
    return await axios.delete(`/api/columns/${columnId}`);
};

export const addTask = async(columnId: string, task: Omit<ITask, "_id">): Promise<AxiosResponse<ITaskApi>> => {
    const data = { columnId, ...task };
    return await axios.post("/api/tasks", data);
};

export const deleteTask = async(taskId: string): Promise<AxiosResponse<ITaskApi>> => {
    return await axios.delete(`/api/tasks/${taskId}`);
};

export const updateColumn = async(column: IColumn): Promise<AxiosResponse<IColumnApi>> => {
    return await axios.put(`/api/columns/${column._id}`, column);
};

export const updateTask = async(task: ITask): Promise<AxiosResponse<ITaskApi>> => {
    return await axios.put(`/api/tasks/${task._id}`, task);
}