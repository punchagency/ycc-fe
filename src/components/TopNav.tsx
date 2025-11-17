import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { useTheme } from "../context/theme/themeContext";
import logo from "../assets/images/logo-login.png";
import dashboardLogo from "../assets/images/crew/dashboard-icon.png";
import calendarLogo from "../assets/images/crew/calendar-icon.png";
import inventoryLogo from "../assets/images/crew/inventory-icon.png";
import orderLogo from "../assets/images/crew/order-icon.png";
import bookingLogo from "../assets/images/crew/booking-icon.png";
import financeLogo from "../assets/images/crew/financial-icon.png";
import settingsLogo from "../assets/images/crew/settings-icon.png";
import notificationLogo from "../assets/images/crew/notification-icon.png";
import reportLogo from "../assets/images/crew/report-icon.png";
import logoutLogo from "../assets/images/crew/logout.png";
import PeopleIcon from "@mui/icons-material/People";
import { useUser } from "../context/userContext";
import transactionLogo from "../assets/images/crew/inventory-icon.png";

interface SubMenuItem {
  label: string;
  path: string;
}

interface MenuItem {
  label: string;
  icon: string | React.ReactNode;
  path?: string;
  onClick?: () => void;
  divider?: boolean;
  subItems?: SubMenuItem[];
}

interface TopNavProps {
  isOpen: boolean;
  onClose: () => void;
  role?: string;
}

