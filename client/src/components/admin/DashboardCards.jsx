import {
    Users,
    Image,
    MessageCircle,
    Bell,
} from "lucide-react";

const DashboardCards = ({ dashboard }) => {

    const cards = [

        {
            title: "Users",
            value: dashboard.totalUsers,
            icon: Users,
            color: "bg-blue-500",
        },

        {
            title: "Posts",
            value: dashboard.totalPosts,
            icon: Image,
            color: "bg-green-500",
        },

        {
            title: "Comments",
            value: dashboard.totalComments,
            icon: MessageCircle,
            color: "bg-yellow-500",
        },

        {
            title: "Notifications",
            value: dashboard.totalNotifications,
            icon: Bell,
            color: "bg-red-500",
        },

    ];

    return (

        <>

            <h1 className="text-3xl font-bold mb-8">

                Dashboard

            </h1>

            <div className="grid grid-cols-4 gap-6">

                {

                    cards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6"
                            >

                                <div className="flex justify-between items-center">

                                    <div>

                                        <p className="text-gray-500">

                                            {card.title}

                                        </p>

                                        <h2 className="text-4xl font-bold mt-3">

                                            {card.value}

                                        </h2>

                                    </div>

                                    <div className={`${card.color} w-16 h-16 rounded-2xl flex justify-center items-center text-white`}>

                                        <Icon size={30} />

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </>

    );

};

export default DashboardCards;