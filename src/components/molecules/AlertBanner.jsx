import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const AlertBanner = ({ 
  title, 
  message, 
  severity = "warning", 
  items = [], 
  className,
  onDismiss
}) => {
  const severityStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-orange-50 border-orange-200 text-orange-800",
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800"
  };

  const severityIcons = {
    info: "Info",
    warning: "AlertTriangle",
    error: "AlertCircle",
    success: "CheckCircle"
  };

  return (
    <Card className={cn("border-l-4", severityStyles[severity], className)}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ApperIcon 
              name={severityIcons[severity]} 
              className="h-5 w-5" 
            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">{title}</h3>
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </button>
              )}
            </div>
            {message && (
              <p className="mt-1 text-sm opacity-90">{message}</p>
            )}
            {items.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {items.slice(0, 5).map((item, index) => (
                    <Badge 
                      key={index} 
                      variant={severity === "warning" ? "expiring" : "expired"}
                      size="sm"
                    >
                      {item.commercialName} ({item.lotNumber})
                    </Badge>
                  ))}
                  {items.length > 5 && (
                    <Badge variant="default" size="sm">
                      +{items.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AlertBanner;