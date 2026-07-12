import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

import { loginAdmin } from "../../services/adminService";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await loginAdmin(formData);

            localStorage.setItem(
                "adminToken",
                res.data.token
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(res.data.admin)
            );

            toast.success("Welcome Admin");

            navigate("/admin/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">

                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

                        <ShieldCheck
                            size={42}
                            className="text-blue-600"
                        />

                    </div>

                </div>

                <h1 className="text-3xl font-bold text-center">

                    Admin Login

                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">

                    SocialSphere Admin Panel

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="relative">

                        <Mail
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Admin Email"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>

                    <div className="relative">

                        <Lock
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
                    >

                        {loading ? "Signing In..." : "Login"}

                    </button>

                </form>

            </div>

        </div>

    );

};

export default AdminLogin;