import React from "react";
import { IColumn } from "@/types/column";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProjectTask from "@/components/ProjectTask";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PlusIcon, TrashIcon } from "lucide-react";
import { selectColumnById, deleteColumn, addTask } from "@/features/boardSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ITask } from "@/types/task";
import { ColumnTitle } from "@/components/InputField.tsx";

interface Props {
    columnId: string
}

const ProjectColumn: React.FC<Props> = ({ columnId }: Props): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const column: IColumn = useAppSelector<IColumn>((state) => selectColumnById(state, columnId));
    
    if (!column) return undefined;
    
    const newTask: Omit<ITask, "_id"> = {
        summary: "hey this is a summary",
    }
    
    const newData: {
        task: Omit<ITask, "_id">,
        columnId: string
    } = {
        task: newTask,
        columnId: columnId
    }
    
    return (
        <div className = "flex flex-col min-h-mc w-64 p-1 bg-gray-200/50 rounded-lg gap-1">
            <div className = "flex flex-row items-center p-1 gap-1">
                <ColumnTitle columnId = {columnId}></ColumnTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger className = "rounded-md opacity-0 hover:opacity-100 hover:text-accent-foreground hover:bg-slate-600/20 p-1">
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
                return <ProjectTask key = {taskId} taskId = {taskId}></ProjectTask>
            })}
            <Button className = "flex flex-row gap-1" variant = "task" size = "lg" onClick={() => dispatch(addTask(newData))}>
                <PlusIcon size = {16} strokeWidth = {3} color = "#52525B"></PlusIcon>
                <p className = "flex-1 text-left text-base text-zinc-600 font-semibold">Create task</p>
            </Button>
        </div>
    );
};

export default ProjectColumn;