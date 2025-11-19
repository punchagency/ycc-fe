import React, { useEffect } from 'react'
import banner from '../../../assets/images/engineering/YCC-engineering-banner.png'
import LandingPageBanner from '../../../components/landing-page/landing-page-banner'
import LandingPageFooter from '../../../components/landing-page/landing-page-footer'
import Section2Engineering from './section2-engineering'
import Section3Engineering from './section3-engineering'
import Chatbot from '../../../components/chatbot/chatbot'

interface ButtonConfig {
  text: string
  path: string
}

const EngineeringLandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const backgroundImage = banner

  const header = (
    <>
      Supporting <GradientText>Yacht</GradientText>{' '}
      <GradientText>Engineers</GradientText> with Tools for Success
    </>
  )

  const subtext2 =
    'From maintenance resources to technical training, find everything you need to keep yachts running at peak performance.'

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
      <Section2Engineering />
      <Section3Engineering />
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

export default EngineeringLandingPage