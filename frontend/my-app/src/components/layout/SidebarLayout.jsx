import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

import { MdDashboard, MdPeople, MdInsertChart, MdLogout } from "react-icons/md";

export default function SidebarLayout({ children }) {
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

    return (
        <div className="flex h-screen bg-white ">
            {/* Sidebar */}
            <aside className="h-screen w-64 bg-white flex flex-col shadow-xl">
                {/* Logo */}
                <div className="h-16 flex flex-col items-center justify-center px-4 gap-4 pt-4">
                    <div onClick={() => navigate(getDashboardPath)} className="text-[#344767] font-bold cursor-pointer">
                        JOB BOARD PH
                    </div>

                    {/* Divider */}
                    <div className="bg-gray-200 w-full h-px rounded-full"></div>
                </div>


                {/* Main Nav */}
                <nav className="flex flex-col gap-4 px-4 py-6 flex-grow">
                    {navItems.map((item) => {
                        const Icon = item.icon; // get the icon component
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="text-[#344767] font-medium flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 w-full text-left cursor-pointer"
                            >
                                <span className="shadow-2xl bg-gray-200 p-2 rounded-lg">
                                    <Icon className="" />
                                </span>
                                <span className="text-sm">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>


                {/* Bottom Nav */}
                <div className="p-3 space-y-1">
                    <button onClick={() => logout()} className="text-[#344767] font-medium flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 w-full text-left cursor-pointer">
                        <span className="shadow-2xl bg-gray-200 p-2 rounded-lg"><MdLogout /></span>
                        <span className="text-sm">Logout</span>
                    </button>
                </div>

                
            </aside>

            {/* Main Area */}
            <main className="flex-1 p-6 overflow-auto bg-gray-50">
                {children}
            </main>
        </div>
    );


}
