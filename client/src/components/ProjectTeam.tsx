import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
// import { Label } from "@/components/ui/label.tsx";
// import { Input } from "@/components/ui/input.tsx";

const ProjectTeam: React.FC = () => {
    return (
        <div className = "flex flex-row gap-1">
            <Avatar>
                <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <Dialog>
                <DialogTrigger className = "flex h-10 w-10 shrink-0 overflow-hidden items-center justify-center rounded-full bg-muted">
                    <UserPlus size = {20} strokeWidth = {2} color = "#52525B"></UserPlus>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add member</DialogTitle>
                        <DialogDescription>
                            Add a new member of the project here. Click add when you're done.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectTeam