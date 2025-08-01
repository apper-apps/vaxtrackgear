import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  variant = "default", 
  className, 
  children, 
  ...props 
}, ref) => {
  const baseClasses = "rounded-lg border shadow-sm";
  
  const variants = {
    default: "bg-white border-gray-200",
    elevated: "bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200",
    metric: "bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]",
    alert: "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
  };
  
  return (
    <div
      ref={ref}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;