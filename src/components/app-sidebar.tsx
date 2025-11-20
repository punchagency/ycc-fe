"use client"

import * as React from "react"
import {
  Calendar,
  DollarSign,
  FileText,
  GalleryVerticalEnd,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Wrench,
  Bell,
  BarChart3,
  Folder,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useReduxUser } from "@/hooks/useReduxUser"
import { Link } from "react-router-dom";

const getRoleBasedMenuItems = (role: string) => {
  const menuItems = {
    distributor: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Service Management", url: "/services", icon: Wrench },
      { title: "Inventory Management", url: "/inventory", icon: Package },
      { title: "Bookings", url: "/bookings", icon: Calendar },
      { title: "Orders", url: "/orders", icon: ShoppingCart },
      { title: "Calendar", url: "/calendar", icon: Calendar },
      { title: "Transactions", url: "/transactions", icon: DollarSign },
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
    user: [
      { title: "Dashboard", url: "/crew/dashboard", icon: LayoutDashboard },
      { title: "Document Management", url: "/crew/documents", icon: FileText },
      { title: "Calendar", url: "/crew/calendar", icon: Calendar },
      { title: "Financial Management", url: "/crew/finance", icon: DollarSign },
      { title: "Bookings", url: "/crew/bookings", icon: Calendar },
      { title: "Orders", url: "/crew/orders", icon: ShoppingCart },
      { title: "Notifications", url: "/crew/notifications", icon: Bell },
      { title: "Reports", url: "/crew/reports", icon: BarChart3 },
      { title: "Settings", url: "/crew/settings", icon: Settings },
    ],
    admin: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Category", url: "/category", icon: Folder },
      { title: "Calendar", url: "/calendar", icon: Calendar },
      { title: "Inventory Management", url: "/inventory", icon: Package },
      { title: "Orders", url: "/orders", icon: ShoppingCart },
      { title: "Bookings", url: "/bookings", icon: Calendar },
      { title: "Financial Management", url: "/finance", icon: DollarSign },
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Reports", url: "/reports", icon: BarChart3 },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
    manufacturer: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Products", url: "/products", icon: Package },
      { title: "Orders", url: "/orders", icon: ShoppingCart },
      { title: "Transactions", url: "/transactions", icon: DollarSign },
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  };
  
  return menuItems[role as keyof typeof menuItems] || menuItems.user;
};

const data = {
  teams: [
    {
      name: "YCC Platform",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useReduxUser();
  const userRole = user?.role || "user";
  const menuItems = getRoleBasedMenuItems(userRole);
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={{ name: user?.firstName || "Codre", email: user?.email || "codre@gmail.com", avatar: user?.profilePicture || ""}} /> */}
        <Link
          to="/logout"
          className="w-full bg-[#ffe5e5] text-[#ff4b4b] border-2 border-[#ffb3b3] rounded-lg font-inter font-bold text-base py-2 flex items-center justify-center gap-2 transition duration-200 cursor-pointer outline-none hover:bg-[#ffd6d6]"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGRSURBVHgB3VVLTsMwEH0OFWLZG1Bu4CUCJJoTACeocgK4QcoJOELCScgCEBILwg1yhK6hrZlxrdT52K2VFX1S+hk779lvPGPgv0O0A2oqx/jB7TaABZaoxGdZYqiAupApReaOuRVWiMVHWSEAo5r8XE4NeUWrfsQRrZxXv8aE4lOKzyiW0neCANQCiIwtAol4K4vWvJx2d22EghBZv081/2uH3MYCgdjuQGDsJVgjxkl3nHYm8UuvOw6BvQOvACdXFGV3XCDDMb7UpZz5BZQWCIfSSWfhvE8kwkCId7JGkX0OkdG+RNprQHqm5PQ8GBHQSXwOEtBe+wVssFCgwAp3NHviHFda/AnQBVoX494CpkVUvdxsn9BVzuSxzovB4CQb8pfNnyZ5U0CEV6l5L3ORM2yLWGAC30r7KpZzQxXeW4QNAe6c1C74PvBULBfjWSO8o33bOfjWn0vHUVQ7epUDdrsuiCSlJyM7+AxXNXGEG2zsyxGI5o12JedEeA/09qWC/E5Cb7T+O7lt0wilK4mHjz+zg5Q82WFjiAAAAABJRU5ErkJggg=="
            alt="Log Out"
            width={18}
            height={18}
          />
            Logout
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
