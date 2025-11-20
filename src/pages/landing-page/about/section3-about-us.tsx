// components/about-us/Section3AboutUs.tsx
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import collage from "../../../assets/images/about-us/section3.png";

const Section3AboutUs: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const paragraphs = [
    "At Yacht Crew Center, LLC, we are proud to partner with Global Yacht Services, a well-established leader in the yachting industry.",
    "Through this collaboration, we gain access to an extensive network of industry connections, trusted suppliers, and vendors. This partnership enables us to enhance the services we provide, offering unparalleled resources and expertise.",
    "Together with Global Yacht Services, we are committed to delivering innovative solutions that streamline yacht operations and empower the global yachting community.",
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-[#011632] py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -120, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <img
              src={collage}
              alt="Yacht Crew Center & Global Yacht Services Partnership"
              className="w-full h-auto rounded-3xl shadow-2xl border border-white/10 object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 120, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="md:col-span-5 order-1 md:order-2 flex flex-col gap-10 text-center md:text-left"
          >
            {/* Gradient Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-[#034D92] to-[#0487D9] bg-clip-text text-transparent ">
                Our Partnership with Global Yacht Services
              </span>
            </h2>

            {/* Animated Paragraphs */}
            <div className="space-y-7 text-lg lg:text-xl text-white/80 font-light leading-relaxed text-justify md:text-left">
              {paragraphs.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section3AboutUs;