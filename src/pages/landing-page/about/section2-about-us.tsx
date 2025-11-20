// components/about-us/Section2AboutUs.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import shipIcon from "../../../assets/images/icons/home-page-ship.png";
import crewIcon from "../../../assets/images/icons/home-page-crew.png";
import engineeringIcon from "../../../assets/images/icons/home-page-engineering.png";

interface FeatureCard {
  title: string;
  description: string;
  image: string;
  path: string;
}

const Section2AboutUs: React.FC = () => {
  const navigate = useNavigate();

  const features: FeatureCard[] = [
    {
      title: "Vendor & Service Connections",
      description: "A growing network of trusted vendors and service providers to meet your unique needs.",
      image: shipIcon,
      path: "/vendor-services",
    },
    {
      title: "Crew Support",
      description: "Resources for career advancement, certifications, and professional growth.",
      image: engineeringIcon,
      path: "/crew",
    },
    {
      title: "Community Engagement",
      description: "Opportunities to network, learn, and collaborate within a vibrant global yachting community.",
      image: shipIcon,
      path: "/about-us",
    },
    {
      title: "Expert Guidance",
      description: "Insights and advice to help you make the most of your yachting journey.",
      image: crewIcon,
      path: "/resource-center",
    },
  ];

  return (
    <section className="w-full py-10 bg-gradient-to-b from-white to-[#F8FBFD]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto md:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-[#131313] ">
            What We Offer
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <div
                className="
                  h-full bg-[#E6EFF2]/50 backdrop-blur-sm rounded-2xl p-10 lg:p-10
                  flex flex-col items-center text-center gap-8
                  transition-all duration-500 ease-out
                  hover:bg-[#E6EFF2] hover:-translate-y-4 hover:shadow-2xl
                  hover:shadow-[#0487D9]/20 border border-transparent
                  hover:border-[#0487D9]/10
                "
              >
                {/* Icon */}
                <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-20 h-20 object-contain drop-shadow-lg mx-auto"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 items-center text-center">
                  <h3 className="text-2xl md:text-3xl font-medium text-[#131313]  leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-[#373737] leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-auto flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-8 h-8 text-[#0487D9]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16 md:mt-20">
          <button
            onClick={() => navigate("/resource-center")}
            className="group relative overflow-hidden rounded-md bg-gradient-to-r from-[#034D92] to-[#0487D9] 
                     px-4 py-4 text-white font-semibold text-lg tracking-wide
                     transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer
                     animate-pulse hover:animate-none"
          >
            <span className="relative z-10">Resource Center</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0487D9] to-[#034D92] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-[#0487D9] blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section2AboutUs;