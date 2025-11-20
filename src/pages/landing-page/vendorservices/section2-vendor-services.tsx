// components/vendor-services/section2-vendor-services.tsx
import React from "react";
import shipIcon from "../../../assets/images/icons/home-page-ship.png";
import crewIcon from "../../../assets/images/icons/home-page-crew.png";
import engineeringIcon from "../../../assets/images/icons/home-page-engineering.png";
import SectionPointCard from "../../section-point-card";

interface GridItemData {
  title: string;
  points: string[];
  image: string;
}

const Section2VendorServices: React.FC = () => {
  const gridData: GridItemData[] = [
    {
      title: "Let Yacht Crew Center Propel Your Business",
      points: [
        "Expand your business by connecting directly with yacht crew and managers through our global platform.",
        "Showcase your inventory and secure order requests with ease while becoming part of a trusted network serving the Luxury Yachting Industry.",
      ],
      image: shipIcon,
    },
    {
      title: "Join A Comprehensive Vendor Marketplace",
      points: [
        "Join a global network of yacht crew and vessel managers actively searching for top-tier service providers like you.",
        "Showcase your business and be easily found by those who need your expertise.",
        "Confirm bookings directly with crew, manage your invoices seamlessly, and elevate your business by connecting with a worldwide yachting audience.",
      ],
      image: crewIcon,
    },
    {
      title: "Get Direct Bookings and Orders",
      points: [
        "Receive and respond to quote requests, Confirm bookings & manage orders effortlessly through our seamless platform.",
        "Yacht Crew Center empowers your business to build a strong reputation. Connecting you directly to a global network of yachting professionals actively seeking trusted service providers.",
      ],
      image: shipIcon,
    },
    {
      title: "Let Our AI Platform do the Heavy Lifting",
      points: [
        "By onboarding your inventory & services you'll receive direct orders and booking requests tailored to real-time needs.",
        "Our AI handles the heavy lifting matching you to customers so you can focus on growing your business.",
      ],
      image: engineeringIcon,
    },
  ];

  return (
    <section className="w-full py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-[#034D92] to-[#0487D9] shadow-lg shadow-blue-500/30" />
            <span className="text-sm md:text-base font-medium tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#034D92] to-[#0487D9] font-['Inter']">
              Grow Your Maritime Business
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-medium leading-tight 
            tracking-tight text-[#131313] ">
            Connect with the Global Yachting Network
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {gridData.map((item, index) => (
            <div
              key={index}
              className="group transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                <SectionPointCard
                  image={item.image}
                  title={item.title}
                  points={item.points}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2VendorServices;