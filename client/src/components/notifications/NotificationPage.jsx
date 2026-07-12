import { useEffect, useState } from "react";
import {
    Bell,
    Heart,
    MessageCircle,
    UserPlus,
    CheckCheck,
    Trash2,
} from "lucide-react";

import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../../services/notificationService";

import timeAgo from "../../utils/timeAgo";

import { BASE_URL } from "../../config/config";

const NotificationPage = () => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {

        try {

            const res = await getNotifications();

            setNotifications(res.data.notifications);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchNotifications();

    }, []);

    return (

        <div className="max-w-3xl mx-auto py-8">

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow">

                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">

                    <h1 className="text-3xl font-bold flex items-center gap-3">

                        <Bell className="text-blue-600" />

                        Notifications

                    </h1>

                    <button

                        onClick={async () => {

                            await markAllAsRead();

                            fetchNotifications();

                        }}

                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"

                    >

                        <CheckCheck size={18} />

                        Mark all read

                    </button>

                </div>

                <div className="h-[600px] overflow-y-auto">

                    {

                        loading ? (

                            <div className="flex justify-center items-center h-full">

                                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

                            </div>

                        ) : notifications.length === 0 ? (

                            <div className="flex flex-col items-center justify-center h-full text-gray-500">

                                <Bell size={70} />

                                <h2 className="mt-4 text-2xl font-bold">

                                    No Notifications

                                </h2>

                            </div>

                        ) : (

                            <div className="divide-y dark:divide-gray-700">

                                {

                                    notifications.map((notification) => (

                                        <div key={notification._id} onClick={async () => {
                                            if (!notification.isRead) {
                                                await markAsRead(notification._id);
                                                setNotifications((prev) =>
                                                    prev.map((item) =>
                                                        item._id === notification._id
                                                            ? { ...item, isRead: true }
                                                            : item
                                                    )
                                                );
                                            }
                                        }} className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                                        >

                                            <div className="flex gap-4 items-center">

                                                <img
                                                    src={
                                                        notification.sender.profilePic
                                                        ? BASE_URL + notification.sender.profilePic
                                                        : BASE_URL + "/uploads/profiles/default-avatar.png"
                                                    }
                                                    className="w-14 h-14 rounded-full object-cover"
                                                    alt=""
                                                />

                                                <div>

                                                    <div className="flex items-center gap-2">

                                                        {

                                                            notification.type === "follow" &&

                                                            <UserPlus
                                                                size={18}
                                                                className="text-blue-600"
                                                            />

                                                        }

                                                        {

                                                            notification.type === "like" &&

                                                            <Heart
                                                                size={18}
                                                                className="text-red-500"
                                                            />

                                                        }

                                                        {

                                                            notification.type === "comment" &&

                                                            <MessageCircle
                                                                size={18}
                                                                className="text-green-600"
                                                            />

                                                        }

                                                        <p>

                                                            <span className="font-semibold">

                                                                {notification.sender.fullName}

                                                            </span>

                                                            {

                                                                notification.type === "follow"

                                                                    ? " started following you."

                                                                    : notification.type === "like"

                                                                        ? " liked your post."

                                                                        : " commented on your post."

                                                            }

                                                        </p>

                                                    </div>

                                                    <p className="text-sm text-gray-500 mt-1">

                                                        {timeAgo(notification.createdAt)}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex items-center gap-4">

                                                {

                                                    !notification.isRead &&

                                                    <div className="w-3 h-3 rounded-full bg-blue-600" />

                                                }

                                                <Trash2
                                                    size={18}
                                                    className="text-red-500 cursor-pointer hover:scale-110"
                                                    onClick={async (e) => {

                                                        e.stopPropagation();

                                                        await deleteNotification(notification._id);

                                                        setNotifications((prev) =>
                                                            prev.filter((item) => item._id !== notification._id)
                                                        );

                                                    }}
                                                />

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default NotificationPage;