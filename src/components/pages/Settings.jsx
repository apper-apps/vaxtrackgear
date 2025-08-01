import React, { useState } from "react";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  const [settings, setSettings] = useState({
    facilityName: "Healthcare Facility",
    lowStockThreshold: 5,
    expirationWarningDays: 30,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    reportingFrequency: "monthly"
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSettings({
      facilityName: "Healthcare Facility",
      lowStockThreshold: 5,
      expirationWarningDays: 30,
      autoBackup: true,
      emailNotifications: true,
      smsNotifications: false,
      reportingFrequency: "monthly"
    });
    toast.info("Settings reset to default values");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your vaccine inventory management preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Settings" className="h-5 w-5 mr-2" />
            General Settings
          </h2>
          
          <div className="space-y-4">
            <FormField
              label="Facility Name"
              value={settings.facilityName}
              onChange={(e) => handleInputChange("facilityName", e.target.value)}
              placeholder="Enter facility name"
            />
            
            <FormField
              label="Low Stock Threshold"
              type="number"
              min="1"
              max="100"
              value={settings.lowStockThreshold}
              onChange={(e) => handleInputChange("lowStockThreshold", parseInt(e.target.value))}
              placeholder="Number of doses"
            />
            
            <FormField
              label="Expiration Warning (Days)"
              type="number"
              min="1"
              max="365"
              value={settings.expirationWarningDays}
              onChange={(e) => handleInputChange("expirationWarningDays", parseInt(e.target.value))}
              placeholder="Days before expiration"
            />
            
            <FormField label="Reporting Frequency">
              <select
                value={settings.reportingFrequency}
                onChange={(e) => handleInputChange("reportingFrequency", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </FormField>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Bell" className="h-5 w-5 mr-2" />
            Notifications
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                <p className="text-xs text-gray-500">Receive alerts via email</p>
              </div>
              <button
                type="button"
                onClick={() => handleInputChange("emailNotifications", !settings.emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  settings.emailNotifications ? "bg-primary-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
                <p className="text-xs text-gray-500">Receive alerts via text message</p>
              </div>
              <button
                type="button"
                onClick={() => handleInputChange("smsNotifications", !settings.smsNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  settings.smsNotifications ? "bg-primary-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.smsNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Automatic Backup</label>
                <p className="text-xs text-gray-500">Daily backup of inventory data</p>
              </div>
              <button
                type="button"
                onClick={() => handleInputChange("autoBackup", !settings.autoBackup)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  settings.autoBackup ? "bg-primary-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoBackup ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* System Information */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="Info" className="h-5 w-5 mr-2" />
          System Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700">Version</p>
            <p className="text-sm text-gray-600">VaxTrack Pro v1.0.0</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Last Backup</p>
            <p className="text-sm text-gray-600">Today at 3:00 AM</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Database Status</p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm text-gray-600">Connected</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={loading}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;