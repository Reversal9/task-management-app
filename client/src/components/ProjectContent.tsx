import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addColumn, handleDragEnd, selectColumnIds } from "@/features/boardSlice";
import ProjectColumn from "@/components/ProjectColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, PlusIcon, X } from "lucide-react";
import { shallowEqual } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const ProjectContent: React.FC = (): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const columnIds: string[] = useAppSelector<string[]>(selectColumnIds, shallowEqual);
    const confirmButtonRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
    
    const [isAddingNewColumn, setIsAddingNewColumn] = useState<boolean>(false);
    
    const schema = z.object({
        title: z.string().min(1).max(30)
    });
    
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: ""
        }
    });
    
    function onSubmit(values: z.infer<typeof schema>) {
        setIsAddingNewColumn(false);
        dispatch(addColumn({
            title: values.title,
            taskIds: []
        })).unwrap()
            .then(() => {
                form.reset();
            })
            .catch(() => {
                setIsAddingNewColumn(true);
            });
    }
    
    function handleBlur() {
        setIsAddingNewColumn(false);
        form.reset();
    }
    
    const onDragEnd = (result: DropResult) => {
        dispatch(handleDragEnd(result));
    }
    
    return (
        <div className = "flex flex-row px-8 pb-4 gap-4">
            <DragDropContext onDragEnd = {onDragEnd}>
                {columnIds.map((columnId: string) => {
                    return <ProjectColumn key = {columnId} columnId = {columnId}></ProjectColumn>
                })}
            </DragDropContext>
            {!isAddingNewColumn ?
                <Button className = "bg-gray-200/50 rounded-sm aspect-square" variant = "task" size = "icon" onClick ={() => {
                    setIsAddingNewColumn(true);
                }}>
                    <PlusIcon size = {24} strokeWidth = {2} color = "#52525B"></PlusIcon>
                </Button>
            :
                <Form {...form}>
                    <form
                        onSubmit = {form.handleSubmit(onSubmit)}
                        className = "flex flex-col min-h-mc w-64 p-3 bg-gray-200/50 rounded-sm gap-1"
                        onBlur = {(e) => {
                            if (e.relatedTarget !== confirmButtonRef.current) {
                                handleBlur();
                            }
                        }}>
                        <FormField control = {form.control} name = "title" render = {({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className = "h-6 text-sm text-zinc-500 font-semibold resize-none overflow-hidden bg-transparent border-none hover:bg-slate-600/10 focus:bg-white truncate"
                                        {...field}
                                        maxLength = {30}
                                        onKeyDown = {(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === "Escape") {
                                                e.currentTarget.blur();
                                            }
                                            if (e.key === "Enter") {
                                                form.handleSubmit(onSubmit);
                                            }
                                        }}
                                        spellCheck = {false}
                                        autoFocus>
                                    </Input>
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className = "flex flex-row justify-end gap-1">
                            <Button className = "bg-gray-200/50 shadow-md rounded-sm aspect-square" ref = {confirmButtonRef} variant = "task" size = "icon" onClick ={() => {
                                form.handleSubmit(onSubmit);
                            }}>
                                <Check size = {24} strokeWidth = {2} color = "#52525B"></Check>
                            </Button>
                            <Button className = "bg-gray-200/50 shadow-md rounded-sm aspect-square" variant = "task" size = "icon">
                                <X size = {24} strokeWidth = {2} color = "#52525B"></X>
                            </Button>
                        </div>
                    </form>
                </Form>
            }
        </div>
    );
};

export default ProjectContent;