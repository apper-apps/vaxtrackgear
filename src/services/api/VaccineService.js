import { toast } from "react-toastify";
import React from "react";

export const VaccineService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "commercialName_c" } },
          { field: { Name: "genericName_c" } },
          { field: { Name: "lotNumber_c" } },
          { field: { Name: "quantity_c" } },
          { field: { Name: "expirationDate_c" } },
          { field: { Name: "receivedDate_c" } },
          { field: { Name: "quantityOnHand_c" } },
          { field: { Name: "administeredDoses_c" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "ASC"
          }
        ],
pagingInfo: {
          limit: 100,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords("vaccine_c", params);
      if (!response || !response.data || response.data.length === 0) {
        console.error("Error fetching vaccines:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching vaccines:", error?.response?.data?.message);
      } else {
        console.error("Error fetching vaccines:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
{ field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "commercialName_c" } },
          { field: { Name: "genericName_c" } },
          { field: { Name: "lotNumber_c" } },
          { field: { Name: "quantity_c" } },
          { field: { Name: "expirationDate_c" } },
          { field: { Name: "receivedDate_c" } },
          { field: { Name: "quantityOnHand_c" } },
          { field: { Name: "administeredDoses_c" } }
]
      };
      
      const response = await apperClient.getRecordById("vaccine_c", parseInt(id), params);
      if (!response || !response.data) {
        console.error(`Error fetching vaccine with ID ${id}:`, response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching vaccine with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching vaccine with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async create(vaccineData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields for create operation
      const createData = {
commercialName_c: vaccineData.commercialName,
        genericName_c: vaccineData.genericName,
        lotNumber_c: vaccineData.lotNumber,
        quantity_c: parseInt(vaccineData.quantity),
        expirationDate_c: vaccineData.expirationDate,
        receivedDate_c: vaccineData.receivedDate,
        quantityOnHand_c: parseInt(vaccineData.quantityOnHand),
        administeredDoses_c: parseInt(vaccineData.administeredDoses || 0)
      };

const params = {
        records: [createData]
      };
      
      const response = await apperClient.createRecord("vaccine_c", params);
      
      // Handle response
      if (!response || !response.success) {
        console.error("Error creating vaccine:", response?.message || "Unknown error");
        toast.error(response?.message || "Failed to create vaccine");
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create vaccine ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating vaccine:", error?.response?.data?.message);
      } else {
        console.error("Error creating vaccine:", error.message);
      }
      return null;
    }
  },

  async update(id, updatedData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

// Only include fields that are being updated
const updateData = {
        Id: parseInt(id),
        ...(updatedData.commercialName !== undefined && { commercialName_c: updatedData.commercialName }),
        ...(updatedData.genericName !== undefined && { genericName_c: updatedData.genericName }),
        ...(updatedData.lotNumber !== undefined && { lotNumber_c: updatedData.lotNumber }),
        ...(updatedData.quantity !== undefined && { quantity_c: parseInt(updatedData.quantity) }),
        ...(updatedData.expirationDate !== undefined && { expirationDate_c: updatedData.expirationDate }),
        ...(updatedData.receivedDate !== undefined && { receivedDate_c: updatedData.receivedDate }),
        ...(updatedData.quantityOnHand !== undefined && { quantityOnHand_c: parseInt(updatedData.quantityOnHand) }),
        ...(updatedData.administeredDoses !== undefined && { administeredDoses_c: parseInt(updatedData.administeredDoses) })
      };

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("vaccine_c", params);

      if (!response.success) {
        console.error(`Error updating vaccine with ID ${id}:`, response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update vaccine ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error updating vaccine with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error updating vaccine with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("vaccine_c", params);
      
      // Handle response
      if (!response || !response.success) {
        console.error(`Error deleting vaccine with ID ${id}:`, response?.message || "Unknown error");
        toast.error(response?.message || "Failed to delete vaccine");
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete vaccine ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error deleting vaccine with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error deleting vaccine with ID ${id}:`, error.message);
      }
      return false;
}
  },

  async searchByName(searchTerm) {
    try {
      if (!searchTerm || !searchTerm.trim()) {
        return [];
      }

      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
{ field: { Name: "Name" } },
          { field: { Name: "commercialName_c" } },
          { field: { Name: "genericName_c" } },
          { field: { Name: "quantityOnHand_c" } }
        ],
        where: [
{
            FieldName: "commercialName_c",
            Operator: "Contains",
            Values: [searchTerm],
            Include: true
          }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "commercialName_c",
                    operator: "Contains",
                    subOperator: "",
                    values: [searchTerm]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "genericName_c",
                    operator: "Contains",
                    subOperator: "",
                    values: [searchTerm]
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ],
        orderBy: [
          {
fieldName: "commercialName_c",
            sorttype: "ASC"
          }
        ],
        pagingInfo: {
          limit: 20,
          offset: 0
}
      };
      
      const response = await apperClient.fetchRecords("vaccine_c", params);
      if (!response || !response.data || response.data.length === 0) {
        console.error("Error searching vaccines:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching vaccines:", error?.response?.data?.message);
      } else {
        console.error("Error searching vaccines:", error.message);
      }
      return [];
    }
  }
};