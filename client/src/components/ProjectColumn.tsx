import React from "react";
import { IColumn } from "@/types/column";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ProjectTask from "@/components/ProjectTask";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PlusIcon, TrashIcon } from "lucide-react";
import { selectColumnById, deleteColumn } from "@/features/boardSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
    columnId: string
}

const ProjectColumn: React.FC<Props> = ({ columnId }: Props): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const column: IColumn = useAppSelector<IColumn>((state) => selectColumnById(state, columnId));
    
    if (!column) return undefined;
    
    return (
        <div className = "flex flex-col min-h-mc w-64 p-1 bg-gray-200/50 rounded-lg gap-1">
            <div className = "flex flex-row items-middle p-1">
                <p className = "flex-1 text-sm text-zinc-500 font-semibold py-2">{column.title}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button className = "opacity-0 hover:opacity-100" variant = "task" size = "icon"><MoreHorizontalIcon></MoreHorizontalIcon></Button>
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
            <Button className = "flex flex-row gap-1" variant = "task" size = "lg">
                <PlusIcon size = {16} strokeWidth = {3} color = "#52525B"></PlusIcon>
                <p className = "flex-1 text-left text-base text-zinc-600 font-semibold">Create task</p>
            </Button>
        </div>
    );
};

export default ProjectColumn;