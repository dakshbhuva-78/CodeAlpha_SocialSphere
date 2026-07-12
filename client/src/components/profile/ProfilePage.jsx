import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfilePosts from "./ProfilePosts";

import { getUserProfile } from "../../services/userService";

const ProfilePage = () => {

    const { id } = useParams();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const res = await getUserProfile(id);

                setUser(res.data.user);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, [id]);

    if (loading) {

        return (

            <div className="text-center py-20">

                Loading Profile...

            </div>

        );

    }

    if (!user) {

        return (

            <div className="text-center py-20">

                User Not Found

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto py-8 px-5 space-y-6">

            <ProfileHeader user={user} setUser={setUser} />

            <ProfileStats user={user} />

            <ProfilePosts user={user} />

        </div>

    );

};

export default ProfilePage;