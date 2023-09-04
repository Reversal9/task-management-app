import React from "react";
import { ITask } from "@/types/task";

interface Props {
    task: ITask
}

const ProjectTask: React.FC<Props> = ({ task }) => {
    return (
        <div className = "bg-green-200">
            {task.summary}
        </div>
    );
};

export default ProjectTask;