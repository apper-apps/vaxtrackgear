import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import ApperIcon from "@/components/ApperIcon";
import { VaccineService } from "@/services/api/VaccineService";

const ReceiveVaccines = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    commercialName: "",
    genericName: "",
    lotNumber: "",
    quantitySent: "",
    quantityReceived: "",
    expirationDate: "",
    receivedDate: new Date().toISOString().split("T")[0],
    dosesPassed: "",
    dosesFailed: "",
    discrepancyReason: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.commercialName.trim()) {
      newErrors.commercialName = "Commercial name is required";
    }
    
    if (!formData.genericName.trim()) {
      newErrors.genericName = "Generic name is required";
    }
    
    if (!formData.lotNumber.trim()) {
      newErrors.lotNumber = "Lot number is required";
    }
    
    if (!formData.quantityReceived || parseInt(formData.quantityReceived) <= 0) {
      newErrors.quantityReceived = "Quantity received must be greater than 0";
    }
    
    if (!formData.expirationDate) {
      newErrors.expirationDate = "Expiration date is required";
    }
    
    if (!formData.dosesPassed || parseInt(formData.dosesPassed) < 0) {
      newErrors.dosesPassed = "Doses passed inspection is required";
    }
    
    if (parseInt(formData.dosesFailed || 0) > 0 && !formData.discrepancyReason.trim()) {
      newErrors.discrepancyReason = "Discrepancy reason is required when doses failed";
    }
    
    const totalInspected = parseInt(formData.dosesPassed || 0) + parseInt(formData.dosesFailed || 0);
    if (totalInspected !== parseInt(formData.quantityReceived || 0)) {
      newErrors.inspection = "Total inspected doses must equal quantity received";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    setLoading(true);
    
    try {
      const vaccineData = {
        commercialName: formData.commercialName,
        genericName: formData.genericName,
        lotNumber: formData.lotNumber,
        quantity: parseInt(formData.quantityReceived),
        expirationDate: formData.expirationDate,
        receivedDate: formData.receivedDate,
        quantityOnHand: parseInt(formData.dosesPassed),
        administeredDoses: 0
      };
      
      await VaccineService.create(vaccineData);
      
      toast.success(`Successfully received ${formData.dosesPassed} doses of ${formData.commercialName}`);
      
      // Reset form
      setFormData({
        commercialName: "",
        genericName: "",
        lotNumber: "",
        quantitySent: "",
        quantityReceived: "",
        expirationDate: "",
        receivedDate: new Date().toISOString().split("T")[0],
        dosesPassed: "",
        dosesFailed: "",
        discrepancyReason: ""
      });
      
      navigate("/inventory");
    } catch (error) {
      toast.error("Failed to receive vaccine shipment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Receive Vaccines</h1>
        <p className="text-gray-600">Record new vaccine shipments and conduct quality inspections</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vaccine Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="Package" className="h-5 w-5 mr-2" />
              Vaccine Information
            </h2>
            
            <div className="space-y-4">
              <FormField
                label="Commercial Name"
                required
                value={formData.commercialName}
                onChange={(e) => handleInputChange("commercialName", e.target.value)}
                error={errors.commercialName}
                placeholder="e.g., Daptacel SDV"
              />
              
              <FormField
                label="Generic Name"
                required
                value={formData.genericName}
                onChange={(e) => handleInputChange("genericName", e.target.value)}
                error={errors.genericName}
                placeholder="e.g., DTaP"
              />
              
              <FormField
                label="Lot Number"
                required
                value={formData.lotNumber}
                onChange={(e) => handleInputChange("lotNumber", e.target.value)}
                error={errors.lotNumber}
                placeholder="e.g., 3CA03C3"
              />
              
              <FormField
                label="Expiration Date"
                required
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                error={errors.expirationDate}
              />
              
              <FormField
                label="Received Date"
                required
                type="date"
                value={formData.receivedDate}
                onChange={(e) => handleInputChange("receivedDate", e.target.value)}
                error={errors.receivedDate}
              />
            </div>
          </Card>

          {/* Quantity & Quality Check */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="CheckCircle" className="h-5 w-5 mr-2" />
              Quality Inspection
            </h2>
            
            <div className="space-y-4">
              <FormField
                label="Quantity Sent"
                type="number"
                min="0"
                value={formData.quantitySent}
                onChange={(e) => handleInputChange("quantitySent", e.target.value)}
                error={errors.quantitySent}
                placeholder="Optional"
              />
              
              <FormField
                label="Quantity Received"
                required
                type="number"
                min="1"
                value={formData.quantityReceived}
                onChange={(e) => handleInputChange("quantityReceived", e.target.value)}
                error={errors.quantityReceived}
                placeholder="Number of doses received"
              />
              
              <FormField
                label="Doses Passed Inspection"
                required
                type="number"
                min="0"
                max={formData.quantityReceived || undefined}
                value={formData.dosesPassed}
                onChange={(e) => handleInputChange("dosesPassed", e.target.value)}
                error={errors.dosesPassed}
                placeholder="Doses that passed quality check"
              />
              
              <FormField
                label="Doses Failed Inspection"
                type="number"
                min="0"
                max={formData.quantityReceived || undefined}
                value={formData.dosesFailed}
                onChange={(e) => handleInputChange("dosesFailed", e.target.value)}
                error={errors.dosesFailed}
                placeholder="Doses that failed quality check"
              />
              
              {parseInt(formData.dosesFailed || 0) > 0 && (
                <FormField
                  label="Discrepancy Reason"
                  required
                  error={errors.discrepancyReason}
                >
                  <Textarea
                    value={formData.discrepancyReason}
                    onChange={(e) => handleInputChange("discrepancyReason", e.target.value)}
                    placeholder="Describe the reason for failed doses..."
                    rows={3}
                  />
                </FormField>
              )}
            </div>
          </Card>
        </div>

        {/* Form Validation Summary */}
        {errors.inspection && (
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center">
              <ApperIcon name="AlertTriangle" className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">{errors.inspection}</p>
            </div>
          </Card>
        )}

        {/* Form Actions */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/inventory")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="inline-flex items-center"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                  Receive Vaccines
                </>
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default ReceiveVaccines;