"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteColumn = exports.updateColumn = exports.addColumn = exports.getColumns = void 0;
const column_1 = __importDefault(require("../../models/column"));
const getColumns = async (req, res) => {
    try {
        const columns = await column_1.default.find();
        res.status(200).json({ columns });
    }
    catch (err) {
        throw err;
    }
};
exports.getColumns = getColumns;
const addColumn = async (req, res) => {
    try {
        const body = req.body;
        const column = new column_1.default({
            title: body.title,
            taskIds: body.taskIds
        });
        const newColumn = await column.save();
        const allColumns = await column_1.default.find();
        res.status(201).json({
            message: "Column added",
            column: newColumn,
            columns: allColumns
        });
    }
    catch (err) {
        throw err;
    }
};
exports.addColumn = addColumn;
const updateColumn = async (req, res) => {
    try {
        const { params: { id }, body } = req;
        const updatedColumn = await column_1.default.findByIdAndUpdate({ _id: id }, body);
        const allColumns = await column_1.default.find();
        res.status(200).json({
            message: "Column updated",
            column: updatedColumn,
            columns: allColumns
        });
    }
    catch (err) {
        throw err;
    }
};
exports.updateColumn = updateColumn;
const deleteColumn = async (req, res) => {
    try {
        const deletedColumn = await column_1.default.findByIdAndRemove(req.params.id);
        const allColumns = await column_1.default.find();
        res.status(200).json({
            message: "Column deleted",
            column: deletedColumn,
            columns: allColumns
        });
    }
    catch (err) {
        throw err;
    }
};
exports.deleteColumn = deleteColumn;
