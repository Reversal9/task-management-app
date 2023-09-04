import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProjectTeam: React.FC = () => {
    return (
        <div className = "flex flex-row gap-1">
            <Avatar>
                <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>T</AvatarFallback>
            </Avatar>
        </div>
    );
};

export default ProjectTeam