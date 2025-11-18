import React, { useEffect, useState } from "react";
import banner from "../../../assets/images/resource-center/YCC-resource-center-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section1ResourceCenter from "./section1-resource-center";
import Section3ResourceCenter from "./section2-resource-center";
import ResourceCenterSection4 from "./section3-resource-center";
import { LandingPageAIProvider } from "../../../context/AIAssistant/landingPageAIContext";
import LandingPageChatbot from "../../../components/chatbot/landing-page-chatbot";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className }) => {
  return (
    <span
      className={`bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent ${className || ""}`}
    >
      {children}
    </span>
  );
};

const ResourceCenter: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const header = (
    <>
      <GradientText>Resource </GradientText>
      <GradientText>Center</GradientText>
      <br /> Yacht Crew Center
    </>
  );

  // LIFTED STATE
  const [toggle, setToggle] = useState<"Services" | "Supplies">("Services");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  return (
    <LandingPageAIProvider>
      <main className="flex flex-col gap-6 md:gap-10 w-full box-border m-0">
        {/* Banner */}
        <LandingPageBanner backgroundImage={banner} header={header} />

        {/* Section 1 */}
        <Section1ResourceCenter
          toggle={toggle}
          setToggle={setToggle}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          type={toggle === "Supplies" ? "product" : "service"}
        />

        {/* Section 2 */}
        <Section3ResourceCenter />

        {/* Dynamic Section 4 */}
        <div className="mt-2">
          {toggle === "Supplies" ? (
            <ResourceCenterSection4
              type="product"
              category={category}
              search={search}
            />
          ) : (
            <ResourceCenterSection4
              type="service"
              category={category}
              search={search}
            />
          )}
        </div>

        {/* Notice Box */}
        <div className="w-full flex justify-center mb-12 px-4">
          <div className="bg-[#0487D9] text-white rounded-3xl px-4 md:px-12 py-4 md:py-6 max-w-4xl w-full flex items-start shadow-none">
            <div className="flex gap-4 w-full">
              {/* Avatar */}
              <div className="bg-black/10 w-10 h-10 rounded-full flex items-center justify-center mt-1">
                <InformationCircleIcon className="w-6 h-6 text-white" />
              </div>

              <div>
                <span className="font-bold text-lg md:text-xl">
                  Guest Access:
                </span>
                <span className="text-lg md:text-xl ml-1 font-normal">
                  Browse all vendors & supplies freely. Place supply orders as a
                  guest.
                  <br />
                  <b>Sign in</b> to request quotes or book services.
                </span>

                <p className="italic text-base md:text-lg mt-2 text-white/80">
                  AI Chat Support available for all users (basic access for
                  guests)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <LandingPageFooter />
      </main>

      {/* Chatbot */}
      <LandingPageChatbot />
    </LandingPageAIProvider>
  );
};

export default ResourceCenter;
