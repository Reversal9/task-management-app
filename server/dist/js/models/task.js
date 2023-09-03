"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    summary: {
        type: String,
        required: true,
    },
    memberId: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Task", taskSchema);
