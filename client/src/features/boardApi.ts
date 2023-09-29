import axios, { AxiosResponse } from "axios";
import { IColumnApi, ITaskApi } from "@/types/api";
import { IColumn } from "@/types/column";

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
}