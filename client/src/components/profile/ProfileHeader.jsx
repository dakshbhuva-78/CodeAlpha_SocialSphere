import {
    MapPin,
    CalendarDays,
    Edit,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { toggleFollow } from "../../services/userService";

const ProfileHeader = ({ user, setUser }) => {

    const [openEdit, setOpenEdit] = useState(false);

    const BASE_URL = "http://localhost:5000";

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const isOwner = currentUser?._id === user._id;

    const [isFollowing, setIsFollowing] = useState(user.isFollowing);
    const [followersCount, setFollowersCount] = useState(user.followersCount);

    const handleFollow = async () => {

        try {

            const res = await toggleFollow(user._id);

            if (res.data.following) {

                setIsFollowing(true);
                setFollowersCount((prev) => prev + 1);

            } else {

                setIsFollowing(false);
                setFollowersCount((prev) => prev - 1);

            }

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow">

            {/* Cover */}

            <div className="relative">

                <img
                    src={
                        user.coverPic
                            ? BASE_URL + user.coverPic
                            : BASE_URL + "/uploads/covers/default-cover.jpg"
                    }
                    alt=""
                    className="w-full h-72 object-cover"
                />

                {/* Profile Image */}

                <div className="absolute -bottom-16 left-10">

                    <img
                        src={
                            user.profilePic
                                ? BASE_URL + user.profilePic
                                : BASE_URL + "/uploads/profiles/default-avatar.png"
                        }
                        alt=""
                        className="w-36 h-36 rounded-full border-[6px] border-white dark:border-gray-800 object-cover shadow-lg"
                    />

                </div>

            </div>

            {/* User Info */}

            <div className="pt-20 px-10 pb-8">

                <div className="flex justify-between items-start">

                    <div>

                        <h1 className="text-3xl font-bold">

                            {user.fullName}

                        </h1>

                        <p className="text-gray-500 mt-1">

                            @{user.username}

                        </p>

                    </div>

                    {
                        isOwner ? (

                            <button
                                onClick={() => setOpenEdit(true)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition"
                            >
                                <Edit size={18} />
                                Edit Profile
                            </button>

                        ) : (

                            <button
                                onClick={handleFollow}
                                className={`px-6 py-2.5 rounded-xl font-semibold transition ${isFollowing
                                        ? "bg-gray-600 hover:bg-gray-700 text-white"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                            >
                                {isFollowing ? "Following" : "Follow"}
                            </button>

                        )
                    }

                </div>

                {/* Bio */}

                <p className="mt-6 text-gray-700 dark:text-gray-300 leading-7">

                    {user.bio}

                </p>

                {/* Location & Join */}

                <div className="flex gap-8 mt-6 text-gray-500">

                    <div className="flex items-center gap-2">

                        <MapPin size={18} />

                        {user.location}

                    </div>

                    <div className="flex items-center gap-2">

                        <CalendarDays size={18} />

                        {user.joined}

                    </div>

                </div>

            </div>
            {
                isOwner &&
                openEdit && (

                    <EditProfileModal
                        user={user}
                        setUser={setUser}
                        close={() => setOpenEdit(false)}
                    />
                )
            }
        </div>

    );

};


export default ProfileHeader;