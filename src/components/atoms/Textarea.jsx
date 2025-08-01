import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  variant = "default", 
  size = "md", 
  className, 
  ...props 
}, ref) => {
  const baseClasses = "w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-vertical";
  
  const variants = {
    default: "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500",
    error: "border-red-300 bg-white text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500",
    success: "border-green-300 bg-white text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  };
  
  return (
    <textarea
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;