import { ITask } from "../types/task";
import { model, Schema } from "mongoose";

const taskSchema: Schema = new Schema(
    {
        summary: {
            type: String,
            required: true,
        },
        memberId: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
);

export default model<ITask>("Task", taskSchema);