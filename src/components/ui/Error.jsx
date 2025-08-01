import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "An error occurred while loading the data.", 
  onRetry,
  className 
}) => {
  return (
    <Card className={cn("p-8", className)}>
      <div className="text-center">
        <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
        {onRetry && (
          <Button 
            variant="primary" 
            onClick={onRetry}
            className="inline-flex items-center"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Error;