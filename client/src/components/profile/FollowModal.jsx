import { X, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const FollowModal = ({
    title,
    users,
    close,
}) => {

    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() => {

        return users.filter((user) =>

            user.fullName
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            user.username
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [users, search]);

    return (

        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center">

            <div className="w-[430px] max-h-[650px] bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">

                {/* Header */}

                <div className="relative border-b dark:border-gray-700 py-5">

                    <h2 className="text-center text-xl font-bold">

                        {title}

                    </h2>

                    <button
                        onClick={close}
                        className="absolute right-5 top-5"
                    >
                        <X />
                    </button>

                </div>

                {/* Search */}

                <div className="p-5">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-11 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 outline-none"
                        />

                    </div>

                </div>

                {/* List */}

                <div className="max-h-[470px] overflow-y-auto">

                    {

                        filteredUsers.length === 0 ?

                        (

                            <div className="text-center py-16 text-gray-500">

                                No Users Found

                            </div>

                        )

                        :

                        filteredUsers.map((user)=>(

                            <Link
                                key={user._id}
                                to={`/profile/${user._id}`}
                                onClick={close}
                                className="flex items-center justify-between px-5 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={
                                            user.profilePic
                                            ? BASE_URL + user.profilePic
                                            : BASE_URL + "/uploads/profiles/default-avatar.png"
                                        }
                                        className="w-12 h-12 rounded-full object-cover"
                                        alt=""
                                    />

                                    <div>

                                        <h3 className="font-semibold">

                                            {user.fullName}

                                        </h3>

                                        <p className="text-sm text-gray-500">

                                            @{user.username}

                                        </p>

                                    </div>

                                </div>

                            </Link>

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default FollowModal;