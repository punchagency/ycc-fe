import React, { useEffect } from "react";
import banner from "../../../assets/images/contact-us/YCC-contact-us-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageChatbot from "../../../components/chatbot/landing-page-chatbot";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section1ContactUs from "./section1-contact-us";

interface ButtonProps {
  text: string;
  path: string;
}

const ContactUs: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backgroundImage = banner;

  const header = (
    <>
      Contact Yacht <GradientText>Crew</GradientText>{" "}
      <GradientText>Center</GradientText> – We're here for you
    </>
  );

  const subtext2 =
    "Have questions or need specialized assistance? Connect with our dedicated team for personalized support. Tailored specifically for the Yachting community.";

  const button1: ButtonProps = {
    text: "Join Now",
    path: "/get-started",
  };

  return (
    <div className="flex flex-col gap-[60px] md:gap-[120px]">
      <LandingPageBanner
        backgroundImage={backgroundImage}
        header={header}
        subtext2={subtext2}
        button1={button1}
      />
      <Section1ContactUs />
      <LandingPageFooter />
      <LandingPageChatbot />
    </div>
  );
};

// Gradient Text Component
interface GradientTextProps {
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({ children }) => {
  return (
    <span
      className="font-plusJakartaSans font-semibold uppercase inline-block"
      style={{
        background:
          "linear-gradient(86.8deg, #FFFFFF -51.91%, #209DEB 84.68%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "40px",
        lineHeight: "52px",
        letterSpacing: "-2%",
      }}
    >
      {children}
    </span>
  );
};

export default ContactUs;
