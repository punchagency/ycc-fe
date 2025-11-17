// components/about-us/Section1AboutUs.tsx
import React from "react";
import collage from "../../../assets/images/about-us/section1.png";

const Section1AboutUs: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image - Left Side */}
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="relative">
              <img
                src={collage}
                alt="Yacht Crew Center - Empowering the Global Yachting Community"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover border border-gray-100"
                loading="lazy"
              />
              {/* Optional subtle overlay glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-30 pointer-events-none" />
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="md:col-span-5 order-1 md:order-2 flex flex-col gap-8 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-[#131313] font-['Plus_Jakarta_Sans']">
              Who We Are
            </h2>

            <p className="text-lg md:text-xl leading-relaxed text-[#373737] font-light tracking-wide text-justify md:text-left">
              Yacht Crew Center, LLC is dedicated to empowering yachting professionals globally with innovative solutions that simplify life at sea and onshore. More than just a resource hub, we are your trusted partner in navigating the complexities of the yachting industry.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-[#373737] font-light tracking-wide text-justify md:text-left">
              Driven by our passion for excellence, we are committed to integrating cutting-edge AI support technology into our platform, redefining what’s possible for yachting professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1AboutUs;