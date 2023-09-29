import React, { useEffect } from "react";
import { fetchBoard, selectState } from "@/features/boardSlice";
import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectBoard from "@/components/ProjectBoard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const Project: React.FC = () => {
    const dispatch = useAppDispatch();
    const state: "idle" | "loading" | "succeeded" | "failed" = useAppSelector(selectState);
    
    useEffect(() => {
        if (state == "idle") {
            dispatch(fetchBoard());
        }
    }, [state, dispatch]);
    
    return (
        <div className = "flex flex-1 flex-row">
            <ProjectSidebar></ProjectSidebar>
            <ProjectBoard></ProjectBoard>
        </div>
    );
};

export default Project;