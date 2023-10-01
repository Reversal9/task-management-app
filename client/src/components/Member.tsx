import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectMemberById, updateMember } from "@/features/boardSlice";
import { IMember } from "@/types/member";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    memberId: string
}

const Member: React.FC<Props> = ({ memberId }: Props) => {
    const dispatch = useAppDispatch();
    const member: IMember = useAppSelector<IMember>((state) => selectMemberById(state, memberId));
    
    const [open, setOpen] = useState<boolean>(false);
    
    const schema = z.object({
        firstName: z.string().min(1).max(30),
        lastName: z.string().min(1).max(30)
    });
    
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: member.firstName,
            lastName: member.lastName
        }
    });
    
    function onSubmit(values: z.infer<typeof schema>) {
        dispatch(updateMember({
            _id: memberId,
            firstName: values.firstName,
            lastName: values.lastName
        })).unwrap()
            .then((data) => {
                setOpen(false);
                form.reset({
                    firstName: data.member.firstName,
                    lastName: data.member.lastName
                });
            });
    }
    
    return (
        <Dialog open = {open} onOpenChange = {setOpen}>
            <DialogTrigger asChild>
                <Avatar className = "cursor-pointer">
                    <AvatarFallback>
                        {`${member.firstName[0]}${member.lastName[0]}`}
                    </AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit member</DialogTitle>
                    <DialogDescription>
                        Make changes to a member here. Click save when you're done.
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
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Member;