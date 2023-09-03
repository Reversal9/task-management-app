import { Document } from "mongoose";

export interface ITask extends Document {
    summary: string,
    memberId?: string
}