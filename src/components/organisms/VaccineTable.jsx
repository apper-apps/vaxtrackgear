import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import TableHeader from "@/components/molecules/TableHeader";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";
import { formatDate, getDaysUntilExpiration, getExpirationStatus } from "@/utils/dateUtils";
import { getStockStatus } from "@/utils/vaccineUtils";

const VaccineTable = ({ 
  vaccines = [], 
  onUpdateVaccine, 
  showAdministration = false,
  className 
}) => {
const [sortBy, setSortBy] = useState("commercialName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [adminDoses, setAdminDoses] = useState({});
const [quantityEdits, setQuantityEdits] = useState({});
  const [passwordPrompt, setPasswordPrompt] = useState({ show: false, vaccineId: null, currentQuantity: null });

  const handleQuantityEdit = (vaccineId, currentQuantity) => {
    setPasswordPrompt({
      show: true,
      vaccineId: vaccineId,
      currentQuantity: currentQuantity
    });
  };

  const handleQuantityChange = (vaccineId, value) => {
    const numValue = parseInt(value) || 0;
    setQuantityEdits(prev => ({
      ...prev,
      [vaccineId]: numValue
    }));
  };

  const handleSaveQuantity = (vaccine) => {
    const newQuantity = quantityEdits[vaccine.Id];
    
    if (newQuantity < 0) {
      toast.error("Quantity cannot be negative");
      return;
    }

    const updatedVaccine = {
      ...vaccine,
      quantityOnHand: newQuantity
    };

    onUpdateVaccine(updatedVaccine);
    setQuantityEdits(prev => {
      const updated = { ...prev };
      delete updated[vaccine.Id];
      return updated;
    });
    
    toast.success(`Updated quantity for ${vaccine.commercialName}`);
  };

  const handleCancelQuantity = (vaccineId) => {
    setQuantityEdits(prev => {
      const updated = { ...prev };
      delete updated[vaccineId];
      return updated;
    });
};

  const handlePasswordSubmit = (password) => {
    if (password === "Office6700$#") {
      setQuantityEdits(prev => ({
        ...prev,
        [passwordPrompt.vaccineId]: passwordPrompt.currentQuantity
      }));
      setPasswordPrompt({ show: false, vaccineId: null, currentQuantity: null });
      toast.success("Password verified. You can now edit the quantity.");
    } else {
      toast.error("Invalid password. Access denied.");
    }
  };

  const handlePasswordCancel = () => {
    setPasswordPrompt({ show: false, vaccineId: null, currentQuantity: null });
  };
  const columns = [
    { key: "commercialName", label: "Vaccine Name", sortable: true },
    { key: "genericName", label: "Generic Name", sortable: true },
    { key: "lotNumber", label: "Lot Number", sortable: true },
    { key: "expirationDate", label: "Expiration Date", sortable: true },
    { key: "quantityOnHand", label: "Quantity On Hand", sortable: true },
    { key: "status", label: "Status", sortable: false },
    ...(showAdministration ? [{ key: "administration", label: "Administer", sortable: false }] : [])
  ];

  const handleSort = (key, order) => {
    setSortBy(key);
    setSortOrder(order);
  };

  const handleAdminChange = (vaccineId, value) => {
    const numValue = parseInt(value) || 0;
    setAdminDoses(prev => ({
      ...prev,
      [vaccineId]: numValue
    }));
  };

  const handleAdminister = (vaccine) => {
    const dosesToAdmin = adminDoses[vaccine.Id] || 0;
    
    if (dosesToAdmin <= 0) {
      toast.error("Please enter a valid number of doses to administer");
      return;
    }
    
    if (dosesToAdmin > vaccine.quantityOnHand) {
      toast.error("Cannot administer more doses than available in stock");
      return;
    }

    const updatedVaccine = {
      ...vaccine,
      quantityOnHand: vaccine.quantityOnHand - dosesToAdmin,
      administeredDoses: (vaccine.administeredDoses || 0) + dosesToAdmin
    };

    onUpdateVaccine(updatedVaccine);
    setAdminDoses(prev => ({
      ...prev,
      [vaccine.Id]: 0
    }));
    
    toast.success(`Successfully administered ${dosesToAdmin} doses of ${vaccine.commercialName}`);
  };

  const sortedVaccines = [...vaccines].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === "expirationDate") {
      aValue = aValue ? new Date(aValue) : new Date(0);
      bValue = bValue ? new Date(bValue) : new Date(0);
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue ? bValue.toLowerCase() : "";
    } else if (typeof aValue === "number") {
      aValue = aValue || 0;
      bValue = bValue || 0;
    }
    
    if (sortOrder === "desc") {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }
  });

  const getStatusBadge = (vaccine) => {
    const expirationStatus = getExpirationStatus(vaccine.expirationDate);
    const stockStatus = getStockStatus(vaccine.quantityOnHand);
    
    if (expirationStatus === "expired") {
      return <Badge variant="expired">Expired</Badge>;
    } else if (expirationStatus === "expiring") {
      const daysLeft = getDaysUntilExpiration(vaccine.expirationDate);
      return <Badge variant="expiring">Expires in {daysLeft} days</Badge>;
    } else if (stockStatus === "out-of-stock") {
      return <Badge variant="out-of-stock">Out of Stock</Badge>;
    } else if (stockStatus === "low-stock") {
      return <Badge variant="low-stock">Low Stock</Badge>;
    } else {
      return <Badge variant="good">Good</Badge>;
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 medical-table">
          <TableHeader 
            columns={columns}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
{sortedVaccines.map((vaccine) => (
              <tr key={vaccine.Id} className="group hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {vaccine.commercialName}
                  </div>
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
                  {quantityEdits.hasOwnProperty(vaccine.Id) ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="0"
                        value={quantityEdits[vaccine.Id]}
                        onChange={(e) => handleQuantityChange(vaccine.Id, e.target.value)}
                        className="w-20 text-center"
                        size="sm"
                      />
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => handleSaveQuantity(vaccine)}
                      >
                        <ApperIcon name="Check" className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelQuantity(vaccine.Id)}
                      >
                        <ApperIcon name="X" className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        "font-medium",
                        vaccine.quantityOnHand === 0 ? "text-red-600" :
                        vaccine.quantityOnHand <= 5 ? "text-orange-600" : "text-green-600"
                      )}>
                        {vaccine.quantityOnHand}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityEdit(vaccine.Id, vaccine.quantityOnHand)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ApperIcon name="Edit2" className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(vaccine)}
                </td>
                {showAdministration && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vaccine.quantityOnHand > 0 ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="0"
                          max={vaccine.quantityOnHand}
                          value={adminDoses[vaccine.Id] || ""}
                          onChange={(e) => handleAdminChange(vaccine.Id, e.target.value)}
                          placeholder="0"
                          className="w-20 text-center"
                          size="sm"
                        />
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => handleAdminister(vaccine)}
                          disabled={!adminDoses[vaccine.Id] || adminDoses[vaccine.Id] <= 0}
                        >
                          <ApperIcon name="Syringe" className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Out of stock</span>
                    )}
                  </td>
                )}
              </tr>
))}
          </tbody>
        </table>
      </div>
      
      {sortedVaccines.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Package" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vaccines found</h3>
          <p className="text-gray-500">No vaccine inventory data is available.</p>
        </div>
      )}

      {/* Password Prompt Dialog */}
      {passwordPrompt.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Password Required
            </h3>
            <p className="text-gray-600 mb-4">
              Please enter the password to edit quantity on hand:
            </p>
            <Input
              type="password"
              placeholder="Enter password"
              className="w-full mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit(e.target.value);
                }
              }}
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handlePasswordCancel}
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                onClick={(e) => {
                  const input = e.target.closest('.bg-white').querySelector('input[type="password"]');
                  handlePasswordSubmit(input.value);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
)}
    </Card>
  );
};

export default VaccineTable;