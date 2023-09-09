import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/features/ThemeProvider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SunIcon, MoonIcon, ComputerIcon } from "lucide-react";

export const ToggleThemeButton: React.FC = () => {
    const { setTheme } = useTheme();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant = "cloud" size = "icon">
                    <SunIcon></SunIcon>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align = "end">
                <DropdownMenuItem className = "flex flex-row gap-2" onClick={() => setTheme("light")}>
                    <SunIcon></SunIcon>Light
                </DropdownMenuItem>
                <DropdownMenuItem className = "flex flex-row gap-2" onClick={() => setTheme("dark")}>
                    <MoonIcon></MoonIcon>Dark
                </DropdownMenuItem>
                <DropdownMenuItem className = "flex flex-row gap-2" onClick={() => setTheme("system")}>
                    <ComputerIcon></ComputerIcon>System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}