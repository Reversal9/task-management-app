import React, { useEffect } from "react";
import { fetchBoard, selectError, selectState } from "@/features/boardSlice";
import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectBoard from "@/components/ProjectBoard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Spinner from "@/components/Spinner";

const Project: React.FC = () => {
    const dispatch = useAppDispatch();
    const state: "idle" | "loading" | "succeeded" | "failed" = useAppSelector<"idle" | "loading" | "succeeded" | "failed">(selectState);
    const error: string | undefined = useAppSelector<string | undefined>(selectError);
    
    useEffect(() => {
        if (state == "idle") {
            dispatch(fetchBoard());
        }
    }, [state, dispatch]);
    
    switch (state) {
        case "loading":
            return <Spinner></Spinner>
        case "succeeded":
            return <div className = "flex flex-1 flex-row">
                <ProjectSidebar></ProjectSidebar>
                <ProjectBoard></ProjectBoard>
            </div>
        case "failed":
            return <p>{error}</p>
    }
};

export default Project;