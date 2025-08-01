import React from "react";
import { cn } from "@/utils/cn";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose, className }) => {
  const navItems = [
    { to: "/", icon: "BarChart3", label: "Dashboard" },
    { to: "/inventory", icon: "Package", label: "Inventory" },
    { to: "/receive", icon: "TruckIcon", label: "Receive Vaccines" },
    { to: "/administer", icon: "Syringe", label: "Record Administration" },
    { to: "/reports", icon: "FileText", label: "Reports" },
    { to: "/settings", icon: "Settings", label: "Settings" }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 min-h-screen",
        className
      )}>
<div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <img 
              src="https://pediatricshouston.com/wp-content/uploads/2024/07/littlebuddiespediatricsgreen.png" 
              alt="Little Buddies Pediatrics Logo" 
              className="h-6 w-6 object-contain" 
            />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">VaxTrack Pro</h1>
              <p className="text-xs text-gray-500">Vaccine Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
        
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Shield" className="h-4 w-4 mr-2" />
            <span>Healthcare Facility</span>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
<div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <img 
              src="https://pediatricshouston.com/wp-content/uploads/2024/07/littlebuddiespediatricsgreen.png" 
              alt="Little Buddies Pediatrics Logo" 
              className="h-6 w-6 object-contain" 
            />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">VaxTrack Pro</h1>
              <p className="text-xs text-gray-500">Vaccine Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} onClick={onClose} />
          ))}
        </nav>
        
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Shield" className="h-4 w-4 mr-2" />
            <span>Healthcare Facility</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;