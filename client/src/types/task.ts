import { IMongoose } from "./mongoose";

export interface ITask extends IMongoose {
    summary: string,
    memberId?: string
}