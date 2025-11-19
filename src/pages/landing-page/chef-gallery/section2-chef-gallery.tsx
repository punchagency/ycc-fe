import React from "react";
import shipIcon from "../../assets/images/icons/home-page-ship.png";
import crewIcon from "../../assets/images/icons/home-page-crew.png";
import engineeringIcon from "../../assets/images/icons/home-page-engineering.png";
import SectionPointCard from "../../../components/section-point-card";


const linearGradient = 'linear-gradient(90deg, #0487D9 0%, #05B3E4 100%)'

interface GridItem {
    title: string;
    points: string[];
    image: string;
}

const Section2ChefGallery: React.FC = () => {
    const gridData: GridItem[] = [
        {
            title: "Provisioning Resources for Gourmet Creations",
            points: [
                "Find trusted suppliers for fresh produce, specialty foods, and premium meats.",
                "Join the Preferred Crew Network to connect with Chefs, secure new opportunities, and grow in your profession.",
            ],
            image: shipIcon,
        },
        {
            title: "AI Support for Yacht Chefs and Galley Management",
            points: [
                "Transform your culinary workflow with GPT-powered assistance. Instantly retrieve yacht-specific recipes, provisioning checklists, and food safety guidelines.",
                "AI auto-classifies new galley documents and enhances your ability to deliver exceptional meals while staying organized in the most demanding kitchens.",
            ],
            image: crewIcon,
        },
        {
            title: "Advance Your Career as a Yacht Chef",
            points: [
                "Access training programs and resources to enhance your skills in culinary arts, food presentation, and dietary customization.",
                "Find & book recommended suppliers for cleaning products, décor and organizational tools tailored for yachts.",
            ],
            image: shipIcon,
        },
        {
            title: "Food Safety and Hygiene Best Practices",
            points: [
                "Learn guidelines for safe storage and handling of ingredients in marine environments.",
                "Stay up to date with food safety certifications and onboard hygiene standards.",
            ],
            image: engineeringIcon,
        },
    ];

    return (
        <section className="min-h-screen w-full py-10">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-7 px-4">
                
                {/* Top Section */}
                <div className="flex flex-col gap-3 max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%] text-center">
                    
                    {/* Badge + Gradient Text */}
                    <div className="flex items-center justify-center gap-3">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ background: linearGradient }}
                        ></span>

                        <p
                            className="
                                font-inter uppercase font-medium 
                                text-[14px] leading-[19px] tracking-[0.05em]
                                bg-clip-text text-transparent
                            "
                            style={{ background: linearGradient }}
                        >
                            Culinary Excellence at Sea
                        </p>
                    </div>

                    {/* Heading */}
                    <h2
                        className="
                            text-[#131313] font-[600] 
                            text-[36px] leading-[36px]
                            sm:text-[40px] sm:leading-[40px]
                            md:text-[42px] md:leading-[46px]
                            lg:text-[46px] lg:leading-[51px]
                            font-[PlusJakartaSans]
                            tracking-[-0.02em]
                        "
                    >
                        Elevate Your Yacht Dining Experience
                    </h2>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {gridData.map((item, index) => (
                        <div
                            key={index}
                            className="w-full h-full transition-transform duration-300"
                        >
                            <SectionPointCard
                                image={item.image}
                                title={item.title}
                                points={item.points}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Section2ChefGallery;
