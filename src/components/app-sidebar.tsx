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
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useReduxUser } from "@/hooks/useReduxUser"

const getRoleBasedMenuItems = (role: string) => {
  const menuItems = {
    distributor: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Bookings", url: "/bookings", icon: Calendar },
      { title: "Orders", url: "/orders", icon: ShoppingCart },
      { title: "Service Management", url: "/services", icon: Wrench },
      { title: "Inventory Management", url: "/inventory", icon: Package },
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
        <NavUser user={{ name: user?.firstName || "Codre", email: user?.email || "codre@gmail.com", avatar: user?.profilePicture || ""}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
