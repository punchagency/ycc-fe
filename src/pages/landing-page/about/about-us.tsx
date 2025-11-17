import React, { useEffect } from "react";

import banner from "../../../assets/images/about-us/YCC-about-us-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import LandingPageChatbot from "../../../components/chatbot/landing-page-chatbot";

import Section1AboutUs from "./section1-about-us";
import Section2AboutUs from "./section2-about-us";
import Section3AboutUs from "./section3-about-us";
import Section4AboutUs from "./section4-about-us";
import Section5AboutUs from "./section5-about-us";

const AboutUs: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex flex-col">
      {/* Hero Banner */}
      <LandingPageBanner
        backgroundImage={banner}
        header={
          <>
            Yacht Crew <br />
            Center - Here To <br />
            <span className="bg-gradient-to-r from-white via-[#209DEB] to-white bg-clip-text text-transparent font-bold uppercase tracking-tight">
              Assist
            </span>{" "}
            <span className="bg-gradient-to-r from-white via-[#209DEB] to-white bg-clip-text text-transparent font-bold uppercase tracking-tight">
              You
            </span>
          </>
        }
        subtext2="Have questions or need assistance? Connect with our dedicated team for personalized support tailored to the yachting community."
        button1={{
          text: "Contact Us",
          path: "/contact-us",
        }}
      />

      {/* Page Sections */}
      <div className="flex flex-col gap-0 md:gap-32 lg:gap-20 mb-12 md:mb-16 lg:mb-20">
        <Section1AboutUs />
        <Section2AboutUs />
        <Section3AboutUs />
        <Section4AboutUs />
        <Section5AboutUs />
        
        <LandingPageChatbot />
      </div>

      {/* Footer */}
      <LandingPageFooter />
    </main>
  );
};

export default AboutUs;