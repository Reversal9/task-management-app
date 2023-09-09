import React from "react";
import Navbar from "@/components/Navbar";
import Project from "@/components/Project";
import { ThemeProvider } from "@/features/ThemeProvider";

const App: React.FC = () => {
    return (
        <ThemeProvider defaultTheme = "light" storageKey = "vite-ui-theme">
            <div className = "flex flex-col h-screen">
                <Navbar></Navbar>
                <Project></Project>
            </div>
        </ThemeProvider>
    );
};

export default App;