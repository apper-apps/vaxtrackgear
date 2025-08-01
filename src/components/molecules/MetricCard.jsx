import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection,
  variant = "default",
  className 
}) => {
  const variants = {
    default: "text-gray-600",
    primary: "text-primary-600",
    accent: "text-accent-600",
    warning: "text-orange-600",
    danger: "text-red-600",
    success: "text-green-600"
  };

  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-500"
  };

  return (
    <Card variant="metric" className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline">
            <p className={cn("text-3xl font-bold", variants[variant])}>
              {value}
            </p>
            {trend !== undefined && (
              <div className={cn("ml-2 flex items-center text-sm font-medium", trendColors[trendDirection])}>
                <ApperIcon 
                  name={trendDirection === "up" ? "TrendingUp" : trendDirection === "down" ? "TrendingDown" : "Minus"} 
                  className="h-4 w-4 mr-1" 
                />
                {trend}%
              </div>
            )}
          </div>
        </div>
        {icon && (
          <div className={cn("p-3 rounded-lg bg-gray-50", variants[variant])}>
            <ApperIcon name={icon} className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;