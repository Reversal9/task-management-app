import React from "react";
import ProjectHeader from "./ProjectHeader";
import ProjectContent from "@/components/ProjectContent";

const ProjectBoard: React.FC = () => {
    return (
        <div className = "flex flex-1 flex-col shadow">
            <ProjectHeader></ProjectHeader>
            <ProjectContent></ProjectContent>
        </div>
    );
};

export default ProjectBoard;