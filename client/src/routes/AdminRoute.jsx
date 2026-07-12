import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

    const adminToken = localStorage.getItem("adminToken");
    const admin = localStorage.getItem("admin");

    if (!adminToken || !admin) {

        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );

    }

    return children;

};

export default AdminRoute;