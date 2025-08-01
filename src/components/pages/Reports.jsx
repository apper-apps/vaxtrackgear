import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { VaccineService } from "@/services/api/VaccineService";
import { formatDate, getExpirationStatus } from "@/utils/dateUtils";
import { getStockStatus } from "@/utils/vaccineUtils";

const Reports = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reportType, setReportType] = useState("current-inventory");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const loadVaccines = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await VaccineService.getAll();
      setVaccines(data);
    } catch (err) {
      setError("Failed to load vaccine data for reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVaccines();
  }, []);

  const generateReport = () => {
    let reportData = [];
    let reportTitle = "";
    
    switch (reportType) {
      case "current-inventory":
        reportData = vaccines;
        reportTitle = "Current Inventory Report";
        break;
      case "expiring-soon":
        reportData = vaccines.filter(vaccine => {
          const status = getExpirationStatus(vaccine.expirationDate);
          return status === "expiring";
        });
        reportTitle = "Vaccines Expiring Soon (30 Days)";
        break;
      case "expired":
        reportData = vaccines.filter(vaccine => {
          const status = getExpirationStatus(vaccine.expirationDate);
          return status === "expired";
        });
        reportTitle = "Expired Vaccines Report";
        break;
      case "low-stock":
        reportData = vaccines.filter(vaccine => {
          const status = getStockStatus(vaccine.quantityOnHand);
          return status === "low-stock" || status === "out-of-stock";
        });
        reportTitle = "Low Stock Report";
        break;
      case "administration-summary":
        reportData = vaccines.filter(vaccine => vaccine.administeredDoses > 0);
        reportTitle = "Administration Summary Report";
        break;
      default:
        reportData = vaccines;
        reportTitle = "Vaccine Inventory Report";
    }
    
    return { data: reportData, title: reportTitle };
  };

  const exportToCSV = () => {
    const { data, title } = generateReport();
    
    const headers = [
      "Commercial Name",
      "Generic Name", 
      "Lot Number",
      "Expiration Date",
      "Received Date",
      "Quantity On Hand",
      "Administered Doses",
      "Status"
    ];
    
    const csvContent = [
      headers.join(","),
      ...data.map(vaccine => [
        `"${vaccine.commercialName}"`,
        `"${vaccine.genericName}"`,
        `"${vaccine.lotNumber}"`,
        formatDate(vaccine.expirationDate),
        formatDate(vaccine.receivedDate),
        vaccine.quantityOnHand,
        vaccine.administeredDoses || 0,
        `"${getExpirationStatus(vaccine.expirationDate)}"`
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (vaccine) => {
    const expirationStatus = getExpirationStatus(vaccine.expirationDate);
    const stockStatus = getStockStatus(vaccine.quantityOnHand);
    
    if (expirationStatus === "expired") {
      return <Badge variant="expired">Expired</Badge>;
    } else if (expirationStatus === "expiring") {
      return <Badge variant="expiring">Expiring Soon</Badge>;
    } else if (stockStatus === "out-of-stock") {
      return <Badge variant="out-of-stock">Out of Stock</Badge>;
    } else if (stockStatus === "low-stock") {
      return <Badge variant="low-stock">Low Stock</Badge>;
    } else {
      return <Badge variant="good">Good</Badge>;
    }
  };

  if (loading) {
    return <Loading rows={5} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadVaccines} />;
  }

  const { data: reportData, title: reportTitle } = generateReport();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate and export vaccine inventory reports</p>
      </div>

      {/* Report Configuration */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Report Type">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="current-inventory">Current Inventory</option>
              <option value="expiring-soon">Expiring Soon (30 Days)</option>
              <option value="expired">Expired Vaccines</option>
              <option value="low-stock">Low Stock Alert</option>
              <option value="administration-summary">Administration Summary</option>
            </select>
          </FormField>
          
          <FormField label="Date From (Optional)">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </FormField>
          
          <FormField label="Date To (Optional)">
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </FormField>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="primary" 
            onClick={exportToCSV}
            className="inline-flex items-center"
          >
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
        </div>
      </Card>

      {/* Report Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{reportTitle}</h2>
          <Badge variant="primary">{reportData.length} records</Badge>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaccine Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generic Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lot Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty On Hand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Administered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((vaccine) => (
                <tr key={vaccine.Id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{vaccine.commercialName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {vaccine.genericName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-600">
                    {vaccine.lotNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {formatDate(vaccine.expirationDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${
                      vaccine.quantityOnHand === 0 ? "text-red-600" :
                      vaccine.quantityOnHand <= 5 ? "text-orange-600" : "text-green-600"
                    }`}>
                      {vaccine.quantityOnHand}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {vaccine.administeredDoses || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(vaccine)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {reportData.length === 0 && (
          <div className="text-center py-8">
            <ApperIcon name="FileText" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
            <p className="text-gray-500">No records match the selected report criteria.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Reports;