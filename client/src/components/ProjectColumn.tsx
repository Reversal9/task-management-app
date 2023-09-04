import React from "react";
import { IColumn } from "@/types/column";
// import { useAppSelector } from "@/app/hooks";
// import { selectTasks } from "@/features/boardSlice";

interface Props {
    column: IColumn
}

const ProjectColumn: React.FC<Props> = ({ column }) => {
    // const tasks = useAppSelector(selectTasks);
    return (
        <div className = "flex flex-col h-5 w-20 bg-green-200 outline">
            <p>{column.title}</p>
        </div>
    );
};

export default ProjectColumn;