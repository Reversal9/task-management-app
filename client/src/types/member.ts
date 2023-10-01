import { IMongoose } from "./mongoose";

export interface IMember extends IMongoose {
    firstName: string,
    lastName: string
}