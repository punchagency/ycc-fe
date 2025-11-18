// components/about-us/Section4AboutUs.tsx
import React from "react";

import image1 from "../../../assets/images/about-us/section4.1.png";
import image2 from "../../../assets/images/about-us/section4.2.png";
import image3 from "../../../assets/images/about-us/section4.3.png";

interface FeatureItem {
  image: string;
  heading: string;
  subText: string;
}

const Section4AboutUs: React.FC = () => {
  const features: FeatureItem[] = [
    {
      image: image1,
      heading: "Global Reach",
      subText: "Using AI to connect yachting professionals with service & suppliers across all major hubs.",
    },
    {
      image: image2,
      heading: "Tailored Support",
      subText: "Stepping into the future of simplified Yacht management. Join us as we revolutionize the industry.",
    },
    {
      image: image3,
      heading: "Passion for Excellence",
      subText: "A commitment to raising standards and empowering success in the yachting industry.",
    },
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Title */}
        <h2 className="text-left text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-black font-['Plus_Jakarta_Sans'] mb-16 md:mb-20">
          Why Yacht Crew Center
        </h2>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg 
                       transition-all duration-500 ease-out hover:shadow-2xl 
                       hover:shadow-[#0487D9]/20 hover:-translate-y-4"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="w-full h-auto object-cover transition-transform duration-700 
                           group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-5 bg-gradient-to-b from-white to-[#FAFBFC]">
                <h3 className="text-2xl md:text-3xl font-medium text-black font-['Plus_Jakarta_Sans'] leading-tight">
                  {item.heading}
                </h3>
                <p className="text-lg leading-relaxed text-[#373737] font-light">
                  {item.subText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section4AboutUs;