import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

import yatch from "../../../assets/images/YCC-yatch.png";

const Section5AboutUs: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative bg-[#02214B] overflow-visible">
      {/* Hero Mission Section */}
      <div
        className="flex flex-col items-center justify-center text-center
                   min-h-[500px] sm:min-h-[700px] md:min-h-[650px] lg:min-h-[718px]
                   px-6 md:px-0"
      >
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-white font-['Plus_Jakarta_Sans']">
            Our Mission
          </h2>

          <p className="text-md sm:text-xl md:text-lg text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
            To inspire and support yachting professionals by providing access to the best resources, services, and connections, ensuring their success both on and off the water.
          </p>
        </div>
      </div>

      {/* Floating CTA Card */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[1180px]
                   bottom-0 translate-y-[30%] sm:translate-y-[30%] md:translate-y-[45%] lg:translate-y-[60%]
                   z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl shadow-2xl bg-white">
          
          <div className="p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center gap-8 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-[#131313] font-['Plus_Jakarta_Sans']">
              Ready To Enhance Your Yachting Career?
            </h3>

            <p className="text-base sm:text-lg text-[#373737] leading-relaxed">
              Connect with us and explore the resources that can make a difference in your career.
            </p>

            <div className="flex justify-center md:justify-start">
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

          <div className="hidden md:block">
            <img
              src={yatch}
              alt="Yacht Crew Center"
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
            >
              <X size={28} />
            </button>

            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/6RYeNFtDJds?autoplay=1"
                title="Yacht Crew Center Mission"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section5AboutUs;