import React, { useState, useEffect } from "react";
import DashboardMetrics from "@/components/organisms/DashboardMetrics";
import QuickActions from "@/components/organisms/QuickActions";
import InventoryAlerts from "@/components/organisms/InventoryAlerts";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { VaccineService } from "@/services/api/VaccineService";
import { databaseStatusService } from "@/services/api/DatabaseStatusService";
import { formatCurrentDateTime } from "@/utils/dateUtils";

const Dashboard = () => {
  const [vaccines, setVaccines] = useState([]);
  const [databaseStatus, setDatabaseStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(formatCurrentDateTime());

  const loadVaccines = async () => {
    setLoading(true);
    setError("");
    
try {
      const [vaccineData, dbStatusData] = await Promise.all([
        VaccineService.getAll(),
        databaseStatusService.getAll()
      ]);
      setVaccines(vaccineData);
      setDatabaseStatus(dbStatusData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    loadVaccines();
    
    // Update current date/time every minute
    const interval = setInterval(() => {
      setCurrentDateTime(formatCurrentDateTime());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loading rows={3} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadVaccines} />;
  }

return (
<div className="space-y-6">
      {/* Page Header with Date/Time */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor your vaccine inventory and manage operations</p>
        </div>
        <div className="mt-4 sm:mt-0 text-right">
          <div className="text-sm text-gray-500">Current Time</div>
          <div className="text-lg font-semibold text-gray-900">{currentDateTime}</div>
        </div>
      </div>
{/* Database Status Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className={`w-2 h-2 rounded-full mr-3 ${
            databaseStatus.length > 0 ? 'bg-green-500' : 'bg-gray-400'
          }`}></span>
          Database Status
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Loading database status...</span>
          </div>
        ) : databaseStatus.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {databaseStatus.slice(0, 1).map((status) => (
              <div key={status.Id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status.status === 'Online' ? 'bg-green-100 text-green-800' :
                    status.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {status.status || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Connections</span>
                  <span className="text-sm font-semibold text-gray-900">{status.connectionCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Storage</span>
                  <span className="text-sm font-semibold text-gray-900">{status.availableStorage || 0} GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Uptime</span>
                  <span className="text-sm font-semibold text-gray-900">{status.uptime || 'Unknown'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c0-2.21-1.79-4-4-4H4V7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">No database status records found</p>
            <p className="text-gray-500 text-xs mt-1">Database monitoring data will appear here once available</p>
          </div>
        )}
      </div>
      {/* Metrics Overview */}
      <DashboardMetrics vaccines={vaccines} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Alerts Section */}
      <InventoryAlerts vaccines={vaccines} />
    </div>
  );
};

export default Dashboard;