import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ButtonProps {
  text: string;
  path: string;
}

interface LandingPageBannerProps {
  page?: string;
  backgroundImage: string;
  header: ReactNode;
  subtext1?: string;
  subtext2?: string;
  button1?: ButtonProps;
  button2?: ButtonProps;
}

const linearGradient = "linear-gradient(90deg, #034D92, #0487D9)";

const LandingPageBanner: React.FC<LandingPageBannerProps> = ({
  page,
  backgroundImage,
  header,
  subtext1,
  subtext2,
  button1,
  button2,
}) => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full h-screen min-h-[600px] md:min-h-[700px] max-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay gradients */}
      {page === "home" ? (
        <>
          {/* Outer gradient */}
          <div
            className="absolute top-0 left-0 h-full w-full sm:w-[85%] md:w-[70.3%]
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0)_100%)]
            md:bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.9)_20%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0)_100%)]
            blur-[20px] md:blur-[30.8px]"
          />

          {/* Inner gradient */}
          <div
            className="absolute top-0 left-0 h-full md:h-[95%] w-full sm:w-[70%] md:w-[55%]
            bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_40%,rgba(0,0,0,0.2)_80%,rgba(0,0,0,0)_100%)]
            md:bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.9)_70%,rgba(0,0,0,0.3)_100%,rgba(0,0,0,0)_100%)]
            blur-[20px] md:blur-[30.8px]"
          />
        </>
      ) : (
        <div
          className="absolute top-0 left-0 h-full w-full md:w-[92%]
          bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0)_100%)]
          md:bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0)_100%)]"
        />
      )}

      {/* Text Content */}
      <div
        className="absolute top-1/2 md:top-[60%] left-1/2 md:left-[40%] lg:left-[27%]
        -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col gap-5 sm:gap-6 md:gap-7
        text-center md:text-left w-[90%] sm:w-[85%] md:w-auto max-w-full sm:max-w-[600px] md:max-w-[690px] px-4 sm:px-6 md:px-0"
      >
        {/* Header and first subtext */}
        <div className="flex flex-col w-full gap-3 md:gap-3.5">
          <h1
            className="text-white font-semibold uppercase tracking-tight
            font-['Plus_Jakarta_Sans'] text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px]
            leading-[40px] sm:leading-[46px] md:leading-[52px] lg:leading-[60px]"
          >
            {header}
          </h1>

          {subtext1 && (
            <p className="hidden md:block text-white font-inter font-medium text-base lg:text-lg leading-[27.52px]">
              {subtext1}
            </p>
          )}
        </div>

        {subtext2 && (
          <p className="text-white font-inter font-medium text-base md:text-lg leading-6 md:leading-[26.64px]">
            {subtext2}
          </p>
        )}

        {/* Buttons */}
        {button1 && (
          <div
            className="flex flex-col sm:flex-col md:flex-row gap-3 md:gap-[15px] 
            justify-center md:justify-start items-center w-full md:w-"
          >
            <Link
              to={button1.path}
              className="flex items-center w-full max-w-[240px]"
            >
              <button
                className="flex items-center w-full max-w-[240px] justify-center min-w-[200px] sm:min-w-[240px] py-2.5 px-3 md:py-3 md:px-3.5
                text-white font-inter font-medium text-lg md:text-base text-center align-middle
                rounded-md transition-all duration-300 ease-in-out
                hover:translate-y-[-3px] hover:shadow-[0_4px_12px_1px_rgba(4, 135, 217, 0.3)] cursor-pointer"
                style={{
                  background: linearGradient,
                }}
              >
                {button1.text}
              </button>
            </Link>

            {button2 && (
              <button
                type="button"
                onClick={() => navigate(button2.path)}
                className="relative group w-full sm:w-[240px] md:w-auto max-w-[240px] md:max-w-none
                overflow-hidden border-none rounded-md bg-transparent
                text-white font-inter font-medium text-sm md:text-base
                py-2.5 px-3 md:py-3 md:px-3.5 text-center transition-all duration-300 ease-in-out
                hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0487D9]">
                  {button2.text}
                </span>
                
                {/* Gradient border */}
                <span
                  className="absolute inset-0 p-[2px] rounded-lg transition-all duration-300 
                  group-hover:opacity-70 group-hover:rotate-3 group-hover:scale-105"
                  style={{
                    background: linearGradient,
                    WebkitMask:
                      "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                  }}
                />
                
                {/* Hover background effect */}
                <span className="absolute inset-0 bg-white/10 -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingPageBanner;