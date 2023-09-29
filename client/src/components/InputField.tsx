import React, { useEffect, useRef } from "react";
import { Textarea as Text } from "@/components/ui/textarea";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    value: string
}

const Textarea: React.FC<Props> = ({ onChange, value }: Props) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [value]);
    
    return <Text
        className = "flex-1 text-sm text-zinc-500 font-semibold resize-none overflow-hidden"
        ref = {textAreaRef}
        onChange = {onChange}
        value = {value}>
    </Text>
};

export default Textarea;