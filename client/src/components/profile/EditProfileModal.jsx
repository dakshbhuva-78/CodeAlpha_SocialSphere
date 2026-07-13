import { X, Camera } from "lucide-react";
import { useRef, useState } from "react";
import { updateProfile, uploadProfilePicture, uploadCoverPicture } from "../../services/userService";

import { getImageUrl } from "../../utils/getImageUrl";


const EditProfileModal = ({ user, close, setUser }) => {

    const [fullName, setFullName] = useState(user.fullName);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio || "");
    const [saving, setSaving] = useState(false);

    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(
        getImageUrl(user.profilePic)
    );
    const [uploadingImage, setUploadingImage] = useState(false);


    const coverInputRef = useRef(null);
    const [coverPreview, setCoverPreview] = useState(
        getImageUrl(user.coverPic, "/uploads/covers/default-cover.jpg")
    );
    
    const [uploadingCover, setUploadingCover] = useState(false);


    const handleProfilePicture = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Show preview instantly
        setPreview(URL.createObjectURL(file));

        const formData = new FormData();

        formData.append("profilePic", file);

        try {

            setUploadingImage(true);

            const res = await uploadProfilePicture(formData);

            setUser((prev) => ({
                ...prev,
                profilePic: res.data.user.profilePic,
            }));

            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...currentUser,
                    profilePic: res.data.user.profilePic,
                })
            );

        } catch (err) {

            console.log(err);

        } finally {

            setUploadingImage(false);

        }

    };

    const handleCoverPicture = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Show preview instantly
        setCoverPreview(URL.createObjectURL(file));

        const formData = new FormData();

        formData.append("coverPic", file);

        try {

            setUploadingCover(true);

            const res = await uploadCoverPicture(formData);

            setUser((prev) => ({
                ...prev,
                coverPic: res.data.user.coverPic,
            }));

            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...currentUser,
                    coverPic: res.data.user.coverPic,
                })
            );

        } catch (err) {

            console.log(err);

        } finally {

            setUploadingCover(false);

        }

    };

    const handleSave = async () => {

        try {

            setSaving(true);

            const res = await updateProfile({

                fullName,
                username,
                bio,

            });

            // Update profile instantly

            setUser(res.data.user);

            // Update localStorage

            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            localStorage.setItem(

                "user",

                JSON.stringify({
                    ...currentUser,
                    ...res.data.user,
                })

            );

            close();

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setSaving(false);

        }

    };


    return (

        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-[680px] max-h-[88vh] bg-white dark:bg-gray-900 rounded-[28px] shadow-[0_25px_80px_rgba(0,0,0,0.35)] border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
                {/* Header */}

                <div className="flex justify-between items-center px-8 py-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 rounded-t-[28px]">
                    <h2 className="text-2xl font-bold">
                        Edit Profile
                    </h2>

                    <button
                        onClick={close}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                    >
                        <X />
                    </button>

                </div>

                {/* Body */}

                <div className="flex-1 overflow-y-auto px-8 py-7">

                    {/* Cover + Profile */}

                    <div className="relative mb-20">

                        {/* Cover */}

                        <div className="relative h-52 rounded-2xl overflow-hidden group">

                            <img
                                src={coverPreview}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />



                            {/* Dark Overlay */}

                            <div
                                onClick={() => coverInputRef.current.click()}
                                className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
                            >

                                {
                                    uploadingCover
                                        ?

                                        <div className="flex flex-col items-center">

                                            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />

                                            <p className="text-white mt-4">
                                                Uploading...
                                            </p>

                                        </div>

                                        :

                                        <>
                                            <Camera
                                                size={36}
                                                className="text-white"
                                            />
                                            <p className="text-white mt-3 text-lg font-semibold">
                                                Change Cover Photo
                                            </p>
                                        </>
                                }

                            </div>

                            <input
                                hidden
                                ref={coverInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleCoverPicture}
                            />

                        </div>

                        {/* Profile Picture */}

                        <div className="absolute left-8 -bottom-14">

                            <div className="relative group">

                                <img
                                    src={preview}
                                    alt=""
                                    className="w-32 h-32 rounded-full object-cover border-[5px] border-white dark:border-gray-900 shadow-xl"
                                />

                                {
                                    uploadingImage && (

                                        <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">

                                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />

                                        </div>

                                    )
                                }

                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Camera size={18} />
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Form */}

                    <div className="mt-6 space-y-6">

                        {/* Full Name */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Full Name
                            </label>

                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border dark:border-gray-700 rounded-xl px-4 py-3 bg-transparent outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* Username */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Username
                            </label>

                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border dark:border-gray-700 rounded-xl px-4 py-3 bg-transparent outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* Bio */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Bio
                            </label>

                            <textarea
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full border dark:border-gray-700 rounded-xl px-4 py-3 bg-transparent outline-none resize-none focus:border-blue-500"
                            />

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 px-8 py-5 flex justify-end gap-3 rounded-b-[28px]">
                    <button
                        onClick={close}
                        className="px-6 py-3 rounded-xl border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={
                            saving ||
                            uploadingImage ||
                            uploadingCover
                        }
                        className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold transition"
                    >
                        {
                            saving
                                ? "Saving Changes..."
                                : "Save Changes"
                        }
                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditProfileModal;