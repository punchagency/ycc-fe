import React, { useState, useRef, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import GlobalSearchModal from "./GlobalSearchModal";
import hamburger from "../assets/images/crew/hamburger.png";
import searchLogo from "../assets/images/crew/searchLogo.png";
import manprofile from "../assets/images/crew/manprofile.png";
import { Store, Bell, ShoppingCart } from "lucide-react";
import { useUser } from "../context/userContext";
import { useCart } from "../context/cart/cartContext";
import { checkPendingVendors } from "../services/admin/adminService";
import { getNotifications } from "../services/notification/notificationService";

interface AdminHeaderProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  role?: string | { name: string };
  toggleSidebar?: () => void;
}

interface Notification {
  priority: string;
  type: string;
  description: string;
  status: string;
  createdAt?: string;
  create_at?: string;
  _id: string;
}

interface SearchFilters {
  type: string;
  status: string;
  sortField: string;
  sortDirection: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  role, 
  toggleSidebar 
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { cartCount, loading: cartCountLoading } = useCart();
  console.log('🛒 Cart count:', cartCount);

  // Helper function to get role name
  const getRoleName = (roleObj: string | { name: string } | undefined): string | null => {
    if (typeof roleObj === "string") {
      return roleObj;
    }
    if (typeof roleObj === "object" && roleObj?.name) {
      return roleObj.name;
    }
    return null;
  };

