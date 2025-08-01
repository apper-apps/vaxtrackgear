import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, rows = 5 }) => {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        
        {/* Table skeleton */}
        <div className="bg-white rounded-lg border">
          <div className="border-b px-6 py-4">
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="border-b px-6 py-4 last:border-b-0">
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;