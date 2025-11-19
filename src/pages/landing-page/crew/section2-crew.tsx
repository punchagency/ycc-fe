import React from 'react'
import shipIcon from '../../../assets/images/icons/home-page-ship.png'
import crewIcon from '../../../assets/images/icons/home-page-crew.png'
import engineeringIcon from '../../../assets/images/icons/home-page-engineering.png'
import SectionPointCard from '../../section-point-card'

const linearGradient = 'linear-gradient(90deg, #0487D9 0%, #05B3E4 100%)'

interface GridItem {
  title: string
  points: string[]
  image: string
}

const Section2Crew: React.FC = () => {
  const gridData: GridItem[] = [
    {
      title: 'Training And Certification Resources',
      points: [
        'Access courses and certifications to build your skills and meet industry standards.',
        'Explore training options for all crew roles, from deckhands to captains.',
      ],
      image: shipIcon,
    },
    {
      title: 'Financial Planning And Career Development',
      points: [
        'Find tailored financial solutions for yacht crew, including retirement planning and asset protection.',
        'Access resources to help you manage your income and plan for the future.',
      ],
      image: crewIcon,
    },
    {
      title: 'Legal And Compliance Support',
      points: [
        'Get help with visa requirements, wage disputes, and injury claims.',
        'Stay informed about international labor laws and flag state regulations.',
      ],
      image: shipIcon,
    },
    {
      title: 'Mental Health And Wellness Services',
      points: [
        'Access resources for managing stress, staying connected, and maintaining a healthy work-life balance.',
        'Explore counseling options and support networks tailored to yacht crew.',
      ],
      image: engineeringIcon,
    },
  ]

  return (
    <section className="min-h-screen w-full py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-7 justify-center items-center">
        {/* Header Section */}
        <div className="flex flex-col gap-[13px] max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%]">
          {/* Badge with Gradient Text */}
          <div className="flex flex-row gap-[10px] justify-center items-center">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: linearGradient }}
            />
            <span
              className="font-['Inter'] font-medium text-[14px] leading-[19.6px] tracking-[5%] uppercase"
              style={{
                background: linearGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Comprehensive Support for Yacht Crew
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-['Plus Jakarta Sans', sans-serif] font-medium text-[36px] sm:text-[40px] md:text-[42px] lg:text-[46px] leading-[36px] sm:leading-[40px] md:leading-[46px] lg:leading-[51px] tracking-[-2%] text-[#131313] text-center">
            Resources for Your Maritime Career
          </h2>
        </div>

        {/* Grid Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {gridData.map((item, index) => (
            <div
              key={index}
              className="flex justify-start text-left transition-transform duration-300 ease-in-out h-full"
            >
              <SectionPointCard
                image={item.image}
                title={item.title}
                points={item.points}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section2Crew