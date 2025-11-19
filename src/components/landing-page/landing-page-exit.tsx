import React from "react";
import { Link } from "react-router-dom";
import yatch from "../../assets/images/YCC-yatch.png";

interface SectionData {
  title: string;
  subText: string;
  button: {
    text: string;
    path: string;
  };
}

interface Props {
  sectionData: SectionData;
}

export const HeadingTextBlack: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-[#292929] font-bold text-2xl sm:text-3xl md:text-4xl leading-tight font-plus-jakarta">
    {children}
  </h2>
);

export const SecondarySubTextBlack: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[#4A4A4A] text-base sm:text-lg md:text-xl leading-relaxed font-plus-jakarta">
    {children}
  </p>
);

const LandingPageExitCard: React.FC<Props> = ({ sectionData }) => {
  return (
    <div className="pb-[288px]">
      <div
        className="
          bg-[#02214B] bg-cover flex flex-col items-center justify-center
          h-[500px] pt-[150px] md:h-[400px] lg:h-[380px] w-full relative overflow-visible
          px-5 md:px-0
        "
      >
        <div className="w-full max-w-[1200px] flex justify-center relative">
          {/* Floating Card */}
          <div
            className="
              absolute left-1/2
              translate-x-[-50%]
              bottom-[17px] sm:bottom-[173px] md:bottom-0
              md:translate-y-[30%] lg:translate-y-[60%] 
              sm:translate-y-[50%] translate-y-[50%]
              flex flex-row flex-wrap gap-2 md:gap-4
              justify-center items-center
              w-[90%] sm:w-[95%] md:w-[1000px] lg:w-[1180px]
              h-auto sm:h-[300px] md:h-[400px] lg:h-[480px]
              px-4 sm:px-6 md:px-8 lg:px-0
            "
          >
            <div
              className="
                w-full bg-white rounded-[9px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)]
                grid grid-cols-1 md:grid-cols-2
              "
            >
              {/* Left Column */}
              <div
                className="
                  flex flex-col gap-[28px] p-4 sm:p-6 md:p-8 lg:p-10
                  text-left justify-center
                "
              >
                <div className="flex flex-col gap-3">
                  <HeadingTextBlack>{sectionData.title}</HeadingTextBlack>
                </div>

                <SecondarySubTextBlack>{sectionData.subText}</SecondarySubTextBlack>

                <div className="flex gap-4 justify-start">
                  <Link to={sectionData.button.path}>
                    <button
                      className="
                        w-[240px] h-[51px] rounded-md
                        bg-gradient-to-r from-[#0487D9] to-[#034D92]
                        text-white font-medium text-[16px] font-inter
                      "
                    >
                      {sectionData.button.text}
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative w-full h-full">
                <img
                  src={yatch}
                  alt="Yacht Crew Center"
                  className="
                    w-full h-full object-cover
                    rounded-tr-[8px] rounded-br-[8px]
                  "
                />

                {/* Left Gradient Overlay */}
                <div
                  className="
                    absolute top-0 left-0 h-full w-[35%]
                    bg-gradient-to-r from-white to-transparent
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageExitCard