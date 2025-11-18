import React from "react";
import { Link } from "react-router-dom";
import yatch from "../../../assets/images/YCC-yatch.png";
import banner from "../../../assets/images/water-wide.png";

const Section4Home: React.FC = () => {
  return (
    <section className="pb-[330px] md:pb-[120px]">
      <div
        className="relative flex flex-col items-center justify-center w-full overflow-visible bg-[#02214B] bg-cover bg-center h-[700px] sm:h-[700px] md:h-[650px] lg:h-[718px] px-5 md:px-0"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="flex justify-center w-full max-w-6xl">
          <div className="flex flex-col items-start md:items-center justify-center w-full sm:w-[90%] md:w-[80%] lg:w-[944px] gap-5 sm:gap-6 md:gap-8 -mt-[250px] md:-mt-[60px]">
            <h3 className="text-white font-[Plus Jakarta Sans] font-medium text-[28px] sm:text-[36px] md:text-[46px] leading-[34px] sm:leading-[42px] md:leading-[51px] text-left md:text-center">
              Join Our Crew Network
            </h3>

            <p className="text-white font-inter text-[18px] leading-[128%] text-left md:text-center">
              Become part of a safer, better managed and transparent yachting community.
              By joining our Crew Network, you'll connect with verified industry
              professionals. Access management tools, personalized AI assistants and
              a worldwide network. Join our journey and help shape the future of
              Yachting today.
            </p>

            <div className="flex justify-start md:justify-center items-center">
              <Link to="/get-started">
                <button
                  style={{background: 'linear-gradient(90deg, rgb(3, 77, 146), rgb(4, 135, 217))'}}
                  className="text-white text-[14px] font-semibold px-10 py-3 
                  rounded-md hover:opacity-90 transition duration-300 cursor-pointer">
                  Join Now
                </button>
              </Link>
            </div>
          </div>

          {/* Floating Resource Box */}
          <div
            className="absolute left-1/2 bottom-[240px] sm:bottom-[-8%] md:bottom-0 transform -translate-x-1/2 translate-y-[100%] sm:translate-y-[30%] md:translate-y-[45%] lg:translate-y-[60%]
            flex flex-wrap md:flex-nowrap justify-center items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[1180px]"
          >
            <div className="w-full bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden">
              {/* Left Content */}
              <div className="flex flex-col justify-between gap-7 p-5 md:p-10 w-full md:w-1/2 relative">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#295FD1] rounded-full"></span>
                    <span className="text-[#295FD1] font-inter font-semibold text-[14px] uppercase">
                      Resources
                    </span>
                  </div>

                  <h3 className="text-[#131313] font-[Plus Jakarta Sans] font-medium text-[22px] sm:text-[28px] md:text-[30px] leading-[40px] text-left">
                    Access our Resource Center and see our Yachting Marketplace
                  </h3>
                </div>

                <div className="md:absolute md:bottom-5 md:left-5">
                  <Link to="/resource-center">
                    <button className="bg-gradient-to-r from-[#0066ff] to-[#00ccff] 
                      text-white font-inter text-[14px] font-medium px-6 py-2 
                      rounded-md hover:opacity-90 transition duration-300 cursor-pointer">
                      Resource Center
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full md:w-1/2 relative">
                <img
                  src={yatch}
                  alt="Yacht Crew Center"
                  className="w-full h-[300px] md:h-[30vh] rounded-b-lg md:rounded-b-none md:rounded-r-lg object-cover"
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

export default Section4Home;