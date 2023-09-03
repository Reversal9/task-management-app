import { Document } from "mongoose";

export interface IColumn extends Document {
    title: string,
    taskIds: [string]
}