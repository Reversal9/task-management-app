import React from "react";
import { IColumn } from "@/types/column";
import { useAppSelector } from "@/app/hooks";
import ProjectTask from "@/components/ProjectTask";
import { RootState } from "@/app/store";

interface Props {
    columnId: string
}

const ProjectColumn: React.FC<Props> = ({ columnId }: Props): React.ReactElement | undefined => {
    const column: IColumn = useAppSelector<IColumn>((state: RootState) => {
        return state.board.columns[columnId];
    });
    
    if (!column) return;
    
    return (
        <div className = "flex flex-col min-h-mc w-64 bg-gray-200/50 rounded-lg">
            <div className = "flex flex-row">
                <p className = "text-sm text-zinc-500 font-semibold">{column.title}</p>
            </div>
            {column.taskIds.map((taskId: string) => {
                return <ProjectTask key = {taskId} taskId = {taskId}></ProjectTask>
            })}
        </div>
    );
};

export default ProjectColumn;