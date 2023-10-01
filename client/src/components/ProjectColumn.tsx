import React, { useRef, useState } from "react";
import { IColumn } from "@/types/column";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProjectTask from "@/components/ProjectTask";
import { Button } from "@/components/ui/button";
import { Check, MoreHorizontalIcon, PlusIcon, TrashIcon, X } from "lucide-react";
import { selectColumnById, deleteColumn, addTask } from "@/features/boardSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnTitle } from "@/components/InputField.tsx";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form.tsx";

interface Props {
    columnId: string
}

const ProjectColumn: React.FC<Props> = ({ columnId }: Props): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const column: IColumn = useAppSelector<IColumn>((state) => selectColumnById(state, columnId));
    const confirmButtonRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
    
    const [isAddingNewTask, setIsAddingNewTask] = useState<boolean>(false);
    
    const schema = z.object({
        summary: z.string().min(1).max(30)
    });
    
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            summary: ""
        }
    });
    
    function onSubmit(values: z.infer<typeof schema>) {
        setIsAddingNewTask(false);
        dispatch(addTask({
            task: {
                summary: values.summary
            },
            columnId: columnId
        })).unwrap()
            .then(() => {
                form.reset();
            })
            .catch(() => {
                setIsAddingNewTask(true);
            });
    }
    
    function handleBlur() {
        setIsAddingNewTask(false);
        form.reset();
    }
    
    if (!column) return undefined;
    
    return (
        <div className = "flex flex-col min-h-mc w-64 p-1 bg-gray-200/50 rounded-sm gap-1">
            <div className = "flex flex-row items-center p-1 gap-1">
                <ColumnTitle columnId = {columnId}></ColumnTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger className = "rounded-sm opacity-0 hover:opacity-100 hover:text-accent-foreground hover:bg-slate-600/20 p-1">
                        <MoreHorizontalIcon></MoreHorizontalIcon>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => dispatch(deleteColumn(columnId))}>
                            <TrashIcon className = "mr-2 h-4 w-4"></TrashIcon>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {column.taskIds.map((taskId: string) => {
                return <ProjectTask key = {taskId} taskId = {taskId} columnId = {columnId}></ProjectTask>
            })}
            {!isAddingNewTask ?
                <Button className = "flex flex-row gap-1" variant = "task" size = "lg" onClick={() => setIsAddingNewTask(true)}>
                    <PlusIcon size = {16} strokeWidth = {3} color = "#52525B"></PlusIcon>
                    <p className = "flex-1 text-left text-base text-zinc-600 font-semibold">Create task</p>
                </Button>
            :
                <Form {...form}>
                    <form
                        onSubmit = {form.handleSubmit(onSubmit)}
                        className = "flex flex-col bg-white shadow-lg rounded-sm p-2 gap-2"
                        onBlur = {(e) => {
                            if (e.relatedTarget !== confirmButtonRef.current) {
                                handleBlur();
                            }
                        }}>
                        <FormField control = {form.control} name = "summary" render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        className = "flex-1 text-sm text-zinc-800 font-semibold resize-none overflow-hidden"
                                        {...field}
                                        maxLength = {255}
                                        onKeyDown = {(e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
                                            if (e.key === "Escape") {
                                                e.currentTarget.blur();
                                            }
                                            if (e.key === "Enter") {
                                                form.handleSubmit(onSubmit);
                                            }
                                        }}
                                        spellCheck = {false}
                                        autoFocus>
                                    </Textarea>
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className = "flex flex-row justify-end gap-1">
                            <Button className = "bg-gray-200/95 shadow-md rounded-sm aspect-square" ref = {confirmButtonRef} variant = "task" size = "icon" type = "submit">
                                <Check size = {24} strokeWidth = {2} color = "#52525B"></Check>
                            </Button>
                            <Button className = "bg-gray-200/95 shadow-md rounded-sm aspect-square" variant = "task" size = "icon">
                                <X size = {24} strokeWidth = {2} color = "#52525B"></X>
                            </Button>
                        </div>
                    </form>
                </Form>
            }
        </div>
    );
};

export default ProjectColumn;