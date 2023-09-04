import React, { useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setColumns, setTasks, selectColumns } from "@/features/boardSlice";
import { IColumn } from "@/types/column";
import { ColumnApi, TaskApi } from "@/types/api";
import ProjectColumn from "@/components/ProjectColumn";

const ProjectContent: React.FC = () => {
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const columns = useAppSelector<IColumn[]>(selectColumns);
    
    useEffect(() => {
        const cancelToken: CancelTokenSource = axios.CancelToken.source();
        
        async function handleApi() {
            await axios
                .get("api/columns", { cancelToken: cancelToken.token })
                .then((res) => {
                    const data: ColumnApi = res.data;
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
                .get("api/tasks", { cancelToken: cancelToken.token })
                .then((res) => {
                    const data: TaskApi = res.data;
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
        
        return () => {
            cancelToken.cancel();
        };
    }, []);
    
    return hasLoaded ?
        <div className = "flex flex-1 flex-row px-8">
            {columns.map((column: IColumn) => {
                console.log(column);
                return <ProjectColumn key={column._id} column={column}></ProjectColumn>
            })}
            <Toaster></Toaster>
        </div>
        : null;
};

export default ProjectContent;