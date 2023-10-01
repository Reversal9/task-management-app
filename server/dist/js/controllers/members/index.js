"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.addMember = exports.getMembers = void 0;
const member_1 = __importDefault(require("../../models/member"));
const getMembers = async (req, res) => {
    try {
        const members = await member_1.default.find();
        res.status(200).json({ members });
    }
    catch (err) {
        throw err;
    }
};
exports.getMembers = getMembers;
const addMember = async (req, res) => {
    try {
        const body = req.body;
        const member = new member_1.default({
            firstName: body.firstName,
            lastName: body.lastName
        });
        const newMember = await member.save();
        const allMembers = await member_1.default.find();
        res.status(201).json({
            message: "Member added",
            member: newMember,
            members: allMembers
        });
    }
    catch (err) {
        throw err;
    }
};
exports.addMember = addMember;
const updateMember = async (req, res) => {
    try {
        const { params: { id }, body } = req;
        const updatedMember = await member_1.default.findByIdAndUpdate({ _id: id }, body, { new: true });
        const allMembers = await member_1.default.find();
        res.status(200).json({
            message: "Member updated",
            member: updatedMember,
            members: allMembers
        });
    }
    catch (err) {
        throw err;
    }
};
exports.updateMember = updateMember;
const deleteMember = async (req, res) => {
    try {
        const deletedMember = await member_1.default.findByIdAndRemove(req.params.id);
        const allMembers = await member_1.default.find();
        res.status(200).json({
            message: "Member deleted",
            member: deletedMember,
            members: allMembers
        });
    }
    catch (err) {
        throw err;
    }
};
exports.deleteMember = deleteMember;
