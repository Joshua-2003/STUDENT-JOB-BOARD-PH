import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const getDashboardPath = () => {
        switch (user?.type) {
            case "ADMIN":
                return "/admin";
            case "EMPLOYER":
                return "/employer";
            case "STUDENT":
                return "/student";
            default:
                return "/";
        }
    }

    const getNavItems = () => {
        switch (user?.type) {
            case "ADMIN":
                return [
                    { name: "Dashboard", path: "/admin" },
                    { name: "Students List", path: "/students-list" },
                ];
            case "EMPLOYER":
                return [
                    { name: "Dashboard", path: "/employer" },
                ];
            case "STUDENT":
                return [
                    { name: "Dashboard", path: "/student" },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo / Title */}
                    <h2
                        className="text-2xl font-bold cursor-pointer hover:text-indigo-400 transition-colors"
                        onClick={() => navigate(getDashboardPath())}
                    >
                        STUDENT JOB BOARD PH
                    </h2>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="px-3 py-2 rounded hover:bg-gray-700 hover:text-indigo-400 transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-sm text-gray-400">
                        © 2025 Student Job Board PH. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>

    )
}