import React from "react";
import { Button } from "@/components/ui/button";
import FilterTasksCommand from "@/components/FilterTasksCommand";
import ProjectTeam from "@/components/ProjectTeam";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ProjectHeader: React.FC = () => {
    return (
        <div className = "flex flex-col px-8 py-6">
            <div>
                <p className = "text-sm text-zinc-500">
                    Projects / Project Name
                </p>
            </div>
            <div className = "flex flex-row py-6">
                <p className = "flex-1 text-2xl font-semibold">
                    PN Board
                </p>
                <div className = "gap-1">
                    <Button variant = "ghost" size = "icon">a</Button>
                    <Button variant = "ghost" size = "icon">a</Button>
                    <Button variant = "ghost" size = "icon">a</Button>
                </div>
            </div>
            <div className = "flex flex-row py-2">
                <div className = "flex flex-1 flex-row gap-4">
                    <FilterTasksCommand></FilterTasksCommand>
                    <ProjectTeam></ProjectTeam>
                </div>
                <div className = "flex flex-row gap-1">
                    <Select>
                        <SelectTrigger className="w-20">
                            <SelectValue placeholder="None" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant = "ghost" size = "sm">Insights</Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectHeader;