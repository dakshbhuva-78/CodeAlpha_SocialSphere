import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCards from "../../components/admin/DashboardCards";

import { getDashboard } from "../../services/adminService";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const res = await getDashboard();

                setDashboard(res.data.dashboard);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []);

    return (

        <AdminLayout>

            {

                loading ?

                    <div className="text-center py-20">

                        Loading Dashboard...

                    </div>

                    :

                    <DashboardCards dashboard={dashboard} />

            }

        </AdminLayout>

    );

};

export default Dashboard;