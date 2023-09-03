import { Response, Request } from "express";
import { IMember } from "../../types/member";
import Member from "../../models/member";

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
            body
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
        const deletedMember: IMember | null = await Member.findByIdAndRemove(req.params.id);
        const allMembers: IMember[] = await Member.find();
        res.status(200).json({
            message: "Member deleted",
            member: deletedMember,
            members: allMembers
        });
    } catch(err) {
        throw err;
    }
};

export { getMembers, addMember, updateMember, deleteMember };