import axios, { AxiosResponse } from "axios";
import { IColumnApi, IMemberApi, ITaskApi } from "@/types/api";
import { IColumn } from "@/types/column";
import { ITask } from "@/types/task";
import { IMember } from "@/types/member";

export const getColumns = async(): Promise<AxiosResponse<IColumnApi>> => {
    return await axios.get("/api/columns");
};

export const getTasks = async(): Promise<AxiosResponse<ITaskApi>> => {
    return await axios.get("/api/tasks");
};

export const getMembers = async(): Promise<AxiosResponse<IMemberApi>> => {
    return await axios.get("/api/members")
}

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
};

export const addMember = async(member: Omit<IMember, "_id">): Promise<AxiosResponse<IMemberApi>> => {
    return await axios.post("/api/members", member);
};

export const deleteMember = async(memberId: string): Promise<AxiosResponse<IMemberApi>> => {
    return await axios.delete(`/api/members/${memberId}`);
};

export const updateMember = async(member: IMember): Promise<AxiosResponse<IMemberApi>> => {
    return await axios.put(`/api/members/${member._id}`, member);
};