const TopNav: React.FC<TopNavProps> = ({ isOpen, onClose, role = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { user } = useUser();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Get role name from object or string (consistent with menu component)
  let userRole: string | undefined = user?.role;
  if (typeof userRole === 'object' && userRole?.name) {
    userRole = userRole.name;
  }

  const isCrewMember = userRole === "crew_member";
  const isSupplier = userRole === "supplier";
  const isServiceProvider = userRole === "service_provider";

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLogout = () => {
    confirmDialog({
      message: "Are you sure you want to log out?",
      header: "Logout Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "custom-mobile-logout-accept",
      rejectClassName: "custom-mobile-logout-reject",
      acceptLabel: "Yes",
      rejectLabel: "Cancel",
      accept: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      },
      reject: () => { },
      footer: (options) => (
        <div className="flex justify-center gap-3 mt-3">
          <Button
            label="Cancel"
            className="custom-mobile-logout-reject !w-[110px] !bg-gray-100 !text-black !border !border-gray-200 !font-semibold !text-base"
            onClick={options.reject}
          />
          <Button
            label="Yes"
            className="custom-mobile-logout-accept !w-[110px] !bg-[#FF4B4B] !text-white !font-semibold !text-base !border-none"
            onClick={options.accept}
          />
        </div>
      ),
    });
  };

  // Inject custom styles for logout dialog
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-mobile-logout-accept {
        background-color: #FF4B4B !important;
        color: #fff !important;
        border: none !important;
        font-weight: 600 !important;
        font-size: 16px !important;
        width: 110px !important;
      }
      .custom-mobile-logout-reject {
        background-color: #f3f4f6 !important;
        color: #000 !important;
        border: 1px solid #e5e7eb !important;
        font-weight: 600 !important;
        font-size: 16px !important;
        width: 110px !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Inject mobile-only style for accommodation icon/text rows
  useEffect(() => {
    const isAccommodation = location.pathname === "/crew/accomodation";
    let style: HTMLStyleElement | undefined;
    
    if (isOpen && isAccommodation) {
      style = document.createElement("style");
      style.textContent = `
        @media (max-width: 600px) {
          .flex.align-items-center.mb-3 {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }
          .flex.align-items-center.mb-3 p {
            margin-left: 6px !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-align: left !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      if (style) document.head.removeChild(style);
    };
  }, [isOpen, location.pathname]);

  // Create role-specific menu items
  const crewMenuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: dashboardLogo,
      path: "/crew/dashboard",
    },
    {
      label: "Crewsss",
      icon: (
        <PeopleIcon className={theme === "light" ? "text-[#103B57]" : "text-white"} />
      ),
      path: "/crew",
      subItems: [
        {
          label: "Document Management",
          path: "/crew/document-management",
        },
      ],
    },
    {
      label: "Calendar",
      icon: calendarLogo,
      path: "/crew/calendar",
    },
    {
      label: "Orders",
      icon: orderLogo,
      path: "/crew/orders-management",
    },
    {
      label: "Bookings",
      icon: bookingLogo,
      path: "/crew/booking",
    },
    {
      label: "Financial Management",
      icon: financeLogo,
      path: "/crew/financial-management",
    },
    {
      label: "Notifications",
      icon: notificationLogo,
      path: "/crew/notifications",
    },
    {
      label: "Reports",
      icon: reportLogo,
      path: "/crew/reports",
    },
    {
      label: "Settings",
      icon: settingsLogo,
      path: "/crew/settings",
    },
    {
      label: "Log Out",
      icon: logoutLogo,
      onClick: handleLogout,
      divider: true,
    },
  ];

  const adminMenuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: dashboardLogo,
      path: "/admin/dashboard",
    },
    {
      label: "Category",
      icon: dashboardLogo,
      path: "/admin/category",
    },
    {
      label: "Inventory Management",
      icon: inventoryLogo,
      path: "/admin/inventory-management",
    },
    {
      label: "Orders",
      icon: orderLogo,
      path: "/admin/orders-management",
    },
    {
      label: "Bookings",
      icon: bookingLogo,
      path: "/admin/bookings-management",
    },
    {
      label: "Financial Management",
      icon: financeLogo,
      path: "/admin/financial-management",
    },
    {
      label: "Notifications",
      icon: notificationLogo,
      path: "/admin/notifications",
    },
    {
      label: "Reports",
      icon: reportLogo,
      path: "/admin/reports",
    },
    {
      label: "Settings",
      icon: settingsLogo,
      path: "/admin/settings",
    },
    {
      label: "Log Out",
      icon: logoutLogo,
      onClick: handleLogout,
      divider: true,
    },
  ];

  const supplierMenuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: dashboardLogo,
      path: '/supplier/dashboard',
    },
    {
      label: "Inventory Management",
      icon: inventoryLogo,
      path: "/supplier/inventory",
    },
    {
      label: "Orders",
      icon: orderLogo,
      path: "/supplier/orders"
    },
    {
      label: "Transactions",
      icon: transactionLogo,
      path: "/supplier/transactions",
    },
    {
      label: "Notifications",
      icon: notificationLogo,
      path: "/supplier/notifications",
    },
    {
      label: "Settings",
      icon: settingsLogo,
      path: "/supplier/settings"
    },
    {
      label: "Log Out",
      icon: logoutLogo,
      onClick: handleLogout,
      divider: true,
    },
  ];

  const ServiceProviderMenuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: dashboardLogo,
      path: '/service-provider/dashboard',
    },
    {
      label: "Service Management",
      icon: inventoryLogo,
      path: "/service-provider/services",
    },
    {
      label: "Bookings",
      icon: orderLogo,
      path: "/service-provider/bookings"
    },
    {
      label: "Calendar",
      icon: calendarLogo,
      path: "/service-provider/calendar"
    },
    {
      label: "Transactions",
      icon: transactionLogo,
      path: "/service-provider/transactions",
    },
    {
      label: "Notifications",
      icon: notificationLogo,
      path: "/service-provider/notifications",
    },
    {
      label: "Settings",
      icon: settingsLogo,
      path: "/service-provider/settings"
    },
    {
      label: "Log Out",
      icon: logoutLogo,
      onClick: handleLogout,
      divider: true,
    },
  ];

  // Choose menu items based on user role
  const menuItems = isCrewMember 
    ? crewMenuItems 
    : isSupplier 
    ? supplierMenuItems 
    : isServiceProvider 
    ? ServiceProviderMenuItems 
    : adminMenuItems;

  const handleNavigation = (path?: string, onClick?: () => void, subItems?: SubMenuItem[]) => {
    if (onClick) {
      onClick();
    } else if (subItems && subItems.length > 0) {
      setOpenSubMenu((prev) => (prev === path ? null : path || null));
    } else if (path) {
      navigate(path);
      onClose();
    }
  };

  // Create the menu content
  const menuContent = (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999998] transition-opacity duration-300"
          style={{ opacity: isOpen ? 1 : 0 }}
          onClick={onClose}
        />
      )}

      {/* Menu container */}
      <div
        className={`fixed top-0 h-screen z-[999999] transition-all duration-300 ease-in-out flex flex-col overflow-y-auto overflow-x-hidden p-5 w-[85%] max-w-[400px] ${
          theme === "light" ? "bg-white" : "bg-[#03141F]"
        } ${isOpen ? "left-0 shadow-[2px_0_10px_rgba(0,0,0,0.3)]" : "-left-full"}`}
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        <div className="flex justify-between items-center mb-8">
          <div
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="h-10" />
          </div>
          <Button
            icon="pi pi-times"
            className={`p-button-rounded p-button-text !text-2xl ${
              theme === "light" ? "!text-black" : "!text-white"
            }`}
            onClick={onClose}
          />
        </div>

        <div className="mt-5">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.divider && (
                <div
                  className={`h-px my-4 ${
                    theme === "light" ? "bg-[#E4E7EC]" : "bg-[#1E2A35]"
                  }`}
                />
              )}

              <div
                className={`flex items-center p-4 rounded-lg mb-2.5 cursor-pointer relative transition-colors duration-200 ${
                  location.pathname === item.path
                    ? theme === "light"
                      ? "bg-[#F0F5FF]"
                      : "bg-[#1A2A3A]"
                    : "bg-transparent hover:bg-opacity-50"
                }`}
                onClick={() =>
                  handleNavigation(item.path, item.onClick, item.subItems)
                }
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor =
                      theme === "light" ? "#F8FBFF" : "#0A1929";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`w-5 h-5 mr-4 ${
                      location.pathname === item.path ? "opacity-100" : "opacity-70"
                    }`}
                  />
                ) : (
                  <span className="mr-4 flex items-center">
                    {item.icon}
                  </span>
                )}
                <span
                  className={`text-base ${
                    theme === "light" ? "text-[#103B57]" : "text-white"
                  } ${
                    location.pathname === item.path ? "font-semibold" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
                {item.subItems && (
                  <span 
                    className={`ml-auto text-xs ${
                      theme === "light" ? "text-[#103B57]" : "text-white"
                    }`}
                  >
                    {openSubMenu === item.path ? "▲" : "▼"}
                  </span>
                )}
              </div>

              {/* Responsive Crew Dropdown */}
              {item.subItems && openSubMenu === item.path && (
                <div
                  className={`rounded-lg ml-9 mb-2.5 shadow-sm py-2 ${
                    theme === "light"
                      ? "bg-[#F8FBFF] border border-[#E4E7EC]"
                      : "bg-[#0A1929] border border-[#1E2A35]"
                  }`}
                >
                  {item.subItems.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className={`flex items-center py-3 px-4 rounded-md mx-2 my-1 text-[15px] cursor-pointer transition-colors duration-200 ${
                        location.pathname === sub.path
                          ? theme === "light"
                            ? "bg-[#F0F5FF] font-semibold"
                            : "bg-[#1A2A3A] font-semibold"
                          : "bg-transparent font-normal"
                      } ${
                        theme === "light" ? "text-[#103B57]" : "text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(sub.path);
                        setOpenSubMenu(null);
                        onClose();
                      }}
                      onMouseEnter={(e) => {
                        if (location.pathname !== sub.path) {
                          e.currentTarget.style.backgroundColor =
                            theme === "light" ? "#F0F5FF" : "#1A2A3A";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (location.pathname !== sub.path) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // Use Portal to render menu at the root level of the DOM
  return ReactDOM.createPortal(menuContent, document.body);
};

export default TopNav;