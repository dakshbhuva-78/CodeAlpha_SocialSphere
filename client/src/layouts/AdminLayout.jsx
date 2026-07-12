import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {

    const admin =
        JSON.parse(localStorage.getItem("admin"));

    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">

            <AdminSidebar />

            <div className="flex-1">

                {/* Header */}

                <header className="bg-white dark:bg-gray-800 shadow px-8 py-5 flex justify-between items-center">

                    <div>

                        <h1 className="text-2xl font-bold">

                            Dashboard

                        </h1>

                        <p className="text-sm text-gray-500">

                            Welcome back, {admin?.fullName}

                        </p>

                    </div>

                </header>

                {/* Page */}

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

};

export default AdminLayout;