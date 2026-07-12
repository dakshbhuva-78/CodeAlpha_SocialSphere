import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../../services/authService";
import AuthLayout from "../../layouts/AuthLayout";

const Register = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!form.fullName || !form.username || !form.email || !form.password || !form.confirmPassword) {
            return toast.error("Please fill all fields.");
        }

        if (form.password.length < 6) {
            return toast.error("Password must be at least 6 characters.");
        }

        if (form.password !== form.confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        try {

            setLoading(true);

            const payload = {
                fullName: form.fullName,
                username: form.username,
                email: form.email,
                password: form.password,
            };

            await register(payload);

            toast.success("Account created successfully!");

            navigate("/login");

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Registration failed."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout>

            <div className="relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,.45)] grid lg:grid-cols-2">

                {/* LEFT SIDE */}

                <div className="hidden lg:flex flex-col justify-center p-16 text-white">

                    <div className="flex items-center gap-4 mb-6">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl shadow-xl">
                            🌐
                        </div>

                        <div>

                            <h1 className="text-5xl font-black">
                                SocialSphere
                            </h1>

                            <p className="text-gray-400">
                                Connect Beyond Boundaries
                            </p>

                        </div>

                    </div>

                    <p className="text-xl text-gray-300 leading-9">
                        Join thousands of people sharing moments,
                        building communities and discovering new
                        connections every day.
                    </p>

                    <div className="mt-12 grid grid-cols-2 gap-5">

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10">

                            <h2 className="text-3xl font-bold">
                                10K+
                            </h2>

                            <p className="text-gray-300 mt-2">
                                Active Users
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10">

                            <h2 className="text-3xl font-bold">
                                1M+
                            </h2>

                            <p className="text-gray-300 mt-2">
                                Posts Shared
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10">

                            <h2 className="text-3xl font-bold">
                                25K+
                            </h2>

                            <p className="text-gray-300 mt-2">
                                Photos Uploaded
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10">

                            <h2 className="text-3xl font-bold">
                                99%
                            </h2>

                            <p className="text-gray-300 mt-2">
                                Happy Members
                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="bg-white dark:bg-slate-900 p-12 flex items-center">

                    <div className="w-full">

                        <h2 className="text-4xl font-bold text-center mb-2">
                            Create Account
                        </h2>

                        <p className="text-center text-gray-500 mb-8">
                            Join the SocialSphere community
                        </p>

                        <form
                            onSubmit={handleRegister}
                            className="space-y-5"
                        >

                            {/* Full Name */}

                            <div>

                                <label className="text-sm text-gray-500">
                                    Full Name
                                </label>

                                <div className="relative mt-2">

                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="w-full pl-12 py-4 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Username */}

                            <div>

                                <label className="text-sm text-gray-500">
                                    Username
                                </label>

                                <div className="relative mt-2">

                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="Choose username"
                                        className="w-full pl-12 py-4 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Email */}

                            <div>

                                <label className="text-sm text-gray-500">
                                    Email
                                </label>

                                <div className="relative mt-2">

                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        className="w-full pl-12 py-4 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Password */}

                            <div>

                                <label className="text-sm text-gray-500">
                                    Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>

                                </div>

                            </div>

                            {/* Confirm Password */}

                            <div>

                                <label className="text-sm text-gray-500">
                                    Confirm Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>

                                </div>

                            </div>

                            {/* Register Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-4 text-white font-semibold flex justify-center items-center gap-2 transition"
                            >
                                {loading ? "Creating Account..." : "Create Account"}

                                {!loading && (
                                    <ArrowRight
                                        size={20}
                                        className="group-hover:translate-x-1 transition"
                                    />
                                )}
                            </button>

                            <p className="text-center text-gray-500">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="text-blue-600 ml-2 font-semibold hover:underline"
                                >
                                    Login
                                </Link>

                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </AuthLayout>

    );
};

export default Register;