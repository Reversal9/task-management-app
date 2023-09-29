import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addColumn, selectColumnIds } from "@/features/boardSlice";
import ProjectColumn from "@/components/ProjectColumn";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { IColumn } from "@/types/column";

const ProjectContent: React.FC = (): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const columnIds: string[] = useAppSelector<string[]>(selectColumnIds);
    
    const newColumn: Omit<IColumn, "_id"> = {
        title: "Test title",
        taskIds: []
    }
    
    return (
        <div className = "flex flex-row px-8 pb-4 gap-4">
            {columnIds.map((columnId: string) => {
                return <ProjectColumn key = {columnId} columnId = {columnId}></ProjectColumn>
            })}
            <Button className = "bg-gray-200/50 rounded-lg aspect-square" variant = "task" size = "icon" onClick = {() => dispatch(addColumn(newColumn))}>
                <PlusIcon size = {24} strokeWidth = {2} color = "#52525B"></PlusIcon>
            </Button>
        </div>
    );
};

export default ProjectContent;