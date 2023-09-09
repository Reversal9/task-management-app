import React from "react";
import { IColumn } from "@/types/column";
import { useAppSelector } from "@/app/hooks";
import ProjectTask from "@/components/ProjectTask";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";

interface Props {
    columnId: string
}

const ProjectColumn: React.FC<Props> = ({ columnId }: Props): React.ReactElement | undefined => {
    // const column: IColumn = useAppSelector<IColumn>((state: RootState) => {
    //     return state.board.columns[columnId];
    // });
    //
    // if (!column) return;
    
    return (
        <div className = "flex flex-col min-h-mc w-64 p-1 bg-gray-200/50 rounded-lg gap-1">
            <div className = "flex flex-row items-middle p-1">
                <p className = "flex-1 text-sm text-zinc-500 font-semibold py-2">{"Title Goes Here"}</p>
                <Button className = "opacity-0 hover:opacity-100" variant = "task" size = "icon"><MoreHorizontalIcon></MoreHorizontalIcon></Button>
            </div>
            {/*{column.taskIds.map((taskId: string) => {*/}
            {/*    return <ProjectTask key = {taskId} taskId = {taskId}></ProjectTask>*/}
            {/*})}*/}
            <ProjectTask taskId = "2"></ProjectTask>
            <ProjectTask taskId = "2"></ProjectTask>
            <ProjectTask taskId = "2"></ProjectTask>
            <Button className = "flex flex-row gap-1" variant = "task" size = "lg">
                <PlusIcon size = {16} strokeWidth = {3} color = "#52525B"></PlusIcon>
                <p className = "flex-1 text-left text-base text-zinc-600 font-semibold">Create task</p>
            </Button>
        </div>
    );
};

export default ProjectColumn;