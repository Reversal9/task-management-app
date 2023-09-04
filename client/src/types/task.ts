import { Mongoose } from "./mongoose.ts";

export interface ITask extends Mongoose {
    summary: string,
    memberId?: string
}