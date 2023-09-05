import { IMongoose } from "./mongoose";

export interface IColumn extends IMongoose {
    title: string,
    taskIds: string[]
}