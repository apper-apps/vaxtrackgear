import React from "react";
import { cn } from "@/utils/cn";
import MetricCard from "@/components/molecules/MetricCard";
import { 
  calculateTotalDoses, 
  calculateAdministeredDoses, 
  getExpiringVaccines, 
  getExpiredVaccines 
} from "@/utils/vaccineUtils";

const DashboardMetrics = ({ vaccines = [], className }) => {
  const totalDoses = calculateTotalDoses(vaccines);
  const administeredDoses = calculateAdministeredDoses(vaccines);
  const expiringSoon = getExpiringVaccines(vaccines, 30);
  const expired = getExpiredVaccines(vaccines);

  const metrics = [
    {
      title: "Total Doses Available",
      value: totalDoses.toLocaleString(),
      icon: "Package",
      variant: "primary"
    },
    {
      title: "Administered Doses",
      value: administeredDoses.toLocaleString(),
      icon: "Syringe",
      variant: "accent"
    },
    {
      title: "Expiring Soon (30 days)",
      value: expiringSoon.length,
      icon: "Clock",
      variant: "warning"
    },
    {
      title: "Expired Vaccines",
      value: expired.length,
      icon: "AlertTriangle",
      variant: "danger"
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6", className)}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          variant={metric.variant}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;