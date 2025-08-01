import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data available", 
  message = "There is no data to display at this time.", 
  icon = "Package",
  actionLabel,
  onAction,
  className 
}) => {
  return (
    <Card className={cn("p-12", className)}>
      <div className="text-center">
        <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <ApperIcon name={icon} className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{message}</p>
        {actionLabel && onAction && (
          <Button 
            variant="primary" 
            onClick={onAction}
            className="inline-flex items-center"
          >
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Empty;