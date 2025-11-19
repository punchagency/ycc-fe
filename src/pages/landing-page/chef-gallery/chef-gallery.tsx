import React, { useEffect } from "react";
import banner from "../../../assets/images/chef-gallery/YCC-chef-gallery-banner.png";
import LandingPageBanner from "../../../components/landing-page/landing-page-banner";
import LandingPageFooter from "../../../components/landing-page/landing-page-footer";
import Section2ChefGallery from "./section2-chef-gallery";
import Section3ChefGallery from "./section3-chef-gallery";
import Chatbot from "../../../components/chatbot/chatbot";

interface ButtonProps {
    text: string;
    path: string;
}

interface GradientTextProps {
    children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({ children }) => {
    return (
        <span
            className="
                font-[600] text-[#0487D9] font-[PlusJakartaSans] uppercase inline-block
                text-[22px] leading-[28px]
                sm:text-[28px] sm:leading-[34px]
                md:text-[36px] md:leading-[42px]
                lg:text-[50px] lg:leading-[60px]
                tracking-[-0.02em]
            "
        >
            {children}
        </span>
    );
};

const ChefGalleryLandingPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const backgroundImage = banner;

    const header = (
        <>
            Empowering <GradientText>Yacht</GradientText>{" "}
            <GradientText>Chefs</GradientText> to Create Culinary Excellence
        </>
    );

    const subtext2 =
        "From gourmet provisioning to top-tier galley equipment, discover everything you need to elevate onboard dining.";

    const button1: ButtonProps = {
        text: "Join Now",
        path: "/get-started",
    };

    return (
        <div
            className="
                flex flex-col gap-[120px] md:gap-[120px] lg:gap-[60px]
                mb-[45px] sm:mb-[23px] md:mb-[60px]
            "
        >
            <LandingPageBanner
                backgroundImage={backgroundImage}
                header={header}
                subtext2={subtext2}
                button1={button1}
            />

            <Chatbot />

            <Section2ChefGallery />
            <Section3ChefGallery />

            <LandingPageFooter />
        </div>
    );
};

export default ChefGalleryLandingPage;