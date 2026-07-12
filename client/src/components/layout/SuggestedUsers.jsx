import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getSuggestedUsers,
    toggleFollow,
} from "../../services/userService";

const BASE_URL = "http://localhost:5000";

const SuggestedUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSuggestions();

    }, []);

    const loadSuggestions = async () => {

        try {

            const res = await getSuggestedUsers();

            setUsers(res.data.users);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const handleFollow = async (id) => {

        try {

            await toggleFollow(id);

            setUsers(prev =>
                prev.filter(user => user._id !== id)
            );

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <aside className="w-80 sticky top-24 h-fit">

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">

                {/* Header */}

                <div className="px-5 py-4 border-b dark:border-gray-700">

                    <h2 className="font-bold text-lg">

                        Suggested For You

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Discover people you may know

                    </p>

                </div>

                {/* Body */}

                <div>

                    {
                        loading ?

                            <div className="flex justify-center py-10">

                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

                            </div>

                            :

                            users.length === 0 ?

                                <div className="py-10 text-center text-gray-500">

                                    No Suggestions Available

                                </div>

                                :

                                users.map(user => (

                                    <div
                                        key={user._id}
                                        className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >

                                        <Link
                                            to={`/profile/${user._id}`}
                                            className="flex items-center gap-3 flex-1"
                                        >

                                            <img
                                                src={
                                                    user.profilePic
                                                        ? BASE_URL + user.profilePic
                                                        : BASE_URL + "/uploads/profiles/default-avatar.png"
                                                }
                                                alt=""
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />

                                            <div>

                                                <h3 className="font-semibold text-sm">

                                                    {user.fullName}

                                                </h3>

                                                <p className="text-xs text-gray-500">

                                                    @{user.username}

                                                </p>

                                            </div>

                                        </Link>

                                        <button
                                            onClick={() => handleFollow(user._id)}
                                            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                                        >

                                            Follow

                                        </button>

                                    </div>

                                ))
                    }

                </div>

                {/* Footer */}

                {
                    users.length > 0 && (

                        <div className="px-5 py-4 border-t dark:border-gray-700 text-center">

                            <span className="text-sm text-gray-500">

                                Connect with more people 🚀

                            </span>

                        </div>

                    )
                }

            </div>

        </aside>

    );

};

export default SuggestedUsers;