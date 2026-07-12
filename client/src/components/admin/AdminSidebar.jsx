import {
    LayoutDashboard,
    Users,
    Image,
    LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/admin/login", {
            replace: true,
        });

    };

    const navStyle = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition
        ${
            isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`;

    return (

        <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">

            {/* Logo */}

            <div className="p-6 border-b dark:border-gray-700">

                <h1 className="text-2xl font-bold text-blue-600">

                    SocialSphere

                </h1>

                <p className="text-sm text-gray-500">

                    Admin Panel

                </p>

            </div>

            {/* Menu */}

            <div className="flex-1 p-4 space-y-3">

                <NavLink
                    to="/admin/dashboard"
                    className={navStyle}
                >

                    <LayoutDashboard size={20} />

                    Dashboard

                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={navStyle}
                >

                    <Users size={20} />

                    Users

                </NavLink>

                <NavLink
                    to="/admin/posts"
                    className={navStyle}
                >

                    <Image size={20} />

                    Posts

                </NavLink>

            </div>

            {/* Logout */}

            <div className="p-4 border-t dark:border-gray-700">

                <button
                    onClick={logout}
                    className="flex items-center gap-3 text-red-600 hover:text-red-700"
                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>

    );

};

export default AdminSidebar;