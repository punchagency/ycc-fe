import React, { useEffect } from "react";
import banner from "../../../assets/images/exterior/YCC-exterior-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section2Exterior from "./section2-exterior";
import Section3Exterior from "./section3-exterior";
import Chatbot from "../../../components/chatbot/chatbot";

const ExteriorLandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backgroundImage = banner;

  const header = (
    <>
      Empowering <GradientText>Exterior</GradientText>{" "}
      <GradientText>Yacht</GradientText> crew with the Right Resources
    </>
  );

  const subtext2 =
    "Master the art of yacht maintenance, safety, and watersports with expert advice and trusted tools designed for exterior crew.";

  const button1 = {
    text: "Join Now",
    path: "/get-started",
  };

  return (
    <div
      className="flex flex-col gap-[120px] md:gap-[120px] lg:gap-[60px]"
    >
      <LandingPageBanner
        backgroundImage={backgroundImage}
        header={header}
        subtext2={subtext2}
        button1={button1}
      />

      <Chatbot />

      <Section2Exterior />
      <Section3Exterior />

      <LandingPageFooter />
    </div>
  );
};

const GradientText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <span
      className="
        font-plus-jakarta font-semibold
        uppercase inline-block
        text-[#0487D9]
        text-[22px] sm:text-[28px] md:text-[36px] lg:text-[50px]
        leading-[28px] sm:leading-[34px] md:leading-[42px] lg:leading-[60px]
        tracking-[-0.02em]
      "
    >
      {children}
    </span>
  );
};

export default ExteriorLandingPage;
