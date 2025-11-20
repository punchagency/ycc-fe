// landing-page-header.tsx
import logo from "../../assets/images/icons/YCC-navbar-icon.png";
import profileUpload from "../../assets/images/profile-upload.png";
import * as React from "react";
import { useState, useEffect } from "react";
import * as Sentry from '@sentry/react';
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  ArrowLeft, X,
} from "lucide-react";
import { isLoggedIn } from "../../utils/IsLoggedIn";
import { useReduxAuth } from "../../hooks/useReduxAuth";
import { setSentryUser } from "../../config/sentry";

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
  const toggleMobileMenu = () => setMobileOpen(prev => !prev);
  const closeMobileMenu = () => setMobileOpen(false);

  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenMenu(true);
  };

  const handleMouseLeave = () => {
    // Delay closing by 3 seconds
    closeTimeout.current = setTimeout(() => {
      setOpenMenu(false);
      closeTimeout.current = null;
    }, 3000);
  };

  React.useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    };
  }, []);

  
    const isAuthenticated = isLoggedIn();
    const { user } = useReduxAuth();

    const [openMenu, setOpenMenu] = useState(false);

    const getDashboardLink = () => {
      switch (user?.role) {
        case "admin":
          return "/category"; // admin has multiple, but default to category or dashboard
        case "manufacturer":
        case "distributor":
        case "user":
          return "/dashboard";
        default:
          return "/dashboard";
      }
    };

    useEffect(() => {
      if (import.meta.env.PROD && user?._id && user?.email) {
        setSentryUser({
          id: user._id,
          email: user.email,
          username: `${user.firstName} ${user.lastName}`,
        });
      }
    }, [user]);


  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-[1300] transition-all duration-300 ease-in-out ${
        scrolled || isServiceCheckout
          ? "bg-black/80 shadow-[0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-md"
          : "bg-transparent"
      }`}
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleDrawer}
          className="md:hidden flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white rounded-lg"
          aria-label="menu"
        >
          <MenuIcon size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Yacht Crew Center" className="w-[50px] h-[50px]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2 lg:gap-10 items-center">
          {navItems.map((item) =>
            item.options ? (
              <Menu as="div" key={item.title} className="relative">
                <MenuButton className="group flex items-center text-white text-sm cursor-pointer transition-colors duration-300 hover:text-[#0487D9] relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#034D92] after:to-[#0487D9] after:opacity-0 after:transition-opacity hover:after:opacity-100">
                  {item.title}
                  <ChevronDown
                    size={20}
                    className="ml-1 transition-transform group-hover:rotate-180"
                  />
                </MenuButton>
                <Transition
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-100 ease-in"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <MenuItems className="absolute left-0 mt-2 min-w-[220px] bg-white rounded-[13px] shadow-lg overflow-hidden border border-gray-100">
                    {item.options.map((option, idx) => (
                      <MenuItem key={option.title}>
                        {({ active }) => (
                          <Link
                            to={option.route}
                            className={`block px-5 py-3 text-left text-sm transition-colors ${
                              idx === 0 ? "rounded-t-[13px]" : ""
                            } ${
                              idx === item.options!.length - 1
                                ? "rounded-b-[13px]"
                                : ""
                            } ${
                              location.pathname === option.route
                                ? "bg-[#E6EFF2] text-[#0487D9] font-medium"
                                : "text-gray-800 hover:bg-gray-50"
                            } ${active ? "bg-[#f0f8ff]" : ""}`}
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
                to={item.link}
                {...(item.external
                  ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`text-white text-sm transition-all duration-300 hover:text-[#0487D9] relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#034D92] after:to-[#0487D9] after:transition-all after:duration-300 hover:after:w-full ${
                  location.pathname === item.link ? "after:w-full text-[#0487D9]" : "after:w.0"
                }`}
              >
                {item.title}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA Buttons */}
        {/* Desktop User Account Section */}
          <div className="hidden md:flex items-center gap-4 relative">
            {!isAuthenticated ? (
              <>
                {/* If NOT logged in: show buttons */}
                <Link
                  to="/login"
                  className="bg-transparent text-white border-2 border-[#0487D9] rounded-lg font-bold text-base h-10 px-6 flex items-center justify-center transition-all duration-200 hover:bg-[#0487D9]/10 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/get-started"
                  className="relative bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white rounded-lg font-bold text-base h-10 px-6 flex items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-full"
                >
                  <span className="relative z-10">Join Now</span>
                </Link>
              </>
            ) : (
              <>
                {/* If logged in: Show avatar + name + dropdown */}
                <div
                  className="relative hidden md:flex items-center gap-4"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img
                      src={ user?.profilePicture || profileUpload }
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover border border-white"
                    />

                    <span className="text-white font-semibold capitalize">
                      {user?.firstName}
                    </span>
                  </div>

                  {openMenu && (
                    <div className="absolute right-0 top-full mt-3 w-48 bg-white shadow-lg rounded-lg py-2 z-[1500]">
                      <Link
                        to={getDashboardLink()}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>

                        <button
                          onClick={() => {
                            localStorage.clear();
                            window.location.href = "/logout";
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                </div>


              </>
            )}
          </div>

      </nav>

      {/* Mobile Drawer */}
      <Transition show={mobileOpen}>
        <div className="fixed inset-0 z-[1301]">
          <Transition.Child
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" onClick={toggleDrawer} />
          </Transition.Child>

          <Transition.Child
            enter="transition ease-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed left-0 top-0 h-full w-72 bg-gradient-to-br from-[#034D92] to-[#0487D9] flex flex-col">
              <div className="flex-1 overflow-y-auto py-8 px-6">
                <div className="mb-10">
                  <Link to="/" onClick={toggleDrawer}>
                    <img src={logo} alt="YCC" className="w-12 h-12 mx-auto" />
                  </Link>
                </div>

                {navItems.map((item) =>
                  item.external ? (
                    <a
                      key={item.title}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleDrawer}
                      className="block py-3 text-white/90 hover:text-white text-sm font-medium transition-colors"
                    >
                      {item.title} ↗
                    </a>
                  ) : (
                    <Link
                      key={item.title}
                      to={item.link}
                      onClick={toggleDrawer}
                      className={`block py-3 text-sm font-medium transition-colors ${
                        location.pathname === item.link
                          ? "text-white font-bold"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.title}
                    </Link>
                  )
                )}
              </div>

              {/* Mobile Buttons */}
              <div className="p-6 border-t border-white/20 space-y-3">
                <Link
                  to="/get-started"
                  onClick={toggleDrawer}
                  className="block w-full text-center bg-white text-[#0487D9] font-bold py-3 rounded-lg transition-all hover:bg-gray-100"
                >
                  Join Now
                </Link>
                <Link
                  to="/login"
                  onClick={toggleDrawer}
                  className="block w-full text-center bg-transparent text-white border-2 border-white font-bold py-3 rounded-lg transition-all hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </header>

      <Transition show={mobileOpen}>
        <div className="fixed inset-0 z-[1400] lg:hidden">
          <div className="fixed inset-0 bg-black/70" onClick={closeMobileMenu} />
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-br from-[#034D92] to-[#0487D9] shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <Link to="/" onClick={closeMobileMenu}>
                  <img src={logo} alt="YCC" className="h-12 w-12" />
                </Link>
                <button onClick={closeMobileMenu} className="text-white">
                  <X size={28} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
                {navItems.map((item) =>
                  item.external ? (
                    <a
                      key={item.title}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="block py-4 text-white/90 hover:text-white text-lg font-medium"
                    >
                      {item.title} <span className="text-sm">External</span>
                    </a>
                  ) : (
                    <Link
                      key={item.title}
                      to={item.link}
                      onClick={closeMobileMenu}
                      className={`block py-4 text-lg font-medium ${location.pathname === item.link ? "text-white font-bold" : "text-white/80 hover:text-white"
                        }`}
                    >
                      {item.title}
                    </Link>
                  )
                )}
              </nav>

              <div className="p-6 border-t border-white/20 space-y-4">
                <Link to="/get-started" onClick={closeMobileMenu} className="block w-full text-center bg-white text-[#0487D9] font-bold py-4 rounded-lg text-lg hover:bg-gray-100">
                  Join Now
                </Link>
                <Link to="/login" onClick={closeMobileMenu} className="block w-full text-center bg-transparent text-white border-2 border-white font-bold py-4 rounded-lg text-lg hover:bg-white/10">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      
      </>
  );
};

export default LandingPageHeader;