import React from "react";
import { ITask } from "@/types/task";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteTask, selectTaskById } from "@/features/boardSlice";
import { Summary } from "@/components/InputField";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

interface Props {
    taskId: string,
    columnId: string
}

const ProjectTask: React.FC<Props> = ({ taskId, columnId }: Props): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const task: ITask = useAppSelector<ITask>((state) => selectTaskById(state, taskId));
    
    if (!task) return undefined;
    
    const ids: {
        taskId: string,
        columnId: string
    } = {
        taskId: taskId,
        columnId: columnId
    }
    
    return (
        <div className = "flex flex-col bg-white shadow-lg rounded-sm">
            <div className = "flex flex-1 flex-row p-2 gap-1">
                <Summary taskId = {taskId}></Summary>
                <DropdownMenu>
                    <DropdownMenuTrigger className = "rounded-md opacity-0 hover:opacity-100 hover:text-accent-foreground hover:bg-slate-600/20 p-1">
                        <MoreHorizontalIcon></MoreHorizontalIcon>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => dispatch(deleteTask(ids))}>
                            <TrashIcon className = "mr-2 h-4 w-4"></TrashIcon>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className = "flex flex-1 flex-row items-center p-2">
                <p className = "flex-1 text-sm text-zinc-500 font-semibold resize-none">{task._id}</p>
                <Avatar>
                    <AvatarImage src = "https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default ProjectTask;