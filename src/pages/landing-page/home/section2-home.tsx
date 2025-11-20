import React from 'react';

import shipIcon from '../../../assets/images/icons/home-page-ship.png'
import crewIcon from '../../../assets/images/icons/home-page-crew.png'
import engineeringIcon from '../../../assets/images/icons/home-page-engineering.png'
import chefGalleryIcon from '../../../assets/images/icons/home-page-chef.png'
import interiorIcon from '../../../assets/images/icons/home-page-interior.png'

interface GridItem {
  title: string;
  description: string;
  image: string;
  path: string;
}

const Section2Home: React.FC = () => {
  const gridData: GridItem[] = [
  {
    title: "Captains",
    description:
      "Better manage your vessel and departments through AI. Explore the future of modern yacht management.",
    image: shipIcon,
    path: "/captain",
  },
  {
    title: "Crew",
    description:
      "Access resources for career training, local accommodation's, mental health and more. Feel supported in your life on and off the water.",
    image: crewIcon,
    path: "/crew",
  },
  {
    title: "Engineering",
    description:
      "Equipment troubleshooting, schedule services, order parts and develop additional skills. Be able to simplify and focus on what is important in your department.",
    image: engineeringIcon,
    path: "/engineering",
  },
  {
    title: "Exterior",
    description:
      "Elevate your exterior skill set and performance. Source your department needs, look for creative ideas to enhance guests' experiences, and inquire about specific information wherever you are.",
    image: shipIcon,
    path: "/exterior",
  },
  {
    title: "Chef/Galley",
    description:
      "Use our AI Assistant and management dashboards to better run your galley. Keeping everything in place and using your Assistant brings your focus back to your artwork.",
    image: chefGalleryIcon,
    path: "/chef-galley",
  },
  {
    title: "Interior",
    description:
      "Source your department's needs, look for creative ideas to enhance guests' experiences, and inquire about specific information wherever you are.",
    image: interiorIcon,
    path: "/interior",
  },
];

  return (
    <section className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-7 justify-center items-center">
        {/* Header Section */}
        <div className="flex flex-col gap-[13px] max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%]">
          <div className="flex flex-row gap-[10px] justify-center items-center text-left">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00CCFF]" />
            <span 
              className="font-semibold text-sm uppercase tracking-tight font-['Inter']"
              style={{
                background: 'linear-gradient(90deg, #0066FF 0%, #00CCFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Navigate to department-specific tools and resources
            </span>
          </div>

          <h2 className="text-[#131313]  font-medium text-[22px] leading-[28px] sm:text-[28px] sm:leading-[34px] md:text-4xl md:leading-[42px] lg:text-[46px] lg:leading-[51px] tracking-tight text-center">
            Explore Resources For Every Department
          </h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
          {gridData.map((item, index) => (
            <div
              key={index}
              className="flex justify-start text-left w-full transition-transform duration-300 ease-in-out"
            >
              <div className="w-full px-6 sm:px-9 py-8 sm:py-12 flex bg-[#E6EFF28A] rounded-[13px] flex-col gap-[10px] justify-between h-full">
                <div className="flex flex-col gap-7">
                  {/* Icon */}
                  <div className="transition-transform duration-300 ease-in-out text-5xl md:text-6xl">
                    <img src={item.image} alt={item.title} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-[#131313]  font-medium text-[30px] leading-[36.6px] tracking-[0.01em]">
                      {item.title}
                    </h3>
                    <p className="text-[#373737] font-['Inter'] font-normal text-lg leading-[26.55px] mt-[10px]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div>
                  <a href={item.path} className="no-underline">
                    <button
                      className="w-[171px] h-12 rounded-md font-['Inter'] font-semibold text-white text-base 
                        transition-all duration-300 ease-in-out hover:translate-y-[-3px] 
                        hover:shadow-[0_5px_15px_rgba(4,135,217,0.3)] cursor-pointer"
                      style={{
                        background: 'linear-gradient(90deg, rgb(3, 77, 146), rgb(4, 135, 217))'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #0487D9, #034D92)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #0066FF 0%, #00CCFF 100%)';
                      }}
                    >
                      Learn More
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2Home;