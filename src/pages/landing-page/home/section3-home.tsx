import React from 'react';
import { Link } from "react-router-dom";
import SectionImage from "../../../assets/images/home-section3-image.png";

const Section3Home: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-0">
      <div
        className="w-full h-full flex flex-col md:flex-row justify-center md:justify-between items-center rounded-[20px] mb-20 md:mb-0"
        style={{
          background: 'linear-gradient(90deg, rgb(3, 77, 146), rgb(4, 135, 217))'
        }}
      >
        {/* Content Section */}
        <div className="flex flex-col p-4 md:p-10 gap-5 text-left">
          <div>
            <h2 className=" font-semibold text-[30px] leading-[40px] text-white">
              Let our Business Management tools and AI Agentic workflows manage your operations.
            </h2>
          </div>
          <div>
            <a href="/vendor-services" className="no-underline">
              <button
                className="bg-white text-black font-['Inter'] font-normal text-base px-10 py-[13px] rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden hover:translate-y-[-3px] hover:shadow-[0_5px_15px_rgba(255,255,255,0.3)] group"
              >
                <Link to="/vendor-services" className="relative z-10">
                  <span className="cursor-pointer">
                    Learn More
                  </span>
                </Link>
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-full" />
              </button>
            </a>
          </div>
        </div>

        {/* Image Section */}
        <img
          src={SectionImage}
          alt="Section Image"
          className="w-full md:w-[236px] h-full md:h-[235px] max-w-full md:max-w-[236px] max-h-full md:max-h-[235px] rounded-bl-2xl rounded-br-2xl md:rounded-bl-none md:rounded-tl-none md:rounded-br-2xl block mr-0 md:mr-5"
        />
      </div>
    </section>
  );
};

export default Section3Home;
