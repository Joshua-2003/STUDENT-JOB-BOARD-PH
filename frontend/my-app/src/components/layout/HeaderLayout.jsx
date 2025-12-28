import { IoIosSettings, IoIosNotifications } from "react-icons/io";

import { useAuth } from "../../context/AuthContext";
import { useLocation } from 'react-router-dom';

export default function HeaderLayout() {
    const { user } = useAuth();
    const location = useLocation();

    const getHeaderTitle = () => {
        switch (user?.type) {
            case "ADMIN":
                switch (location.pathname) {
                    case "/admin":
                        return "Admin Dashboard";
                    case "/students-list":
                        return "Students List";
                    default:
                        return "Admin Dashboard";
                }
            case "EMPLOYER":
                return "Employer Dashboard";
            case "STUDENT":
                return "Student Dashboard";
            default:
                return "Dashboard";
        }
    }

    const title = getHeaderTitle();

    return (
        <header className="w-full bg-white px-8 py-4 mb-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-[#2B2D31] tracking-tight">{title}</h1>
                
                <div className="flex items-center gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition-colors duration-150 cursor-pointer">
                        <IoIosSettings className="w-5 h-5" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition-colors duration-150 cursor-pointer">
                        <IoIosNotifications className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}