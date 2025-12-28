import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from 'react-router-dom';

import { MdDashboard, MdPeople, MdInsertChart, MdLogout } from "react-icons/md";

export default function SidebarLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
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
                    { name: "Dashboard", path: "/admin", icon: MdDashboard },
                    { name: "Students List", path: "/students-list", icon: MdPeople },
                ];
            case "EMPLOYER":
                return [
                    { name: "Dashboard", path: "/employer", icon: MdDashboard },
                ];
            case "STUDENT":
                return [
                    { name: "Dashboard", path: "/student", icon: MdDashboard },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="h-screen w-64 bg-white flex flex-col shadow-xl border-r border-[#E5E7EB]">
                {/* Logo */}
                <div className="h-16 flex items-center justify-center px-6 border-b border-[#E5E7EB]">
                    <div
                        onClick={() => navigate(getDashboardPath)}
                        className="text-[#2B2D31] text-lg font-semibold tracking-tight cursor-pointer hover:text-[#1F2023] transition-colors duration-150"
                    >
                        JOB BOARD PH
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="flex flex-col gap-1 px-3 py-4 flex-grow">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 cursor-pointer
                                    ${active
                                        ? 'bg-[#2B2D31] text-white shadow-sm'
                                        : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Nav */}
                <div className="p-3 border-t border-[#E5E7EB]">
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] w-full text-left font-medium text-sm transition-all duration-150 cursor-pointer"
                    >
                        <MdLogout className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}