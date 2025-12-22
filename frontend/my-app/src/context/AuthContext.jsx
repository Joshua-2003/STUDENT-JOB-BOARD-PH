import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await api.get("/auth/me", { withCredentials: true });
            setUser(response.data.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Redirect when user changes
    useEffect(() => {
        if (!user) return;

        if (user.type === "ADMIN") navigate("/admin");
        else if (user.type === "STUDENT") navigate("/student");
        else if (user.type === "EMPLOYER") navigate("/employer");
    }, [user]);

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, fetchUser, isAuthenticated: user ? true : false }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
    