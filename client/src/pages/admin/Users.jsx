import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import UserTable from "../../components/admin/UserTable";

import { getUsers } from "../../services/adminService";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUsers = async () => {

            try {

                const res = await getUsers();

                setUsers(res.data.users);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadUsers();

    }, []);

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">

                Users Management

            </h1>

            {

                loading ?

                    <p>Loading...</p>

                    :

                    <UserTable
                        users={users}
                        setUsers={setUsers}
                    />

            }

        </AdminLayout>

    );

};

export default Users;