import React, { useEffect } from 'react'
import banner from '../../../assets/images/interior/interior-banner.jpg'
import LandingPageBanner from '../../../components/landing-page/landing-page-banner'
import LandingPageFooter from '../../../components/landing-page/landing-page-footer'
import Section2Interior from './section2-interior'
import Section3Interior from './section3-interior'
import Chatbot from '../../../components/chatbot/chatbot'

interface ButtonConfig {
  text: string
  path: string
}

const InteriorLandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const backgroundImage = banner

  const header = (
    <>
      Empowering <GradientText>Interior</GradientText>{' '}
      <GradientText>Yacht</GradientText> Crew for Excellence
    </>
  )

  const subtext2 =
    'From décor to hospitality, discover resources designed to help stewards and stewardesses create luxurious onboard experiences.'

  const button1: ButtonConfig = {
    text: 'Join Now',
    path: '/get-started',
  }

  return (
    <div className="flex flex-col gap-[120px] xs:gap-[120px] md:gap-[120px] lg:gap-[60px]">
      <LandingPageBanner
        backgroundImage={backgroundImage}
        header={header}
        subtext2={subtext2}
        button1={button1}
      />
      <Chatbot />
      <Section2Interior />
      <Section3Interior />
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

export default InteriorLandingPage