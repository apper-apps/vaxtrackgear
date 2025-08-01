import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  variant = "default", 
  size = "md", 
  className, 
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    expired: "bg-red-100 text-red-800 border border-red-200",
    expiring: "bg-orange-100 text-orange-800 border border-orange-200",
    good: "bg-green-100 text-green-800 border border-green-200",
    "low-stock": "bg-yellow-100 text-yellow-800 border border-yellow-200",
    "out-of-stock": "bg-red-100 text-red-800 border border-red-200",
    primary: "bg-primary-100 text-primary-800 border border-primary-200",
    secondary: "bg-secondary-100 text-secondary-800 border border-secondary-200",
    accent: "bg-accent-100 text-accent-800 border border-accent-200"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  };
  
  return (
    <span
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;