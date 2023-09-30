import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addColumn, selectColumnIds } from "@/features/boardSlice";
import ProjectColumn from "@/components/ProjectColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, PlusIcon, X } from "lucide-react";
import { IColumn } from "@/types/column";

const ProjectContent: React.FC = (): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const columnIds: string[] = useAppSelector<string[]>(selectColumnIds);
    
    //Handle add column
    const [isAddingNewColumn, setIsAddingNewColumn] = useState<boolean>(false);
    
    const newColumnSlate: Omit<IColumn, "_id"> = {
        title: "",
        taskIds: []
    }
    const [newColumnValue, setNewColumnValue] = useState<string>("");
    
    function handleBlur() {
        setIsAddingNewColumn(false);
        setNewColumnValue("");
    }
    
    function handleAddColumn() {
        dispatch(addColumn({
            ...newColumnSlate,
            title: newColumnValue
        })).unwrap()
            .then(() => {
                handleBlur();
            });
    }
    
    return (
        <div className = "flex flex-row px-8 pb-4 gap-4">
            {columnIds.map((columnId: string) => {
                return <ProjectColumn key = {columnId} columnId = {columnId}></ProjectColumn>
            })}
            {!isAddingNewColumn ?
                <Button className = "bg-gray-200/50 rounded-sm aspect-square" variant = "task" size = "icon" onClick ={() => {
                    setIsAddingNewColumn(true);
                }}>
                    <PlusIcon size = {24} strokeWidth = {2} color = "#52525B"></PlusIcon>
                </Button>
            :
                <div className = "flex flex-col min-h-mc w-64 p-3 bg-gray-200/50 rounded-sm gap-1">
                    <Input
                        className = "h-6 text-sm text-zinc-500 font-semibold resize-none overflow-hidden bg-transparent border-none hover:bg-slate-600/10 focus:bg-white truncate"
                        maxLength = {30}
                        onChange = {(e) => setNewColumnValue(e.target.value)}
                        onKeyDown = {(e) => {
                            if (e.key === "Escape") {
                                e.currentTarget.blur();
                            }
                            if (e.key === "Enter") {
                                handleAddColumn();
                            }
                        }}
                        onBlur = {handleBlur}
                        value = {newColumnValue}
                        spellCheck = {false}
                        autoFocus>
                    </Input>
                    <div className = "flex flex-row justify-end gap-1">
                        <Button className = "bg-gray-200/50 shadow-md rounded-sm aspect-square" variant = "task" size = "icon" onClick ={() => {
                            handleAddColumn();
                        }}>
                            <Check size = {24} strokeWidth = {2} color = "#52525B"></Check>
                        </Button>
                        <Button className = "bg-gray-200/50 shadow-md rounded-sm aspect-square" variant = "task" size = "icon">
                            <X size = {24} strokeWidth = {2} color = "#52525B"></X>
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
    //call dispatch(addColumn(newColumn))
};

export default ProjectContent;