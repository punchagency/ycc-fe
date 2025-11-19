import React from "react";
import shipIcon from "../../../assets/images/icons/home-page-ship.png";
import engineeringIcon from "../../../assets/images/icons/home-page-engineering.png";
import { MdHealthAndSafety } from "react-icons/md";
import SectionPointCard from "../../../components/section-point-card";

const linearGradient =
  "linear-gradient(90deg, #0487D9 0%, #034D92 100%)";

const Section2Exterior: React.FC = () => {
  const gridData = [
    {
      title: "Essential Maintenance",
      points: [
        "Discover expert techniques for teak care, hull cleaning, and polishing.",
        "Simplify your Exterior Department management with service bookings and a worldwide supply network.",
      ],
      image: shipIcon,
    },
    {
      title: "Safety and Compliance",
      points: [
        "Maintain stock of essential safety gear, including life jackets, EPIRB's, PLB's and fire suppression with services available worldwide.",
        "Access resources on flag state regulations and maritime safety standards to ensure safety and compliance.",
      ],
      image: undefined,
      icon: <MdHealthAndSafety size={38} className="text-white" />,
    },
    {
      title: "Advance Your Career",
      points: [
        "Build your skills with training resources, on deck maintenance, safety procedures and access to career advancing resources.",
        "Join our Network to connect with service providers. Access department management tools wherever you are.",
      ],
      image: shipIcon,
    },
    {
      title: "Access your personal AI assistant",
      points: [
        "Let our system streamline your operations on a daily basis.",
        "Your AI Assistant improves on every interaction. So it becomes personally tailored to you and your department.",
      ],
      image: engineeringIcon,
    },
  ];

  return (
    <section className="min-h-screen w-full py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-7 px-4">
        {/* TOP TITLE & SUBTEXT */}
        <div className="flex flex-col gap-3 text-center max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%]">
          <div className="flex items-center justify-center gap-3">
            <span
              className="
                w-3 h-3 rounded-full
              "
              style={{ background: linearGradient }}
            ></span>

            <GradientText>Exterior Excellence & Maintenance</GradientText>
          </div>

          <HeadingText>Master Your Exterior Operations</HeadingText>
        </div>

        {/* GRID CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {gridData.map((item, index) => (
            <div key={index} className="flex justify-start">
              <AnimatedBox>
                <SectionPointCard
                  image={item.image}
                  title={item.title}
                  points={item.points}
                  icon={item.icon}
                />
              </AnimatedBox>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------- Tailwind Replacements for Styled Components ------------------- */

const AnimatedBox: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full h-full transition-transform duration-300 ease-in-out">
      {children}
    </div>
  );
};

const HeadingText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h3
    className="
      text-[#131313] 
      font-plus-jakarta 
      font-medium 
      text-[36px] sm:text-[40px] md:text-[42px] lg:text-[46px]
      leading-[38px] sm:leading-[42px] md:leading-[46px] lg:leading-[51px]
      tracking-[-0.02em]
      text-center
    "
  >
    {children}
  </h3>
);

const GradientText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p
    className="
      font-inter font-medium
      text-[14px] leading-[20px]
      tracking-[0.05em] uppercase
    "
    style={{
      background: linearGradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {children}
  </p>
);

export default Section2Exterior;
