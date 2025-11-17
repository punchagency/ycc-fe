// pages/vendor-services/VendorAndServices.tsx
import React, { useEffect } from "react";
import banner from "../../../assets/images/vendor-services/YCC-vendor-services-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section1VendorServices from "./section1-vendor-services";
import Section2VendorServices from "./section2-vendor-services";
import LandingPageChatbot from "../../../components/chatbot/landing-page-chatbot";

const VendorAndServices: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const headerContent = (
    <>
      VendorS & Services for Yachts:{" "}
      <span className="bg-gradient-to-r from-[#034D92] to-[#0487D9] bg-clip-text text-transparent font-bold">
        Trusted
      </span>{" "}
      <span className="bg-gradient-to-r from-[#034D92] to-[#0487D9] bg-clip-text text-transparent font-bold">
        Solutions
      </span>{" "}
      at Your Fingertips
    </>
  );

  const subtext2 =
    "Find and connect directly with Yacht Crew. Simplify your order & booking management with Yacht Crew Center's platform. Onboard your Yacht Services and Supplies to simplify Business Management.";

  const button1 = {
    text: "Join A Comprehensive Global Marketplace",
    path: "/apply",
  };

  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div
        className="flex flex-col"
        style={{
          gap: "clamp(3.75rem, 8vw, 7.5rem)", // Responsive gap: 60px → 120px
        }}
      >
        <LandingPageBanner
          backgroundImage={banner}
          header={headerContent}
          subtext2={subtext2}
          button1={button1}
        />

        <Section1VendorServices />
        <Section2VendorServices />
        <LandingPageChatbot />
      </div>

      {/* Footer with responsive bottom margin */}
      <div className="mt-12 sm:mt-6 md:mt-9 lg:mt-12">
        <LandingPageFooter />
      </div>
    </div>
  );
};

export default VendorAndServices;