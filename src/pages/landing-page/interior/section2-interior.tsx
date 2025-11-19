import React from 'react'
import shipIcon from '../../../assets/images/icons/home-page-ship.png'
import crewIcon from '../../../assets/images/icons/home-page-crew.png'
import engineeringIcon from '../../../assets/images/icons/home-page-engineering.png'
import SectionPointCard from '../../../components/section-point-card'

const linearGradient = 'linear-gradient(90deg, #0487D9 0%, #05B3E4 100%)'

interface GridItem {
  title: string
  points: string[]
  image: string
}

const Section2Interior: React.FC = () => {
  const gridData: GridItem[] = [
    {
      title: 'Master the Art of Luxury Hospitality',
      points: [
        'Access resources for fine dining service, table settings, and personalized guest care.',
        'Discover how to create luxurious spaces with the right lighting, flowers and bespoke table settings.',
      ],
      image: shipIcon,
    },
    {
      title: 'Interior Maintenance Made Simple',
      points: [
        'Learn best practices for cleaning and caring for delicate materials like linens, carpets, and furniture.',
        'Find & book recommended suppliers for cleaning products, décor and organizational tools tailored for yachts.',
      ],
      image: crewIcon,
    },
    {
      title: 'Simplify your Department Management',
      points: [
        'Manage your service bookings with our worldwide Interior dedicated network.',
        'Order your every Interior department needs through our network & platform.',
      ],
      image: shipIcon,
    },
    {
      title: 'Advance Your Career In Yacht Interior Management',
      points: [
        'Access training resources focused on leadership, inventory management and guest services.',
        'Join the Preferred Crew Network to access department managing tools, grow your professional network and simplify your life.',
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
              Interior Excellence & Luxury Service
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-['Plus Jakarta Sans', sans-serif] font-medium text-[36px] sm:text-[40px] md:text-[42px] lg:text-[46px] leading-[36px] sm:leading-[40px] md:leading-[46px] lg:leading-[51px] tracking-[-2%] text-[#131313] text-center">
            Elevate Your Interior Department
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

export default Section2Interior