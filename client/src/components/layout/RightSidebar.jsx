import {
    House,
    Search,
    SquarePlus,
    Bell,
    Bookmark,
    User,
    LogOut
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        // Remove authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login
        navigate("/login", { replace: true });

    };

    return (

        <aside className="w-60 bg-white dark:bg-gray-800 rounded-xl shadow p-4 h-fit sticky top-24">

            <div className="space-y-5">

                <Link className="flex gap-3 items-center" to="/">
                    <House size={22} />
                    Home
                </Link>

                <Link className="flex gap-3 items-center" to="/search">
                    <Search size={22} />
                    Search
                </Link>

                <Link className="flex gap-3 items-center" to="/create">
                    <SquarePlus size={22} />
                    Create
                </Link>

                <Link className="flex gap-3 items-center" to="/notifications">
                    <Bell size={22} />
                    Notifications
                </Link>

                <Link className="flex gap-3 items-center" to="/saved">
                    <Bookmark size={22} />
                    Saved
                </Link>

                <Link className="flex gap-3 items-center" to={`/profile/${user._id}`}>
                    <User size={22} />
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    className="flex gap-3 items-center text-red-600"
                >
                    <LogOut size={22} />
                    Logout
                </button>

            </div>

        </aside>

    );

};

export default Sidebar;