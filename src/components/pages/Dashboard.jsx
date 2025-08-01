import React, { useState, useEffect } from "react";
import DashboardMetrics from "@/components/organisms/DashboardMetrics";
import QuickActions from "@/components/organisms/QuickActions";
import InventoryAlerts from "@/components/organisms/InventoryAlerts";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { VaccineService } from "@/services/api/VaccineService";

const Dashboard = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVaccines = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await VaccineService.getAll();
      setVaccines(data);
    } catch (err) {
      setError("Failed to load vaccine inventory data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVaccines();
  }, []);

  if (loading) {
    return <Loading rows={3} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadVaccines} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your vaccine inventory and manage operations</p>
      </div>

      {/* Metrics Overview */}
      <DashboardMetrics vaccines={vaccines} />

      {/* Alerts Section */}
      <InventoryAlerts vaccines={vaccines} />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default Dashboard;