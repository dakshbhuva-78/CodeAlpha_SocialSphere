import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import Search from "../pages/user/Search";
import SavedPosts from "../pages/user/SavedPosts";
import Notification from "../pages/notification/Notification";
import CreatePost from "../pages/user/CreatePost";
import PostDetails from "../pages/user/PostDetails";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Posts from "../pages/admin/Posts";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User */}

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile/:id"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/search"
                element={
                    <ProtectedRoute>
                        <Search />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/saved"
                element={
                    <ProtectedRoute>
                        <SavedPosts />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <Notification />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/create"
                element={
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/post/:id"
                element={
                    <ProtectedRoute>
                        <PostDetails />
                    </ProtectedRoute>
                }
            />

            {/* Admin */}

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
                path="/admin/dashboard"
                element={
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/posts"
                element={
                    <AdminRoute>
                        <Posts />
                    </AdminRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/login" />}
            />

        </Routes>
    );
};

export default AppRoutes;