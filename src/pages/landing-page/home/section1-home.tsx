import React from 'react';

const Section1Home: React.FC = () => {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Content Column */}
          <div className="flex flex-col gap-7 text-center md:text-left mt-5 md:mt-0">
            {/* Badge with Gradient Dot */}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00CCFF]" />
              <span 
                className="font-semibold text-sm uppercase tracking-tight font-['Inter']"
                style={{
                  background: 'linear-gradient(90deg, #0066FF 0%, #00CCFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Explore The Future of Yachting
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[#131313]  font-medium text-[28px] leading-[34px] sm:text-4xl sm:leading-[42px] md:text-[46px] md:leading-[51px] tracking-tight">
              Meet Your AI Assistant for All Things Yachting
            </h1>

            {/* Description */}
            <p className="text-[#373737] font-['Inter'] font-normal text-lg leading-[128%] text-justify md:text-left">
              Welcome to the future of yachting support. This AI Assistant is designed to empower all Crew member, Captain, Engineer, Chef, Exterior and Interior teams alike. Whether you're seeking answers to complex questions, service providers, suppliers or retrieving yacht-specific information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1Home;