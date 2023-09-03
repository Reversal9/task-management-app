import { IColumn } from "../types/column";
import { model, Schema } from "mongoose";

const columnSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        taskIds: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export default model<IColumn>("Column", columnSchema);