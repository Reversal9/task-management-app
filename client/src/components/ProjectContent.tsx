import React, { useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

const ProjectContent: React.FC = () => {
    
    useEffect(() => {
        const cancelToken: CancelTokenSource = axios.CancelToken.source();
        axios
            .get("api/columns", { cancelToken: cancelToken.token })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("Canceled request");
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
        </div>
        //Columns go here ^
    );
};

export default ProjectContent;