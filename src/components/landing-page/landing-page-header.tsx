import logo from "../assets/images/icons/YCC-navbar-icon.png";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ChevronDown,
  Menu as MenuIcon,
  ArrowLeft,
  LogOut,
  ChevronUp,
} from "lucide-react";

interface NavOption {
  title: string;
  route: string;
}

interface NavItem {
  title: string;
  link: string;
  external?: boolean;
  options?: NavOption[];
}

interface LandingPageHeaderProps {
  isServiceCheckout?: boolean;
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
  isServiceCheckout = false,
}) => {
  const location = useLocation();
  const { user } = useUser();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { title: "Home", link: "/" },
    { title: "Vendor & Services", link: "/vendor-services" },
    { title: "About Us", link: "/about-us" },
    { title: "Resource Center", link: "/resource-center" },
    { title: "Contact", link: "/contact-us" },
    {
      title: "Affiliate Signup",
      link: "https://affiliate.yachtcrewcenter.com/",
      external: true,
    },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);

  const landingPages = [
    "/",
    "/resource-center",
    "/about-us",
    "/contact-us",
    "/crew",
    "/captain",
    "/exterior",
    "/interior",
    "/engineering",
    "/chef-galley",
    "/vendor-services",
  ];
  const isLandingPage = landingPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const getDashboardRoute = () => {
    if (!user?.role?.name) return "/";
    const roleRoutes: Record<string, string> = {
      crew_member: "/crew/dashboard",
      admin: "/admin/dashboard",
      supplier: "/supplier/dashboard",
      service_provider: "/service-provider/dashboard",
    };
    return roleRoutes[user.role.name] || "/";
  };

  const formatRoleName = (roleName?: string) => {
    if (!roleName) return "";
    return roleName.charAt(0).toUpperCase() + roleName.slice(1).replace("_", " ");
  };

  const getUserDisplayName = () => {
    if (user?.crewProfile) {
      return `${user.crewProfile.firstName} ${user.crewProfile.lastName}`;
    }
    return user?.email || user?.fullName || "User";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1300] transition-all duration-300 ease-in-out ${
        scrolled || isServiceCheckout
          ? "bg-black/80 shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
          : "bg-transparent shadow-none md:bg-transparent"
      } max-w-full bg-white md:bg-transparent`}
    >
      <nav className="w-full flex justify-between items-center gap-8 px-5 sm:px-10 md:pl-[max(0px,calc(40%-345px))] md:pr-20 lg:pl-[max(0px,calc(27%-345px))] lg:pr-[110px] py-4">
        {/* Back Button */}
        {window.history.length > 1 && !isLandingPage && !isServiceCheckout && (
          <button
            onClick={() => navigate(-1)}
            className="text-white mr-1 hover:opacity-80 transition-opacity"
            aria-label="back"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        {/* Hamburger Menu - Mobile Only */}
        <button
          onClick={toggleDrawer}
          className="md:hidden flex items-center justify-center w-[50px] h-[50px] min-w-[50px] min-h-[50px] bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white rounded-lg p-0"
          aria-label="menu"
        >
          <MenuIcon size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-[50px] h-[50px] mr-2.5" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2 lg:gap-10 items-center">
          {navItems.map((item) =>
            item.options ? (
              <Menu as="div" key={item.title} className="relative">
                <MenuButton className="group flex items-center text-white text-sm cursor-pointer transition-colors duration-300 hover:text-[#0487D9] relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#034D92] after:to-[#0487D9] after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100">
                  {item.title}
                  <ChevronDown
                    size={20}
                    className="ml-1 transition-colors duration-300 group-hover:text-[#0487D9]"
                  />
                </MenuButton>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <MenuItems className="absolute left-0 mt-2 min-w-[200px] bg-white rounded-[13px] shadow-md overflow-hidden">
                    {item.options.map((option, idx) => (
                      <MenuItem key={option.title}>
                        {({ active }) => (
                          <Link
                            to={option.route}
                            className={`block w-full px-4 py-3 text-left transition-colors ${
                              idx === 0 ? "rounded-t-[13px]" : ""
                            } ${
                              idx === item.options!.length - 1
                                ? "rounded-b-[13px]"
                                : ""
                            } ${
                              location.pathname === option.route
                                ? "text-[#0487D9] bg-[#E6EFF2]"
                                : "text-[#131313]"
                            } ${active ? "bg-[#E6EFF2]" : ""}`}
                          >
                            {option.title}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <Link
                key={item.title}
                to={item.external ? undefined : item.link}
                className={`relative text-white text-sm cursor-pointer transition-colors duration-300 hover:text-[#0487D9] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#034D92] after:to-[#0487D9] after:transition-opacity after:duration-300 ${
                  location.pathname === item.link
                    ? "after:opacity-100"
                    : "after:opacity-0 hover:after:opacity-100"
                } ${item.external ? "whitespace-nowrap" : ""}`}
              >
                {item.title}
              </Link>
            )
          )}
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 p-0">
                <img
                  src={
                    user.crewProfile?.profilePicture || "/default-avatar.png"
                  }
                  alt={getUserDisplayName()}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1">
                    <span className="text-white font-semibold text-base leading-none font-['Plus_Jakarta_Sans',_Inter,_Roboto,_system-ui,_-apple-system,_'Segoe_UI',_Arial,_sans-serif]">
                      {getUserDisplayName()}
                    </span>
                    <ChevronDown size={20} className="text-white" />
                  </div>
                  <span className="text-white text-[13px] opacity-85 leading-none font-['Plus_Jakarta_Sans',_Inter,_Roboto,_system-ui,_-apple-system,_'Segoe_UI',_Arial,_sans-serif]">
                    {formatRoleName(user.role?.name) ||
                      user.crewProfile?.position ||
                      ""}
                  </span>
                </div>
              </MenuButton>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <MenuItems className="absolute right-0 mt-2 min-w-[160px] bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.10)] overflow-hidden">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => navigate(getDashboardRoute())}
                        className={`block w-full text-left px-4 py-3 text-[15px] transition-colors rounded-t-lg ${
                          active
                            ? "bg-[#f5f8fa] text-[#0487D9]"
                            : "text-gray-900"
                        }`}
                      >
                        Dashboard
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-3 text-[15px] transition-colors rounded-b-lg ${
                          active
                            ? "bg-[#f5f8fa] text-[#0487D9]"
                            : "text-gray-900"
                        }`}
                      >
                        Logout
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-transparent text-white border-2 border-[#0487D9] rounded-lg font-bold text-base h-10 min-w-[120px] px-6 flex items-center justify-center gap-2 transition-all duration-200 hover:text-[#0487D9] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(4,135,217,0.3)]"
              >
                Sign In
              </Link>
              <Link
                to="/get-started"
                className="relative bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white rounded-lg font-semibold text-base h-10 min-w-[120px] px-6 flex items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_4px_12px_rgba(4,135,217,0.3)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full before:transition-transform before:duration-600 hover:before:translate-x-full"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Transition show={mobileOpen}>
        <div className="fixed inset-0 z-[1301]">
          {/* Backdrop */}
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/50"
              onClick={toggleDrawer}
            />
          </Transition.Child>

          {/* Drawer */}
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed left-0 top-0 h-full w-[250px] bg-gradient-to-r from-[#034D92] to-[#0487D9] flex flex-col py-10">
              <div className="flex-1 px-5">
                {/* User Info - Mobile */}
                {user && (
                  <div className="flex flex-col items-center mb-8 -mt-2 gap-2">
                    <div className="w-14 h-14 rounded-full border-2 border-black bg-white text-black font-bold text-2xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                      {user.crewProfile?.profilePicture ? (
                        <img
                          src={user.crewProfile.profilePicture}
                          alt={getUserDisplayName()}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{user.name?.[0]?.toUpperCase()}</span>
                      )}
                    </div>
                    <p className="text-white font-bold text-base mt-2">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-black text-[13px] font-medium">
                      {formatRoleName(user.role?.name) ||
                        user.crewProfile?.position ||
                        ""}
                    </p>
                  </div>
                )}

                {/* Nav Items */}
                {navItems.map((item) =>
                  item.options ? (
                    <div key={item.title}>
                      <button
                        onClick={() => setDepartmentsOpen(!departmentsOpen)}
                        className="flex justify-between items-center w-full p-2.5 text-base font-bold text-white"
                      >
                        <span className="text-sm flex items-center gap-1">
                          {item.title}
                          {departmentsOpen ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </span>
                      </button>
                      <Transition
                        show={departmentsOpen}
                        enter="transition-all duration-300"
                        enterFrom="opacity-0 max-h-0"
                        enterTo="opacity-100 max-h-96"
                        leave="transition-all duration-300"
                        leaveFrom="opacity-100 max-h-96"
                        leaveTo="opacity-0 max-h-0"
                      >
                        <div className="pl-5 overflow-hidden">
                          {item.options.map((option) => (
                            <Link
                              key={option.title}
                              to={option.route}
                              onClick={toggleDrawer}
                              className="block w-full py-2 text-sm text-white opacity-80"
                            >
                              <span
                                className={
                                  location.pathname === option.route
                                    ? "font-bold"
                                    : "font-normal"
                                }
                              >
                                {option.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </Transition>
                    </div>
                  ) : item.external ? (
                    <a
                      key={item.title}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleDrawer}
                      className="block w-full p-2.5 text-left no-underline"
                    >
                      <span className="text-sm cursor-pointer font-normal text-white/80">
                        {item.title}
                      </span>
                    </a>
                  ) : (
                    <Link
                      key={item.title}
                      to={item.link}
                      onClick={toggleDrawer}
                      className="block w-full p-2.5 text-left"
                    >
                      <span
                        className={`text-sm cursor-pointer ${
                          location.pathname === item.link
                            ? "font-bold text-white"
                            : "font-normal text-white/80"
                        }`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  )
                )}
              </div>

              {/* Mobile Buttons at Bottom */}
              <div className="px-5 pt-5 border-t border-gray-300 text-center">
                {!user ? (
                  <>
                    <Link
                      to="/get-started"
                      className="block w-full bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white rounded-lg font-bold text-base py-3 mb-2 transition-all duration-200 hover:from-[#023A6B] hover:to-[#0366A3] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(4,135,217,0.3)]"
                    >
                      Join Now
                    </Link>
                    <Link
                      to="/login"
                      className="block w-full bg-white text-[#0487D9] border-2 border-[#0487D9] rounded-lg font-bold text-base py-3 transition-all duration-200 hover:bg-[#0487D9] hover:text-white hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(4,135,217,0.3)]"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        toggleDrawer();
                        navigate(getDashboardRoute());
                      }}
                      className="w-full bg-white text-[#0487D9] rounded-lg font-bold text-base py-3 mb-2 transition-all duration-200 hover:bg-[#f0f8ff] hover:-translate-y-[1px]"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-transparent text-[#FF4B4B] border-2 border-[#FF4B4B] rounded-lg font-bold text-base py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#FF4B4B] hover:text-white"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </header>
  );
};

export default LandingPageHeader;