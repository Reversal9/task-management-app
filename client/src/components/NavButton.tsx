import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button.tsx";

interface Props {
    children: ReactNode
}

const NavButton: React.FC<Props> = ({ children }) => {
    return (
        <Button variant = "cloud" size = "sm">{children}</Button>
    );
};

export default NavButton;