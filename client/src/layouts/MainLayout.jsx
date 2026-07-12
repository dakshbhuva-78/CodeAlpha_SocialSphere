import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import RightSidebar from "../components/layout/RightSidebar";
import SuggestedUsers from "../components/layout/SuggestedUsers";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all duration-300">
            <Navbar />

            <div className="max-w-7xl mx-auto flex pt-20 gap-6 px-4">

                <Sidebar />

                <main className="flex-1">
                    {children}
                </main>

                <SuggestedUsers />

            </div>

        </div>
    );
};

export default MainLayout;