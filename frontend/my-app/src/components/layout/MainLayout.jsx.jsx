import SidebarLayout from "./SidebarLayout";
import HeaderLayout from "./HeaderLayout";

export default function MainLayout({children}) {
    return (
        <SidebarLayout>
            {/* Header layout */}
            <HeaderLayout />

            {/* Main content area */}
            {children}
        </SidebarLayout>
    );
}