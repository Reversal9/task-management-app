import React from "react";
import { Button } from "@/components/ui/button"
import { ToggleThemeButton } from "@/components/ToggleThemeButton";
import { GithubIcon, InstagramIcon, TwitterIcon } from "lucide-react";

const Navbar: React.FC = () => {
    return (
        <nav className = "flex flex-row p-2.5 shadow z-10">
            <div className = "flex-1">
                <Button variant = "link" size = "sm">Home</Button>
            </div>
            <div>
                <Button variant = "cloud" size = "icon">
                    <GithubIcon></GithubIcon>
                </Button>
                <Button variant = "cloud" size = "icon">
                    <InstagramIcon></InstagramIcon>
                </Button>
                <Button variant = "cloud" size = "icon">
                    <TwitterIcon></TwitterIcon>
                </Button>
                <ToggleThemeButton></ToggleThemeButton>
            </div>
        </nav>
    );
}

export default Navbar;