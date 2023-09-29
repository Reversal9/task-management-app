import React, { useEffect, useRef, useState } from "react";
import { Textarea as Text } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectColumnById, updateColumn } from "@/features/boardSlice";
import { IColumn } from "@/types/column";

interface ColumnProps {
    columnId: string
}

export const ColumnTitle: React.FC<ColumnProps> = ({ columnId }: ColumnProps) => {
    const dispatch = useAppDispatch();
    const column: IColumn = useAppSelector((state) => selectColumnById(state, columnId));
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
        value = {value}>
    </Input>
};

interface SummaryProps {
    taskId: string
}

export const Summary: React.FC<SummaryProps> = ({ taskId }: SummaryProps) => {
    const dispatch = useAppDispatch();
    const initialState: string = useAppSelector(state => state.board.tasks[taskId].summary);
    const textAreaRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState<string>(initialState);
    
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [value]);
    
    return <Text
        className = "flex-1 text-sm text-zinc-800 font-semibold resize-none overflow-hidden"
        ref = {textAreaRef}
        onChange = {(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        onKeyDown = {(e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
            if (e.key === "Enter" || e.key === "Escape") {
                e.currentTarget.blur();
            }
        }}
        onBlur = {() => {
        
        }}
        value = {value}>
    </Text>
};