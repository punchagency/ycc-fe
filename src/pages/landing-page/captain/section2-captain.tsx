import React from "react";
import shipIcon from "../../../assets/images/icons/home-page-ship.png";
import crewIcon from "../../../assets/images/icons/home-page-crew.png";
import engineeringIcon from "../../../assets/images/icons/home-page-engineering.png";
import SectionPointCard from "../../../components/section-point-card";

const linearGradient = 'linear-gradient(90deg, #0487D9 0%, #05B3E4 100%)'

interface GridItem {
    title: string;
    image: string;
    points: string[];
}

const Section2Captain: React.FC = () => {
    const gridData: GridItem[] = [
        {
            title: "Compliance And Certification for Captains",
            image: shipIcon,
            points: [
                "Access resources for flag state regulations, licensing, and certification renewals.",
                "Stay updated on international maritime laws and safety requirements for seamless operations.",
            ],
        },
        {
            title: "Enhancing Guest Experiences at Sea",
            image: crewIcon,
            points: [
                "Discover connections for creating tailored itineraries, coordinating private events, and managing luxury guest services.",
                "Access resources for managing guest preferences, entertainment options, and VIP experiences.",
            ],
        },
        {
            title: "Leadership and Crew Management",
            image: engineeringIcon,
            points: [
                "Learn techniques for recruiting, training, and leading a cohesive crew.",
                "Gain insights into conflict resolution, team-building, and maintaining morale onboard.",
            ],
        },
        {
            title: "Stay Ahead of the Game",
            image: shipIcon,
            points: [
                "Follow how AI is poised to bring the next era of Yacht Management.",
                "Learn what AI can do for your vessel. Explore the future of a Globally Connected Network.",
            ],
        },
    ];

    return (
        <section className="w-full min-h-screen py-10">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 px-4">
                {/* Header Section */}
                <div className="flex flex-col items-center gap-3 max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%]">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ background: linearGradient }}
                        ></span>

                        <p
                            className="text-[14px] font-medium uppercase tracking-widest"
                            style={{
                                background: linearGradient,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Essential Resources for Modern Captains
                        </p>
                    </div>

                    <h2 className="text-center text-[#131313] font-[Plus Jakarta Sans] font-semibold 
                    text-[32px] sm:text-[36px] md:text-[40px] lg:text-[46px]
                    leading-[38px] sm:leading-[42px] md:leading-[48px] lg:leading-[52px]">
                        Tools and Support for Excellence at Sea
                    </h2>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full">
                    {gridData.map((item, index) => (
                        <div key={index} className="flex">
                            <div className="w-full transition-transform duration-300">
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

export default Section2Captain;