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
        <header className="w-full h-16 flex items-center justify-between">
            <h1 className="text-lg font-bold text-[#344767]">{title}</h1>
            <div className="flex flex-row justify-center items-center gap-x-3">
                {/* Icon */}
                <button className="text-[#344767] text-lg cursor-pointer"><IoIosSettings /></button>
                <button className="text-[#344767] text-lg cursor-pointer"><IoIosNotifications /></button>
            </div>
        </header>
    );
}