import { Heart, Image, Users } from "lucide-react";
import { useState } from "react";
import FollowModal from "./FollowModal";

import {
    getFollowers,
    getFollowing
} from "../../services/userService";

const ProfileStats = ({ user }) => {

    const [modalTitle, setModalTitle] = useState("");

    const [open, setOpen] = useState(false);

    const [users, setUsers] = useState([]);

    const loadFollowers = async () => {

        const res = await getFollowers(user._id);

        setUsers(res.data.users);

        setModalTitle("Followers");

        setOpen(true);

    };

    const loadFollowing = async () => {

        const res = await getFollowing(user._id);

        setUsers(res.data.users);

        setModalTitle("Following");

        setOpen(true);

    };

    return (

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow">

            <div className="grid grid-cols-4">

                {/* Posts */}

                <div className="flex flex-col items-center py-8 border-r dark:border-gray-700">

                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">

                        <Image
                            className="text-blue-600"
                            size={24}
                        />

                    </div>

                    <h2 className="mt-4 text-3xl font-bold">

                        {user.postsCount}

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Posts

                    </p>

                </div>

                {/* Followers */}

                <button
                    onClick={loadFollowers}
                    className="flex flex-col items-center py-8 border-r dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >

                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">

                        <Users
                            className="text-green-600"
                            size={24}
                        />

                    </div>

                    <h2 className="mt-4 text-3xl font-bold">

                        {user.followersCount}

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Followers

                    </p>

                </button>

                {/* Following */}

                <button
                    onClick={loadFollowing}
                    className="flex flex-col items-center py-8 border-r dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >

                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full">

                        <Users
                            className="text-yellow-600"
                            size={24}
                        />

                    </div>

                    <h2 className="mt-4 text-3xl font-bold">

                        {user.followingCount}

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Following

                    </p>

                </button>

                {/* Likes */}

                <div className="flex flex-col items-center py-8">

                    <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-full">

                        <Heart
                            className="text-pink-600"
                            size={24}
                        />

                    </div>

                    <h2 className="mt-4 text-3xl font-bold">

                        {user.likesCount || 0}

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Likes

                    </p>

                </div>

            </div>
            {
                open && (

                    <FollowModal
                        title={modalTitle}
                        users={users}
                        close={() => setOpen(false)}
                    />

                )
            }

        </div>

    );

};

export default ProfileStats;