  // Determine the role
  let userRole = role;
  if (!userRole) {
    userRole = getRoleName(user?.role);
  } else {
    userRole = getRoleName(userRole);
  }

  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userName] = useState("Admin User");
  const [searchFilters] = useState<SearchFilters>({
    type: "all",
    status: "all",
    sortField: "relevance",
    sortDirection: "desc",
  });
  const [hasPendingVendors, setHasPendingVendors] = useState(false);

  const overlayPanelRef = useRef<OverlayPanel>(null);

  useEffect(() => {
    fetchNotifications();
    const checkVendors = async () => {
      if (userRole === "admin") {
        try {
          const response = await checkPendingVendors();
          if (response.status === "success") {
            setHasPendingVendors(response.data.hasPendingVendors);
          }
        } catch (error) {
          console.error("Error checking pending vendors:", error);
        }
      }
    };

    checkVendors();
    const interval = setInterval(checkVendors, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [userRole]);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      if (response.success) {
        const transformedData = response.data.map((item: any) => ({
          priority: item.priority || "Low",
          type: item.type || "General Issue",
          description: item.message || item.description,
          status: item.status || "Pending",
          createdAt: item.create_at || item.createdAt,
          _id: item._id,
        }));
        setNotifications(transformedData);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const viewAllNotifications = () => {
    if (userRole === "admin") {
      navigate("/admin/notifications");
    } else if (userRole === "crew_member") {
      navigate("/crew/notifications");
    } else if (userRole === "service_provider") {
      navigate("/service-provider/notifications");
    } else if (userRole === "supplier") {
      navigate("/supplier/notifications");
    } else {
      navigate("/admin/notifications");
    }

    overlayPanelRef.current?.hide();
  };

  const isMobile = window.innerWidth <= 768;
  const isIpadPro = window.innerWidth === 1024 && window.innerHeight === 1366;

  const start = (
    <div className="flex flex-col md:flex-row items-center w-full gap-4">
      <div className="flex w-full items-center gap-4 justify-between">
        {/* Left Group: Hamburger + Search */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu */}
          <div
            className="cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <img src={hamburger} alt="menu" className="w-6 h-6" />
          </div>

          {/* Search Input */}
          <div className="relative flex items-center">
            {isMobile ? (
              <Button
                icon={<img src={searchLogo} alt="search" className="w-6 h-6" />}
                onClick={() => setShowSearchModal(true)}
                className="bg-transparent border-none p-0 w-10 h-10"
              />
            ) : (
              <div className="relative w-[350px]">
                <img src={searchLogo} alt="search" className="absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={() => setShowSearchModal(true)}
                  className="pl-9 w-full h-10 border border-gray-300 rounded-full bg-[#F5F6FA] outline-none text-[10px] cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Group: Store + Notifications + Profile (Mobile Only) */}
        {isMobile && (
          <div className="flex items-center gap-2">
            {/* Store Icon */}
            {userRole === "admin" && (
              <button
                onClick={() => navigate("/admin/approve")}
                className="flex items-center justify-center w-10 h-10 bg-transparent border-none rounded-full cursor-pointer transition-all duration-200 p-2 relative hover:bg-gray-100"
                aria-label="Supplier and Vendor Management"
              >
                <Store className="w-6 h-6 text-[#0387D9]" />
                {hasPendingVendors && (
                  <div className="absolute top-2 right-1 w-3 h-3 bg-[#FF4B4B] rounded-full border-2 border-white" />
                )}
              </button>
            )}

            {/* Cart Icon - Only show for crew members */}
            {userRole === "crew_member" && (
              <button
                onClick={() => navigate("/crew/cart")}
                className="flex items-center justify-center w-10 h-10 bg-transparent border-none rounded-full cursor-pointer transition-all duration-200 p-2 relative hover:bg-gray-100"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6 text-[#0387D9]" />
                {cartCountLoading ? (
                  <div className="absolute top-1.5 right-0.5 w-4 h-4 flex items-center justify-center">
                    <span className="w-3.5 h-3.5 border-2 border-[#0387D9] border-t-white rounded-full inline-block animate-spin" />
                  </div>
                ) : (
                  cartCount > 0 && (
                    <div className="absolute top-1.5 right-0.5 min-w-4 h-4 bg-[#FF4B4B] rounded-full border-2 border-white text-[10px] flex items-center justify-center text-white font-bold px-1 z-[2] shadow-sm">
                      {cartCount > 99 ? "99+" : cartCount}
                    </div>
                  )
                )}
              </button>
            )}

            {/* Bell Icon */}
            <button
              onClick={(event) => overlayPanelRef.current?.toggle(event)}
              className="flex items-center justify-center w-10 h-10 bg-transparent border-none rounded-full cursor-pointer transition-all duration-200 p-2 relative hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-[#0387D9]" />
              {notifications.length > 0 && (
                <div className="absolute top-2 right-1 w-3 h-3 bg-[#FF4B4B] rounded-full border-2 border-white" />
              )}
            </button>

            {/* Profile Image Only */}
            <div
              className="cursor-pointer flex items-center"
              onClick={() => {
                if (userRole === "crew_member") {
                  navigate("/crew/profile");
                } else if (userRole === "service_provider") {
                  navigate("/service-provider/profile");
                } else if (userRole === "suppliers") {
                  navigate("/suppliers/profile");
                } else {
                  navigate("/admin/profile");
                }
              }}
            >
              <img
                src={user?.profilePicture || user?.crewProfile?.profilePicture || manprofile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const end = (
    <>
      {/* Notification Overlay Panel */}
      <OverlayPanel
        ref={overlayPanelRef}
        className="!w-80 !p-4 !z-[1100]"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <h4 className="m-0 text-base font-semibold">Notifications</h4>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="flex items-start py-3 border-b border-[#E4E7EC] relative"
            >
              {/* Priority Dot */}
              <div
                className={`w-2 h-2 rounded-full mt-1.5 mr-3 ${
                  item.priority === "High"
                    ? "bg-[#F04438]"
                    : item.priority === "Medium"
                    ? "bg-[#F79009]"
                    : "bg-[#12B76A]"
                }`}
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-[#344054] mb-1">
                    {item.priority} Priority
                  </span>

                  {/* More Options Icon */}
                  <button className="border-none bg-transparent p-1 cursor-pointer">
                    <i className="pi pi-ellipsis-h text-[#667085] text-base" />
                  </button>
                </div>

                <p className="m-0 text-sm text-[#475467]">{item.description}</p>

                <span className="text-xs text-[#667085] mt-1 block">
                  {item.create_at}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Button
          label="View All Notifications"
          className="p-button-text w-full mt-4 !text-[#0387D9] !border !border-[#0387D9] rounded-lg !p-2 !bg-transparent"
          onClick={viewAllNotifications}
        />
      </OverlayPanel>

      <div className="flex items-center gap-2">
        {/* Store Icon - Desktop */}
        {!isMobile && userRole === "admin" && (
          <button
            onClick={() => navigate("/admin/approve")}
            className="flex items-center justify-center w-10 h-10 bg-transparent border-none rounded-full cursor-pointer transition-all duration-200 p-2 relative hover:bg-gray-100"
            aria-label="Supplier and Vendor Management"
          >
            <Store className="w-6 h-6 text-[#0387D9]" />
            {hasPendingVendors && (
              <div className="absolute top-2 right-1 w-3 h-3 bg-[#FF4B4B] rounded-full border-2 border-white" />
            )}
          </button>
        )}

        {/* Cart Icon - Desktop for crew members */}
        {!isMobile && userRole === "crew_member" && (
          <button
            onClick={() => navigate("/crew/cart")}
            className="flex items-center justify-center w-10 h-10 bg-transparent border-none rounded-full cursor-pointer transition-all duration-200 p-2 relative hover:bg-gray-100"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6 text-[#0387D9]" />
            {cartCountLoading ? (
              <div className="absolute top-1.5 right-0.5 w-4 h-4 flex items-center justify-center">
                <span className="w-3.5 h-3.5 border-2 border-[#0387D9] border-t-white rounded-full inline-block animate-spin" />
              </div>
            ) : (
              cartCount > 0 && (
                <div className="absolute top-1.5 right-0.5 min-w-4 h-4 bg-[#FF4B4B] rounded-full border-2 border-white text-[10px] flex items-center justify-center text-white font-bold px-1 z-[2] shadow-sm">
                  {cartCount > 99 ? "99+" : cartCount}
                </div>
              )
            )}
          </button>
        )}

        {/* Notification Bell - Desktop */}
        {!isMobile && (
          <button
            onClick={(event) => overlayPanelRef.current?.toggle(event)}
            className="flex items-center justify-center w-10 h-10 bg-transparent border-none rounded-full cursor-pointer transition-all duration-200 p-2 relative hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-[#0387D9]" />
            {notifications.length > 0 && (
              <div className="absolute top-2 right-1 w-3 h-3 bg-[#FF4B4B] rounded-full border-2 border-white" />
            )}
          </button>
        )}

        {/* Profile Section - Desktop */}
        {!isMobile && (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                if (userRole === "crew_member") {
                  navigate("/crew/profile");
                } else if (userRole === "service_provider") {
                  navigate("/service-provider/profile");
                } else if (userRole === "suppliers") {
                  navigate("/suppliers/profile");
                } else {
                  navigate("/admin/profile");
                }
              }}
            >
              <img
                src={user?.profilePicture || user?.crewProfile?.profilePicture || manprofile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="m-0">
                  {user?.crewProfile
                    ? `${user.crewProfile.firstName} ${user.crewProfile.lastName}`
                    : user?.name || userName}
                </p>
                <p className="m-0">
                  {userRole
                    ? userRole.charAt(0).toUpperCase() + userRole.slice(1).replace("_", " ")
                    : "Admin"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <header className="admin-header">
      <Menubar
        start={start}
        end={end}
        className={`${
          isMobile ? "p-2 fixed top-0 left-0 right-0 z-[1000] shadow-md" : "p-4 relative"
        } flex-wrap bg-[#F8FBFF] text-[#103B57]`}
      />
      <TopNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        role={userRole}
      />
      {isIpadPro && (
        <div
          className="fixed top-4 left-4 z-[1001] cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <img src={hamburger} alt="menu" className="w-6 h-6" />
        </div>
      )}
      <GlobalSearchModal
        visible={showSearchModal}
        onHide={() => setShowSearchModal(false)}
        initialFilters={searchFilters}
      />
    </header>
  );
};

export default AdminHeader;