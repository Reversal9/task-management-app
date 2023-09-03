import { IMember } from "../types/member";
import { model, Schema } from "mongoose";

const memberSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export default model<IMember>("Member", memberSchema);