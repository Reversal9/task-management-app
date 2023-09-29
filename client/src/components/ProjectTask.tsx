import React from "react";
import { ITask } from "@/types/task";
import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { selectTaskById } from "@/features/boardSlice";
import { Summary } from "@/components/InputField";

interface Props {
    taskId: string
}

const ProjectTask: React.FC<Props> = ({ taskId }: Props): React.ReactElement | undefined => {
    const task: ITask = useAppSelector<ITask>((state) => selectTaskById(state, taskId));
    
    if (!task) return undefined;
    
    return (
        <div className = "flex flex-col bg-white shadow-lg rounded-lg">
            <div className = "flex flex-1 flex-row p-2 gap-1">
                <Summary taskId = {taskId}></Summary>
                <Button variant = "task" size = "icon"><MoreHorizontalIcon></MoreHorizontalIcon></Button>
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