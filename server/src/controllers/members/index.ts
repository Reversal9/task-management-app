import { Response, Request } from "express";
import { IMember } from "../../types/member";
import Member from "../../models/member";
import mongoose from "mongoose";
import Task from "../../models/task";

const getMembers = async(req: Request, res: Response): Promise<void> => {
    try {
        const members: IMember[] = await Member.find();
        res.status(200).json({ members });
    } catch(err) {
        throw err;
    }
};

const addMember = async(req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IMember, "firstName" | "lastName">;
        const member: IMember = new Member({
            firstName: body.firstName,
            lastName: body.lastName
        });
        const newMember: IMember = await member.save();
        const allMembers: IMember[] = await Member.find();
        res.status(201).json({
            message: "Member added",
            member: newMember,
            members: allMembers
        });
    } catch(err) {
        throw err;
    }
};

const updateMember = async(req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body
        } = req;
        const updatedMember: IMember | null = await Member.findByIdAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        const allMembers: IMember[] = await Member.find();
        res.status(200).json({
            message: "Member updated",
            member: updatedMember,
            members: allMembers
        });
    } catch(err) {
        throw err;
    }
};

const deleteMember = async(req: Request, res: Response): Promise<void> => {
    try {
        const session: mongoose.mongo.ClientSession = await mongoose.startSession();
        session.startTransaction();
        
        await Task.updateMany({ memberId: req.params.id }, { $unset: { memberId: 1 } }).session(session);
        const deletedMember: IMember | null = await Member.findByIdAndRemove(req.params.id).session(session);
        
        const allMembers: IMember[] = await Member.find().session(session);
        
        await session.commitTransaction();
        
        res.status(200).json({
            message: "Member deleted",
            member: deletedMember,
            members: allMembers
        });
        
        await session.endSession();
    } catch(err) {
        throw err;
    }
};

export { getMembers, addMember, updateMember, deleteMember };