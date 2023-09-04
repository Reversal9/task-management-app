import React from "react";
import NavButton from "@/components/NavButton.tsx";

const Navbar: React.FC = () => {
    return (
        <nav className = "flex flex-row p-2.5 bg-white shadow z-10">
            <div className = "flex-1">
                <NavButton>Home</NavButton>
            </div>
            <div>
                <NavButton>Github</NavButton>
                <NavButton>Instagram</NavButton>
                <NavButton>Twitter</NavButton>
            </div>
        </nav>
    );
}

export default Navbar;