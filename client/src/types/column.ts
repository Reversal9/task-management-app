import { Mongoose } from "./mongoose.ts";

export interface IColumn extends Mongoose {
    title: string,
    taskIds: [string]
}