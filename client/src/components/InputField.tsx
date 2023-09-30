import React, { useEffect, useRef, useState } from "react";
import { Textarea as Text } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectColumnById, selectTaskById, updateColumn, updateTask } from "@/features/boardSlice";
import { IColumn } from "@/types/column";
import { ITask } from "@/types/task";

interface ColumnProps {
    columnId: string
}

export const ColumnTitle: React.FC<ColumnProps> = ({ columnId }: ColumnProps) => {
    const dispatch = useAppDispatch();
    const column: IColumn = useAppSelector<IColumn>((state) => selectColumnById(state, columnId));
    const [value, setValue] = useState<string>(column.title);
    
    async function handleBlur() {
        const newColumn: IColumn = {
            ...column,
            title: value
        }
        await dispatch(updateColumn(newColumn)).unwrap().catch(() => {
            //error handle here
            setValue(column.title);
        });
    }
    
    return <Input
        className = "flex-1 h-5 text-sm text-zinc-500 font-semibold resize-none overflow-hidden bg-transparent border-none hover:bg-slate-600/10 focus:bg-white truncate"
        maxLength = {30}
        onChange = {(e) => setValue(e.target.value)}
        onKeyDown = {(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
                e.currentTarget.blur();
            }
        }}
        onBlur = {handleBlur}
        value = {value}
        spellCheck = {false}>
    </Input>
};

interface SummaryProps {
    taskId: string
}

export const Summary: React.FC<SummaryProps> = ({ taskId }: SummaryProps) => {
    const dispatch = useAppDispatch();
    const task: ITask = useAppSelector<ITask>(state => selectTaskById(state, taskId));
    const textAreaRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState<string>(task.summary);
    
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [value]);
    
    async function handleBlur() {
        const newTask: ITask = {
            ...task,
            summary: value
        }
        await dispatch(updateTask(newTask)).unwrap().catch(() => {
            //error handle here
            setValue(task.summary);
        });
    }
    
    return <Text
        className = "flex-1 text-sm text-zinc-800 font-semibold resize-none overflow-hidden"
        ref = {textAreaRef}
        onChange = {(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        onKeyDown = {(e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
            if (e.key === "Enter" || e.key === "Escape") {
                e.currentTarget.blur();
            }
        }}
        onBlur = {handleBlur}
        value = {value}
        spellCheck = {false}>
    </Text>
};