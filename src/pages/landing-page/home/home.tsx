
import React, { useEffect } from "react";
import type { ReactNode } from "react";
import banner from "../../../assets/images/YCC-home-banner-new.png";
import Section2Home from "./section2-home";
import Section3Home from "./section3-home";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section4Home from "./section4-home";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import Chatbot from "../../../components/chatbot/chatbot";
import { LandingPageAIProvider } from '../../../context/AIAssistant/landingPageAIContext';

const HomeLandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backgroundImage = banner;

  const header = (
    <>
      Your Destination for Crew <GradientText>resources</GradientText> &{' '}
      <GradientText>Vessel</GradientText> Management
    </>
  );

  const subtext1 =
    'Find local service providers and order your department supplies through our AI-supported Global Network. No matter the ask or the time, Yacht Crew Center is here to help you succeed.';
  const subtext2 =
    'Welcome to Yacht Crew Center, LLC — the trusted hub for Yachting professionals worldwide. Founded by yacht crew for yacht crew, our platform combines industry expertise, personalized support, and global reach to empower your career and simplify vessel management. Whatever your position, Yacht Crew Center is here to help you succeed on and off the water.';

  const button1 = {
    text: 'Sign in',
    path: '/sign-in',
  };
  const button2 = {
    text: 'Join now',
    path: '/register',
  };

  const page = 'home';

  return (

    <div className='flex flex-col gap-[47px] sm:gap-[60px] md:gap-[90px] lg:gap-[120px] max-w-screen mb-[45px] sm:mb-[23px] md:mb-[30px]'>
      <LandingPageBanner
        backgroundImage={backgroundImage}
        header={header}
        subtext1={subtext1}
        subtext2={subtext2}
        button1={button1}
        button2={button2}
        page={page}
      />

      <LandingPageAIProvider>
        <Chatbot />
      </LandingPageAIProvider>
      <Section2Home />
      <Section3Home />
      <Section4Home />
      <LandingPageFooter />
    </div>
  );
};

interface GradientTextProps {
  children: ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({ children }) => {
  return (
    <span
      className="bg-linear-to-r from-white via-sky-400 to-sky-500 bg-clip-text text-transparent font-semibold font-['Plus_Jakarta_Sans'] 
      text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px] 
      leading-[38px] sm:leading-[45px] md:leading-[52px] lg:leading-[60px]
      uppercase inline-block"
    >
      {children}
    </span>
  );
};

export default HomeLandingPage;
