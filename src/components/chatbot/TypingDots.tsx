import React from "react";

const TypingDots: React.FC = () => {
  return (
    <div className="flex items-center justify-start py-1">
      <span
        className="inline-block w-[6px] h-[6px] mx-[3px] rounded-full bg-[#9BBAD0] animate-bounce-dot [animation-delay:0s]"
      ></span>
      <span
        className="inline-block w-[6px] h-[6px] mx-[3px] rounded-full bg-[#9BBAD0] animate-bounce-dot [animation-delay:0.15s]"
      ></span>
      <span
        className="inline-block w-[6px] h-[6px] mx-[3px] rounded-full bg-[#9BBAD0] animate-bounce-dot [animation-delay:0.3s]"
      ></span>
    </div>
  );
};

export default TypingDots;
