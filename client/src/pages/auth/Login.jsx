// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";

// import { login } from "../../services/authService";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {

//     const navigate = useNavigate();

//     const { setUser } = useContext(AuthContext);

//     const [formData, setFormData] = useState({
//         login: "",
//         password: ""
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             setLoading(true);

//             const res = await login(formData);

//             localStorage.setItem("token", res.data.token);

//             localStorage.setItem(
//                 "user",
//                 JSON.stringify(res.data.user)
//             );

//             setUser(res.data.user);

//             toast.success("Login Successful");

//             navigate("/");

//         } catch (error) {

//             toast.error(
//                 error.response?.data?.message || "Login Failed"
//             );

//         } finally {

//             setLoading(false);

//         }

//     };

//     return (

//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">

//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white shadow-lg rounded-xl p-8 w-[400px]"
//             >

//                 <h1 className="text-3xl font-bold text-center mb-6">
//                     SocialSphere
//                 </h1>

//                 <input
//                     type="text"
//                     name="login"
//                     placeholder="Username or Email"
//                     className="w-full border p-3 rounded-lg mb-4"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="w-full border p-3 rounded-lg mb-5"
//                     onChange={handleChange}
//                 />

//                 <button
//                     className="w-full bg-blue-600 text-white p-3 rounded-lg"
//                 >
//                     {
//                         loading
//                             ? "Please Wait..."
//                             : "Login"
//                     }
//                 </button>

//                 <p className="text-center mt-5">

//                     Don't have an account?

//                     <Link
//                         className="text-blue-600 ml-1"
//                         to="/register"
//                     >
//                         Register
//                     </Link>

//                 </p>

//             </form>

//         </div>

//     );

// };

// export default Login;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        login: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await login(form);

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setUser(res.data.user);

            toast.success("Login Successful");

            navigate("/");

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

        finally {

            setLoading(false);

        }

    };
    return (

        <AuthLayout>

            <div className="relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,.45)] hover:scale-[1.01] transition duration-500 grid lg:grid-cols-2">
                {/* Left Side */}

                <div className="hidden lg:flex flex-col justify-center p-16 text-white">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl shadow-xl animate-bounce">
                            🌐
                        </div>
                        <div>
                            <h1 className="text-5xl font-black"> SocialSphere </h1>
                            <p className="text-gray-400"> Connect Beyond Boundaries </p>
                        </div>
                    </div>

                    <p className="text-xl text-gray-300 leading-9">Join thousands of people sharing moments, building communities and discovering new connections every day.</p>

                    <div className="mt-12 grid grid-cols-2 gap-5">

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10 hover:scale-105 transition duration-300 cursor-default">
                            <h2 className="text-3xl font-bold"> 10K+ </h2>
                            <p className="text-gray-300 mt-2"> Active Users </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10 hover:scale-105 transition duration-300 cursor-default">
                            <h2 className="text-3xl font-bold"> 1M+ </h2>
                            <p className="text-gray-300 mt-2"> Posts Shared </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10 hover:scale-105 transition duration-300 cursor-default">
                            <h2 className="text-3xl font-bold"> 25K+ </h2>
                            <p className="text-gray-300 mt-2"> Photos Uploaded </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-5 border border-white/10 hover:scale-105 transition duration-300 cursor-default">
                            <h2 className="text-3xl font-bold"> 99% </h2>
                            <p className="text-gray-300 mt-2"> Happy Members </p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}

                <div className="bg-white dark:bg-slate-900 p-12 flex items-center">

                    <div className="w-full">

                        <h2 className="text-4xl font-bold text-center mb-2"> Welcome Back </h2>

                        <p className="text-center text-gray-500 mb-10">Login to continue</p>

                        <form className="space-y-6" onSubmit={handleLogin}>

                            {/* Login */}

                            <div>
                                <label className="text-sm font-medium text-gray-500"> Username or Email </label>
                                <div className="relative mt-2">
                                    <User
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        name="login"
                                        value={form.login}
                                        onChange={handleChange}
                                        placeholder="Enter username or email"
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Password */}

                            <div>
                                <label className="text-sm font-medium text-gray-500"> Password </label>
                                <div className="relative mt-2">
                                    <Lock
                                        size={20}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {
                                            showPassword
                                                ? <EyeOff size={20} />
                                                : <Eye size={20} />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-blue-600 hover:underline text-sm"
                                > Forgot Password?
                                </button>
                            </div>

                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-4 font-semibold text-white transition flex justify-center items-center gap-2 disabled:opacity-60"
                            >

                                {
                                    loading
                                        ? "Please Wait..."
                                        :
                                        <>
                                            Login
                                            <ArrowRight
                                                size={20}
                                                className="group-hover:translate-x-1 transition"
                                            />
                                        </>
                                }

                            </button>

                            {/* Register */}

                            <p className="text-center text-gray-500"> Don't have an account?
                                <Link to="/register" className="text-blue-600 font-semibold cursor-pointer ml-2 hover:underline">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;