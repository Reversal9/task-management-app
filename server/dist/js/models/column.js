"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const columnSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    taskIds: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Column", columnSchema);
