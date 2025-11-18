import React from "react";
import image from "../../../assets/images/icons/home-page-chef.png";
import FormContactUs from "./form-contact-us";

interface GridItem {
  image: string;
  title: string;
  subtext: string;
}

const Section1ContactUs: React.FC = () => {
  const gridData: GridItem[] = [
    {
      image: image,
      title: "Reach out",
      subtext: "Email : contact@yachtcrewcenter.com",
    },
    {
      image: image,
      title: "Yacht Crew Center, LLC",
      subtext: "Fort Lauderdale, FL",
    },
    {
      image: image,
      title: "Operational and WhatsApp AI Agent",
      subtext: "+1 954 751 1756",
    },
  ];

  return (
    <section className="py-5 md:py-10 px-5 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Content */}
        <div className="flex flex-col gap-14">
          {/* Heading */}
          <div className="flex flex-col gap-6 text-left">
            <h2 className="font-plusJakartaSans font-medium text-[46px] leading-[51px] -tracking-[2%] text-[#131313]">
              Get In Contact Today
            </h2>
            <p className="font-inter font-normal text-[18px] leading-[26px] -tracking-[0.03em] text-[#373737] text-justify">
              Need Specialized Assistance? We're Here to Help. At Yacht Crew
              Center, we understand that urgent situations can arise onboard.
              Finding the right service or product quickly is crucial. If you're
              facing an emergency, need specialized support. Can't locate a
              specific item or vendor our team is ready to assist. Contact us
              for fast, personalized solutions tailored to your needs—we'll
              connect you with the right resources to keep your operations
              running smoothly.
            </p>
          </div>

          {/* Grid Items */}
          <div className="flex flex-col gap-9">
            {gridData.map((item, index) => (
              <div key={index} className="flex flex-row gap-4">
                <img
                  src={item.image}
                  alt="yacht"
                  className="w-[69.5px] h-[69.5px]"
                />
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="font-plusJakartaSans font-medium text-[30px] leading-[37px] tracking-[1%] text-[#131313]">
                    {item.title}
                  </h3>
                  <p className="font-inter font-normal text-[18px] leading-[26px] -tracking-[0.03em] text-[#373737]">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div>
          <FormContactUs />
        </div>
      </div>
    </section>
  );
};

export default Section1ContactUs;
