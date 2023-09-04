import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";

interface Props {
    children: ReactNode
}

const ProjectButton: React.FC<Props> = ({ children }) => {
    return (
        <Button variant = "ghost" size = "sm">{children}</Button>
    );
};

export default ProjectButton;