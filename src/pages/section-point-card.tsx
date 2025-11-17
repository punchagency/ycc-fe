// components/ui/SectionPointCard.tsx
import React from "react";
import checkIcon from "../assets/images/ckeckIcon.svg"; // Make sure filename is correct: checkIcon.svg

interface SectionPointCardProps {
  image?: string;
  icon?: React.ReactNode;
  title?: string;
  points?: string[];
}

const SectionPointCard: React.FC<SectionPointCardProps> = ({
  image,
  icon,
  title = "Essential Maintenance",
  points = [
    "Discover expert techniques for teak care, hull cleaning, and polishing.",
    "Simplify your Exterior Department management with service bookings and a worldwide supply network.",
  ],
}) => {
  return (
    <div
      className="group relative h-full rounded-2xl bg-[#E6EFF2]/50 p-8 md:p-10 lg:p-12 
                 flex flex-col gap-6 transition-all duration-500 ease-out
                 hover:bg-[#E6EFF2] hover:-translate-y-3 hover:shadow-2xl 
                 hover:shadow-[#0487D9]/20 border border-transparent 
                 hover:border-[#0487D9]/10 overflow-hidden"
    >
      {/* Optional subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0487D9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Icon / Image */}
        <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md"
            />
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#02214B] rounded-full flex items-center justify-center shadow-inner">
              {icon}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-medium text-[#131313] font-['Plus_Jakarta_Sans'] 
                       leading-tight tracking-wide pb-3 border-b border-[#02214B]/35">
          {title}
        </h3>
      </div>

      {/* Points List */}
      <div className="relative z-10 flex flex-col gap-4 md:gap-5 mt-2">
        {points.map((point, index) => (
          <div key={index} className="flex items-start gap-3 md:gap-4">
            <img
              src={checkIcon}
              alt="Check"
              className="w-6 h-6 md:w-7 md:h-7 mt-0.5 flex-shrink-0 
                         drop-shadow-sm transition-transform duration-300 
                         group-hover:scale-110"
            />
            <p className="text-base md:text-lg leading-relaxed text-[#373737] font-light font-['Inter']">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionPointCard;