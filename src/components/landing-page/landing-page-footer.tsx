import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/icons/plain-white-icon.png";
import TermsModal from "../TermsModal";

// Social Media Icons
const FacebookIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface FooterLink {
  name: string;
  path: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const LandingPageFooter: React.FC = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const navigate = useNavigate();

  const footerData: FooterSection[] = [
    {
      title: "QUICK LINKS",
      links: [
        { name: "Home", path: "/" },
        { name: "Vendor & Services", path: "/vendor-services" },
        { name: "About Us", path: "/about-us" },
        { name: "Resource Center", path: "/resource-center" },
        { name: "Contact Us", path: "/contact-us" },
      ],
    },
    {
      title: "DEPARTMENTS",
      links: [
        { name: "Captain", path: "/captain" },
        { name: "Chef/Galley", path: "/chef-galley" },
        { name: "Engineering", path: "/engineering" },
        { name: "Crew", path: "/crew" },
        { name: "Interior", path: "/interior" },
        { name: "Exterior", path: "/exterior" },
      ],
    },
    {
      title: "AFFILIATE PROGRAM",
      links: [
        {
          name: "Affiliate Signup",
          path: "https://affiliate.yachtcrewcenter.com/",
          external: true,
        },
      ],
    },
  ];

  const linearGradient =
    "linear-gradient(90deg, #0499E0 0%, #06C6D9 50%, #0487D9 100%)";

  return (
    <footer className="bg-[#011632] w-full relative bottom-0 left-0 min-h-[40vh] flex justify-center items-center flex-col mt-0 z-0">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 py-8 sm:py-10 lg:py-12">
          {/* Logo and Contact Button Section */}
          <div className="col-span-1 lg:col-span-5">
            <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5">
              <img 
                src={logo} 
                alt="Yacht Crew Center Logo" 
                className="w-[60px] h-[55px] sm:w-[70px] sm:h-[65px]" 
              />
              <Link to="/contact-us" className="no-underline w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-white font-inter font-semibold 
                  text-sm sm:text-base leading-[17px] sm:leading-[19px] 
                  flex justify-center items-center rounded-sm transition-all duration-300 ease-in-out
                  hover:scale-105 hover:shadow-lg cursor-pointer"
                  style={{ background: linearGradient }}
                >
                  <span className="text-center">Contact Yacht Crew Center, LLC</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Footer Links Section */}
          <div className="col-span-1 lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
              {footerData.map((section, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  {/* Section Title */}
                  <h3
                    className="font-['Plus_Jakarta_Sans'] font-semibold text-lg sm:text-xl 
                    leading-[120%] text-white uppercase mb-3 sm:mb-4"
                  >
                    {section.title}
                  </h3>

                  {/* Links */}
                  <ul className="list-none p-0 space-y-2 sm:space-y-2.5">
                    {section.links.map((link, linkIdx) =>
                      link.external ? (
                        <li key={linkIdx}>
                          <a
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-['Plus_Jakarta_Sans'] font-normal text-sm sm:text-base 
                            leading-5 sm:leading-6 text-white no-underline transition-all duration-300 
                            ease-in-out relative inline-block
                            hover:text-[#0487D9] hover:translate-x-1
                            after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-2px] 
                            after:left-0 after:bg-[#0487D9] after:transition-all after:duration-300
                            hover:after:w-full"
                          >
                            {link.name}
                          </a>
                        </li>
                      ) : (
                        <li key={linkIdx}>
                          <Link
                            to={link.path}
                            className="font-['Plus_Jakarta_Sans'] font-normal text-sm sm:text-base 
                            leading-5 sm:leading-6 text-white no-underline transition-all duration-300 
                            ease-in-out relative inline-block
                            hover:text-[#0487D9] hover:translate-x-1
                            after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-2px] 
                            after:left-0 after:bg-[#0487D9] after:transition-all after:duration-300
                            hover:after:w-full"
                          >
                            {link.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright and Social Media */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 pb-6 sm:pb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-4">
            {/* Copyright and Legal Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start 
              gap-3 sm:gap-2 flex-wrap w-full lg:w-auto">
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-sm sm:text-base 
                leading-[18px] sm:leading-[21px] text-[#E0E0E0] text-center whitespace-normal 
                sm:whitespace-nowrap">
                © {new Date().getFullYear()} SC Yacht Crew Center LLC . All Rights Reserved.
              </p>
              
              <span className="hidden sm:inline text-[#E0E0E0] mx-2">|</span>
              
              <div className="flex items-center gap-3 sm:gap-2 flex-wrap justify-center">
                <button
                  onClick={() => navigate("/terms-and-conditions")}
                  className="bg-transparent border-none p-0 font-inherit cursor-pointer 
                  text-[#E0E0E0] no-underline transition-all duration-300 ease-in-out 
                  relative font-['Plus_Jakarta_Sans'] font-normal text-xs sm:text-sm 
                  leading-[16px] sm:leading-[18px] whitespace-nowrap
                  hover:text-[#0487D9]
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-2px] 
                  after:left-0 after:bg-[#0487D9] after:transition-all after:duration-300
                  hover:after:w-full"
                >
                  Terms and Conditions
                </button>
                
                <span className="text-[#E0E0E0]">|</span>
                
                <button
                  onClick={() => navigate("/privacy-policy")}
                  className="bg-transparent border-none p-0 font-inherit cursor-pointer 
                  text-[#E0E0E0] no-underline transition-all duration-300 ease-in-out 
                  relative font-['Plus_Jakarta_Sans'] font-normal text-xs sm:text-sm 
                  leading-[16px] sm:leading-[18px] whitespace-nowrap
                  hover:text-[#0487D9]
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-2px] 
                  after:left-0 after:bg-[#0487D9] after:transition-all after:duration-300
                  hover:after:w-full"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-end gap-4 sm:gap-5 w-full lg:w-auto">
              <a
                href="https://www.facebook.com/groups/yachtiesnameshameandfame"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all duration-300 ease-in-out
                hover:-translate-y-1 hover:scale-110"
                aria-label="Visit our Facebook page"
              >
                <div className="text-white hover:text-[#0487D9] transition-colors duration-300">
                  <FacebookIcon />
                </div>
              </a>
              <a
                href="https://www.instagram.com/yachtcrewcenter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all duration-300 ease-in-out
                hover:-translate-y-1 hover:scale-110"
                aria-label="Visit our Instagram page"
              >
                <div className="text-white hover:text-[#0487D9] transition-colors duration-300">
                  <InstagramIcon />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/106474229/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-all duration-300 ease-in-out
                hover:-translate-y-1 hover:scale-110"
                aria-label="Visit our LinkedIn page"
              >
                <div className="text-white hover:text-[#0487D9] transition-colors duration-300">
                  <LinkedInIcon />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        pdfUrl="/terms-and-conditions"
        title="Yacht Crew Center Terms and Conditions"
        fileName="YCC-Terms-and-Conditions.pdf"
      />

      {/* Privacy Policy Modal */}
      <TermsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        pdfUrl="/privacy-policy"
        title="Yacht Crew Center Privacy Policy"
        fileName="YCC-Privacy-Policy.pdf"
      />
    </footer>
  );
};

export default LandingPageFooter;