import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ 
  variant = "default", 
  size = "md", 
  className, 
  children, 
  ...props 
}, ref) => {
  const baseClasses = "block font-medium";
  
  const variants = {
    default: "text-gray-700",
    required: "text-gray-700 after:content-['*'] after:text-red-500 after:ml-1",
    error: "text-red-700",
    success: "text-green-700"
  };
  
  const sizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  return (
    <label
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export default Label;