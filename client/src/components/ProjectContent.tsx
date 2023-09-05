import React, { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setColumns, setTasks, selectColumnIds } from "@/features/boardSlice";
import { IColumnApi, ITaskApi } from "@/types/api";
import ProjectColumn from "@/components/ProjectColumn";

const ProjectContent: React.FC = (): React.ReactElement | null => {
    const [hasLoaded, setHasLoaded]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const columnIds: string[] = useAppSelector<string[]>(selectColumnIds);
    
    useEffect(() => {
        const cancelToken: CancelTokenSource = axios.CancelToken.source();
        
        async function handleApi(): Promise<void> {
            await axios
                .get<IColumnApi>("api/columns", { cancelToken: cancelToken.token })
                .then((res) => {
                    const data: IColumnApi = res.data;
                    dispatch(setColumns(data.columns));
                    toast(({
                        title: "Response Status 200",
                        description: "Fetched columns successfully"
                    }));
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log("Request canceled");
                    } else {
                        throw err;
                    }
                });
            await axios
                .get<ITaskApi>("api/tasks", { cancelToken: cancelToken.token })
                .then((res) => {
                    const data: ITaskApi = res.data;
                    dispatch(setTasks(data.tasks));
                    toast(({
                        title: "Response Status 200",
                        description: "Fetched tasks successfully"
                    }));
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log("Request canceled");
                    } else {
                        throw err;
                    }
                });
            setHasLoaded(true);
        }
        
        handleApi()
            .then()
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Error has occurred",
                    description: "Something has gone wrong."
                });
            });
        
        return (): void => {
            cancelToken.cancel();
        };
    }, []);
    
    return hasLoaded ?
        <div className = "flex flex-1 flex-row px-8 gap-4">
            {columnIds.map((columnId: string) => {
                return <ProjectColumn key = {columnId} columnId = {columnId}></ProjectColumn>
            })}
            <Toaster></Toaster>
        </div>
        : null;
};

export default ProjectContent;