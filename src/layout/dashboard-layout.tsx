import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import profileUpload from "../assets/images/profile-upload.png"; // default image
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useReduxAuth } from "../hooks/useReduxAuth";
import { Link } from "react-router-dom";

export default function DashboardLayout() {

  const { user } = useReduxAuth();


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 bg-[#f8fbff] items-center justify-between px-4 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          {/* Left section: Sidebar trigger + search bar */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Right section: Notifications + user info */}
          <div className="flex items-center gap-4">
            {/* Notification icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
              <BellIcon className="w-6 h-6 text-gray-600" />
              {/* Optional notification badge */}
              <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User info */}
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <Link
                to="/profile"
              >
                <img
                  src={user?.profilePicture || profileUpload}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </Link>
              
              {/* Name and role */}
              <div className="flex flex-col">
                <span className="font-medium text-sm text-gray-800">
                  {user?.firstName || "Codre"}
                </span>
                <span className="text-xs text-gray-500">{user?.role || "User"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main contents */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
