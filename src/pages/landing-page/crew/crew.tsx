import React, { useEffect } from "react";
import banner from "../../../assets/images/crew/YCC-crew-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section2Crew from "./section2-crew";
import Section3Crew from "./section3-crew";
import Chatbot from "../../../components/chatbot/chatbot";

interface ButtonConfig {
  text: string
  path: string
}

const CrewLandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const backgroundImage = banner

  const header = (
    <>
      Supporting <GradientText>yacht</GradientText>{' '}
      <GradientText>crew</GradientText> at every step of their journey
    </>
  )

  const subtext2 =
    'From recruitment to mental health and off-duty resources, access everything you need to thrive in your yachting career.'

  const button1: ButtonConfig = {
    text: 'Join Now',
    path: '/get-started',
  }

  return (
    <div className="flex flex-col gap-[120px] md:gap-[120px] lg:gap-[60px]">
      <LandingPageBanner
        backgroundImage={backgroundImage}
        header={header}
        subtext2={subtext2}
        button1={button1}
      />
      <Chatbot />
      <Section2Crew />
      <Section3Crew />
      <LandingPageFooter />
    </div>
  )
}

interface GradientTextProps {
  children: React.ReactNode
}

const GradientText: React.FC<GradientTextProps> = ({ children }) => (
  <span className="font-semibold text-[#0487D9] font-['Plus Jakarta Sans', sans-serif] text-[50px] leading-[60px] tracking-[-2%] uppercase inline-block md:text-[36px] md:leading-[42px] sm:text-[28px] sm:leading-[34px] xs:text-[22px] xs:leading-[28px]">
    {children}
  </span>
)

export default CrewLandingPage