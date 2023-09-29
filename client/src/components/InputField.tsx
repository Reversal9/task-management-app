import React, { useEffect, useRef, useState } from "react";
import { Textarea as Text } from "@/components/ui/textarea";

interface Props {
    summary: string
}

const Textarea: React.FC<Props> = ({ summary }: Props) => {
    const [value, setValue] = useState(summary);
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
        onChange = {(e) => setValue(e.target.value)}
        value = {value}>
    </Text>
};

export default Textarea;