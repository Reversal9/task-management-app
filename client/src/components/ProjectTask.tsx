import React, { useEffect, useRef, useState } from "react";
import { ITask } from "@/types/task";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
    taskId: string
}

const ProjectTask: React.FC<Props> = ({ taskId }: Props): React.ReactElement | undefined => {
    const [value, setValue] = useState("Summary goes here");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [value]);
    
    // const task: ITask = useAppSelector<ITask>((state: RootState) => {
    //     return state.board.tasks[taskId];
    // });
    //
    // if (!task) return;
    
    return (
        <div className = "flex flex-col bg-white shadow-lg rounded-lg">
            <div className = "flex flex-1 flex-row p-2 gap-1">
                <Textarea
                    className = "flex-1 text-sm text-zinc-500 font-semibold resize-none overflow-hidden"
                    ref = {textAreaRef}
                    onChange = {(e) => setValue(e.target.value)}
                    value = {value}>
                    </Textarea>
                <Button variant = "task" size = "icon"><MoreHorizontalIcon></MoreHorizontalIcon></Button>
            </div>
            <div className = "flex flex-1 flex-row items-center p-2">
                <p className = "flex-1 text-sm text-zinc-500 font-semibold resize-none">ID-23123</p>
                <Avatar>
                    <AvatarImage src = "https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            {/*{task.summary}*/}
        </div>
    );
};

export default ProjectTask;