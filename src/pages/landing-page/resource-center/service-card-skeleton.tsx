import React from "react";

const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[400px] flex flex-col bg-gray-100 rounded-xl shadow transition-all duration-200 cursor-pointer">
      {/* Image Skeleton */}
      <div className="relative h-[200px] overflow-hidden">
        <div className="w-full h-full bg-gray-300 animate-pulse" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Header Skeleton */}
        <div>
          {/* Title */}
          <div className="h-5 w-[85%] bg-gray-300 rounded animate-pulse mb-2" />

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-[60px] bg-gray-300 rounded-md animate-pulse" />
            <div className="h-6 w-[80px] bg-gray-300 rounded-md animate-pulse" />
            <div className="h-6 w-[70px] bg-gray-300 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-[95%] bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-[75%] bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Contact Area Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
            <div className="h-4 w-[70%] bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse" />
            <div className="h-4 w-[60%] bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action Button Skeleton */}
      <div className="p-4 pt-0">
        <div className="w-full h-10 rounded-lg bg-gradient-to-r from-[#0487D9] to-[#034D92] opacity-60 animate-pulse" />
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;