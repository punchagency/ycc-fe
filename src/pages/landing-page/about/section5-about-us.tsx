import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

import yatch from "../../../assets/images/YCC-yatch.png";

const Section5AboutUs: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="pb-[30vh] md:pb-[14vh]">
      <div
        className="relative bg-[#02214B] flex flex-col items-center justify-center w-full overflow-visible bg-[#02214B] bg-cover bg-center h-[80vh] min-h-[600px] px-5 md:px-0"
      >
        <div className="flex justify-center w-full max-w-6xl">
          <div className="flex flex-col items-start md:items-center justify-center w-full sm:w-[90%] md:w-[80%] lg:w-[944px] gap-5 sm:gap-6 md:gap-8 -mt-[35vh] md:-mt-[10vh]">
            <h3 className="text-white font-[Plus Jakarta Sans] font-medium text-[28px] sm:text-[36px] md:text-[46px] leading-[34px] sm:leading-[42px] md:leading-[51px] text-left md:text-center">
              Our Mission
            </h3>

            <p className="text-white font-inter text-[18px] leading-[128%] text-left md:text-center">
              To inspire and support yachting professionals by providing access to the best resources, services, and connections, ensuring their success both on and off the water.
            </p>

          </div>

          {/* Floating Resource Box */}
          <div
            className="absolute left-1/2 bottom-[35vh] sm:bottom-[-8%] md:bottom-0 
                transform -translate-x-1/2 translate-y-[100%] sm:translate-y-[30%] 
                md:translate-y-[45%] lg:translate-y-[60%] flex flex-wrap md:flex-nowrap 
                justify-center items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[80%]"
          >
            <div className="w-full bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)] 
                  flex flex-col md:flex-row overflow-hidden md:h-[40vh]">
              {/* Left Content */}
              <div className="flex flex-col justify-between gap-7 p-5 md:p-10 w-full md:w-1/2 relative">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[#131313] font-[Plus Jakarta Sans] font-medium text-[22px] sm:text-[28px] md:text-[30px] leading-[40px] text-left">
                    Ready To Enhance Your Yachting Career?
                  </h3>
                  <p className="text-base sm:text-lg text-[#373737] leading-relaxed">
                    Connect with us and explore the resources that can make a difference in your career.
                  </p>
                </div>

                <div className="md:absolute md:bottom-5 md:left-5">
                  <Link to="/get-started">
                    <button
                      className="relative overflow-hidden rounded-md bg-gradient-to-r from-[#034D92] to-[#0487D9]
                                px-6 py-3 text-white font-semibold text-lg tracking-wide
                                transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                                group cursor-pointer"
                    >
                      <span className="relative z-10">Join Our Crew Network</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0487D9] to-[#034D92] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full md:w-1/2 relative md:h-full">
                <img
                  src={yatch}
                  alt="Yacht Crew Center"
                  className="w-full h-[40vh] md:h-full rounded-b-lg md:rounded-b-none md:rounded-r-lg object-cover"
                />
                <div className="absolute top-0 left-0 h-full w-[35%] bg-gradient-to-r from-white to-transparent z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Section5AboutUs;