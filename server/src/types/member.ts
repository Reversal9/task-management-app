import { Document } from "mongoose";

export interface IMember extends Document {
    firstName: string,
    lastName: string
}