import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick, className }) => {
  return (
    <header className={cn(
      "bg-white border-b border-gray-200 px-4 py-3 lg:px-6",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden mr-2"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </Button>
          
          <div className="lg:hidden">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-lg">
                <ApperIcon name="Shield" className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-gray-900">VaxTrack Pro</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Bell" className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <ApperIcon name="Settings" className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;