import React from "react";
import { ITask } from "@/types/task";
import { useAppSelector } from "@/app/hooks.ts";
import { RootState } from "@/app/store.ts";

interface Props {
    taskId: string
}

const ProjectTask: React.FC<Props> = ({ taskId }: Props): React.ReactElement | undefined => {
    const task: ITask = useAppSelector<ITask>((state: RootState) => {
        return state.board.tasks[taskId];
    });
    
    if (!task) return;
    
    return (
        <div className = "flex">
            {task.summary}
        </div>
    );
};

export default ProjectTask;