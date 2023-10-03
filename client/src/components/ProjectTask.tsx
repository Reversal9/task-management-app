import React, { useState } from "react";
import { ITask } from "@/types/task";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Check, MoreHorizontalIcon, TrashIcon, User2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    deleteTask,
    selectMemberById,
    selectMemberNames,
    selectTaskById, updateTask
} from "@/features/boardSlice";
import { Summary } from "@/components/InputField";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { IMember } from "@/types/member";
import { shallowEqual } from "react-redux";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

interface Props {
    index: number,
    taskId: string,
    columnId: string
}

const ProjectTask: React.FC<Props> = ({ index, taskId, columnId }: Props): React.ReactElement | undefined => {
    const dispatch = useAppDispatch();
    const task: ITask = useAppSelector<ITask>((state) => selectTaskById(state, taskId));
    
    const members: {
        value: string,
        label: string
    }[] = useAppSelector<{
        value: string,
        label: string
    }[]>(selectMemberNames, shallowEqual);
    
    const member: IMember | undefined = useAppSelector((state) => selectMemberById(state, task.memberId));
    const initials: string = `${member?.firstName[0]}${member?.lastName[0]}`;
    
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(task.memberId ?? "");
    
    if (!task) return undefined;
    
    const ids: {
        taskId: string,
        columnId: string
    } = {
        taskId: taskId,
        columnId: columnId
    };
    
    return (
        <Draggable draggableId = {taskId} index = {index}>
            {(provided: DraggableProvided) => (
                <div
                    className = "flex flex-col bg-white shadow-lg rounded-sm"
                    ref = {provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                        <div className = "flex flex-1 flex-row p-2 gap-1">
                            <Summary taskId = {taskId}></Summary>
                            <DropdownMenu>
                                <DropdownMenuTrigger className = "rounded-md opacity-0 hover:opacity-100 hover:text-accent-foreground hover:bg-slate-600/20 p-1 h-9">
                                    <MoreHorizontalIcon></MoreHorizontalIcon>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => dispatch(deleteTask(ids))}>
                                        <TrashIcon className = "mr-2 h-4 w-4"></TrashIcon>
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className = "flex flex-1 flex-row items-center p-2">
                            <p className = "flex-1 text-sm text-zinc-500 font-semibold resize-none">{task._id}</p>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger>
                                    {task.memberId ?
                                        <Avatar>
                                            {/*<AvatarImage src = "https://github.com/shadcn.png" alt="@shadcn" />*/}
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>
                                        :
                                        <div className = "flex h-10 w-10 shrink-0 overflow-hidden items-center justify-center rounded-full bg-muted">
                                            <User2 size = {24} strokeWidth = {2} color = "#52525B"></User2>
                                        </div>
                                    }
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search member..." />
                                        <CommandEmpty>No member found.</CommandEmpty>
                                        <CommandGroup>
                                            {members.map((member) => (
                                                <CommandItem
                                                    key={member.value}
                                                    onSelect={() => {
                                                        setValue(member.value === value ? "" : member.value);
                                                        setOpen(false);
                                                        const updatedTask: ITask = {
                                                            ...task,
                                                            memberId: member.value
                                                        };
                                                        if (member.value === value) delete updatedTask.memberId;
                                                        dispatch(updateTask(updatedTask));
                                                    }}>
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === member.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {member.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                </div>
            )}
        </Draggable>
    );
};

export default ProjectTask;