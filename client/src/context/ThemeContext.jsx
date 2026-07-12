import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        console.log("Dark Mode:", darkMode);

        if (darkMode) {
            document.documentElement.classList.add("dark");
            console.log("Added dark class");
        } else {
            document.documentElement.classList.remove("dark");
            console.log("Removed dark class");
        }

        console.log(document.documentElement.className);

        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}