import React from "react";
import ProjectSidebar from "@/components/ProjectSidebar.tsx";
import ProjectBoard from "@/components/ProjectBoard.tsx";

const Project: React.FC = () => {
    return (
        <div className = "flex flex-1 flex-row">
            <ProjectSidebar></ProjectSidebar>
            <ProjectBoard></ProjectBoard>
        </div>
    );
};

export default Project;