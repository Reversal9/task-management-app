import React, { useState } from "react";
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
import { addMember, selectMemberIds } from "@/features/boardSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shallowEqual } from "react-redux";
import Member from "./Member";

const ProjectTeam: React.FC = () => {
    const dispatch = useAppDispatch();
    const members: string[] = useAppSelector<string[]>(selectMemberIds, shallowEqual);
    const [open, setOpen] = useState<boolean>(false);
    
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
    
    function onSubmit(values: z.infer<typeof schema>) {
        dispatch(addMember({
            firstName: values.firstName,
            lastName: values.lastName
        })).unwrap()
            .then(() => {
                setOpen(false);
                form.reset();
            });
    }
    
    return (
        <div className = "flex flex-row gap-1">
            {members.map((memberId: string) => (
                <Member key = {memberId} memberId = {memberId}></Member>
            ))}
            <Dialog open = {open} onOpenChange = {setOpen}>
                <DialogTrigger className = "flex h-10 w-10 shrink-0 overflow-hidden items-center justify-center rounded-full bg-muted">
                    <UserPlus size = {20} strokeWidth = {2} color = "#52525B"></UserPlus>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add member</DialogTitle>
                        <DialogDescription>
                            Add a new member of the project here. Click add when you're done.
                        </DialogDescription>
                        <Form {...form}>
                            <form onSubmit = {form.handleSubmit(onSubmit)} className = "flex flex-col gap-2">
                                <FormField control = {form.control} name = "firstName" render = {({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} maxLength = {30}></Input>
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField control = {form.control} name = "lastName" render = {({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} maxLength = {30}></Input>
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <div className = "flex justify-end gap-1">
                                    <Button variant = "default" size = "default" type = "submit">
                                        Add
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectTeam