import React, { useEffect } from "react";
import banner from "../../../assets/images/captain/YCC-captain-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section2Captain from "./section2-captain";
import Section3Captain from "./section3-captain";
import Chatbot from "../../../components/chatbot/chatbot";

const CaptainLandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backgroundImage = banner;

  const header = (
    <>
      Supporting <GradientText>yacht</GradientText>{" "}
      <GradientText>captains</GradientText> in leadership and excellence
    </>
  );

  const subtext2 =
    "From compliance to guest experiences, access the resources you need to master every aspect of yacht operations.";

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

      <Section2Captain />
      <Section3Captain />

      <LandingPageFooter />
    </div>
  );
};

const GradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span
      className="
        font-plus-jakarta font-semibold uppercase inline-block
        text-transparent bg-clip-text
        text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px]
        leading-[38px] sm:leading-[45px] md:leading-[52px] lg:leading-[60px]
        tracking-[-0.02em]
      "
      style={{
        backgroundImage:
          "linear-gradient(86.8deg, #FFFFFF -51.91%, #209DEB 84.68%)",
      }}
    >
      {children}
    </span>
  );
};

export default CaptainLandingPage;