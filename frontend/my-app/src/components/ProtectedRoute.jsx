import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading, isAuthenticated } = useAuth();

    // Show loading spinner while fetching user
    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div>Loading...</div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check user roles if allowedRoles is provided
    if (allowedRoles && user && !allowedRoles.includes(user.type)) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", textAlign: "center" }}>
                <h2>Access Denied</h2>
                <p>You don't have permission to access this page.</p>
            </div>
        );
    }

    // Otherwise, show the page
    return children;
};

export default ProtectedRoute;
