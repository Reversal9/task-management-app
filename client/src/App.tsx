import React from "react";
import Navbar from "@/components/Navbar";
import Project from "@/components/Project";

const App: React.FC = () => {
    return (
        <div className = "flex flex-col h-screen">
            <Navbar></Navbar>
            <Project></Project>
        </div>
    );
};

export default App;