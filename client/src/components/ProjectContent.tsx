import React, { useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster.tsx";

const ProjectContent: React.FC = () => {
    const { toast } = useToast();
    
    useEffect(() => {
        const cancelToken: CancelTokenSource = axios.CancelToken.source();
        axios
            .get("api/columns", { cancelToken: cancelToken.token })
            .then((res) => {
                console.log(res.data);
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
        
        return () => {
            cancelToken.cancel();
        };
    }, []);
    
    return (
        <div className = "flex-1 px-8">
            <Toaster></Toaster>
        </div>
        //Columns go here ^
    );
};

export default ProjectContent;