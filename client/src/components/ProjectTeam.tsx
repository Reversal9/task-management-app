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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addColumn } from "@/features/boardSlice.ts";
import { useAppDispatch } from "@/app/hooks.ts";
// import { Label } from "@/components/ui/label.tsx";
// import { Input } from "@/components/ui/input.tsx";

const ProjectTeam: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const schema = z.object({
        firstName: z.string().min(1).max(30),
        lastName: z.string().min(1).max(30)
    });
    
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: ""
        }
    });
    
    // function onSubmit(values: z.infer<typeof schema>) {
    //     dispatch(addMember({
    //         firstName: "",
    //         lastName: ""
    //     })).unwrap()
    //         .then(() => {
    //             form.reset();
    //         })
    // }
    
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