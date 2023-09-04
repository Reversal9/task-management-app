import React from "react";
import { IColumn } from "@/types/column";
import { useAppSelector } from "@/app/hooks";
import { selectTasks } from "@/features/boardSlice";
import { ITask } from "@/types/task";
import ProjectTask from "@/components/ProjectTask";

interface Props {
    column: IColumn
}

const ProjectColumn: React.FC<Props> = ({ column }) => {
    const tasks: Record<string, ITask> = useAppSelector(selectTasks);
    const columnTasks: ITask[] = column.taskIds.map((taskId) => tasks[taskId]);
    
    return (
        <div className = "flex flex-col h-5 w-20 bg-green-200 outline">
            <p>{column.title}</p>
            {columnTasks.map((task: ITask | undefined) => {
                if (!task) return;
                return <ProjectTask key = {task._id} task = {task}></ProjectTask>
            })}
        </div>
    );
};

export default ProjectColumn;