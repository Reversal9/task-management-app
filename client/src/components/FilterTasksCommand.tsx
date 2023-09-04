import React from "react";
import { Command, CommandInput } from "@/components/ui/command";

const FilterTasksCommand: React.FC = () => {
    return (
        <Command className = "rounded-lg border-2 w-32">
            <CommandInput>
            </CommandInput>
        </Command>
    );
};

export default FilterTasksCommand;