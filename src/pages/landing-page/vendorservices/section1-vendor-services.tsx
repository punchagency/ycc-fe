import React from "react";
import { Link } from "react-router-dom";
import Section1A from "../../../assets/images/vendor-services/vendor-services.png";

const Section1VendorServices: React.FC = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <img
                src={Section1A}
                alt="Vendor Dashboard - Yacht Crew Center"
                className="w-full h-auto rounded-xl shadow-lg object-cover border border-gray-100"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8 md:pl-4">
            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-medium text-[#131313] leading-tight tracking-tight font-['Plus_Jakarta_Sans']">
              Managing your business just got easier with the{" "}
              <span className="font-semibold">Yacht Crew Center</span>.
            </h2>

            {/* Paragraphs */}
            <div className="flex flex-col gap-6 text-lg lg:text-lg text-[#373737] leading-relaxed font-light">
              <p>
                Yacht Crew Center's platform streamlines order and booking
                management, ensuring you receive direct requests from those who
                need your expertise. By onboarding your business, you gain
                access to a global network, with global logistics and your
                personal AI Assistant.
              </p>
              <p>
                Our platform connects your services and inventory directly to a
                global network of Yacht Crew professionals actively seeking
                trusted partners like you. With your business listed in a
                comprehensive directory, you'll gain visibility across the
                yachting industry, driving growth and securing consistent
                orders.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <Link to="/apply">
                <button className="cursor-pointer group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#034D92] to-[#0487D9] px-10 py-4 font-semibold text-white text-base sm:text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <span className="relative z-10">Apply Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0487D9] to-[#034D92] opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1VendorServices;