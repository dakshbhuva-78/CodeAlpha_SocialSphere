import { useState } from "react";
import { Trash2 } from "lucide-react";

import { deleteUser } from "../../services/adminService";
import DeleteUserModal from "./DeleteUserModal";

import { getImageUrl } from "../../utils/getImageUrl";

const UserTable = ({ users, setUsers }) => {

    const [selectedUser, setSelectedUser] = useState(null);

    const handleDelete = async () => {

        try {

            await deleteUser(selectedUser._id);

            setUsers(prev =>
                prev.filter(user => user._id !== selectedUser._id)
            );

            setSelectedUser(null);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100 dark:bg-gray-700">

                        <tr>

                            <th className="p-4 text-left">
                                User
                            </th>

                            <th className="p-4 text-left">
                                Username
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Joined
                            </th>

                            <th className="p-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.map(user => (

                                <tr
                                    key={user._id}
                                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >

                                    <td className="p-4">

                                        <div className="flex items-center gap-3">

                                            <img
                                                src={getImageUrl(user.profilePic)}
                                                className="w-12 h-12 rounded-full object-cover"
                                                alt=""
                                            />

                                            <span className="font-medium">

                                                {user.fullName}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="p-4">

                                        @{user.username}

                                    </td>

                                    <td className="p-4">

                                        {user.email}

                                    </td>

                                    <td className="p-4">

                                        {new Date(user.createdAt).toLocaleDateString()}

                                    </td>

                                    <td className="p-4 text-center">

                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="text-red-600 hover:text-red-700"
                                        >

                                            <Trash2 size={20} />

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {

                selectedUser && (

                    <DeleteUserModal

                        user={selectedUser}

                        close={() => setSelectedUser(null)}

                        onDelete={handleDelete}

                    />

                )

            }

        </>

    );

};

export default UserTable;