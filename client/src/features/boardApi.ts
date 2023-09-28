import axios, { AxiosResponse } from "axios";
import { IColumnApi, ITaskApi } from "@/types/api";

export const getColumns = async(): Promise<AxiosResponse<IColumnApi>> => {
    return await axios.get("/api/columns");
};

export const getTasks = async(): Promise<AxiosResponse<ITaskApi>> => {
    return await axios.get("/api/tasks");
};
