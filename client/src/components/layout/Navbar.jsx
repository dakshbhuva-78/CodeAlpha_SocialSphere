import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { Moon, Sun } from "lucide-react";

const Navbar = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);


    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm h-16 flex items-center justify-between px-8 z-50">

            <Link
                to="/"
                className="text-2xl font-bold text-blue-600"
            >
                SocialSphere
            </Link>

            <button
                onClick={() => setDarkMode(prev => !prev)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

        </nav>
    );
};

export default Navbar;