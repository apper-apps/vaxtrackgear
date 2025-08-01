import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const QuickActions = ({ className }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Receive Vaccines",
      description: "Record new vaccine shipments and quality checks",
      icon: "TruckIcon",
      path: "/receive",
      variant: "primary"
    },
    {
      title: "Record Administration",
      description: "Update administered doses for vaccine inventory",
      icon: "Syringe",
      path: "/administer",
      variant: "accent"
    },
    {
      title: "View Inventory",
      description: "Browse and manage current vaccine stock",
      icon: "Package",
      path: "/inventory",
      variant: "secondary"
    },
    {
      title: "Generate Reports",
      description: "Create monthly and ad-hoc inventory reports",
      icon: "FileText",
      path: "/reports",
      variant: "outline"
    }
  ];

  return (
    <Card className={cn("p-6", className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={() => navigate(action.path)}
            className="h-auto p-4 flex items-start space-x-4 text-left justify-start"
          >
            <div className="flex-shrink-0">
              <ApperIcon name={action.icon} className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{action.title}</div>
              <div className="text-xs opacity-80 mt-1">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;