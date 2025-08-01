import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavItem = ({ 
  to, 
  icon, 
  label, 
  badge, 
  className 
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200 rounded-lg mx-2 mb-1",
        isActive && "bg-primary-100 text-primary-800 font-medium",
        className
      )}
    >
      <ApperIcon name={icon} className="h-5 w-5 mr-3" />
      <span className="text-sm font-medium">{label}</span>
      {badge && (
        <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;