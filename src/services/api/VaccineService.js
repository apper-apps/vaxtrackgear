import { toast } from "react-toastify";

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
          { field: { Name: "commercialName" } },
          { field: { Name: "genericName" } },
          { field: { Name: "lotNumber" } },
          { field: { Name: "quantity" } },
          { field: { Name: "expirationDate" } },
          { field: { Name: "receivedDate" } },
          { field: { Name: "quantityOnHand" } },
          { field: { Name: "administeredDoses" } }
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

      const response = await apperClient.fetchRecords("vaccine", params);

      if (!response.success) {
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
          { field: { Name: "commercialName" } },
          { field: { Name: "genericName" } },
          { field: { Name: "lotNumber" } },
          { field: { Name: "quantity" } },
          { field: { Name: "expirationDate" } },
          { field: { Name: "receivedDate" } },
          { field: { Name: "quantityOnHand" } },
          { field: { Name: "administeredDoses" } }
        ]
      };

      const response = await apperClient.getRecordById("vaccine", parseInt(id), params);

      if (!response.success) {
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
        commercialName: vaccineData.commercialName,
        genericName: vaccineData.genericName,
        lotNumber: vaccineData.lotNumber,
        quantity: parseInt(vaccineData.quantity),
        expirationDate: vaccineData.expirationDate,
        receivedDate: vaccineData.receivedDate,
        quantityOnHand: parseInt(vaccineData.quantityOnHand),
        administeredDoses: parseInt(vaccineData.administeredDoses || 0)
      };

      const params = {
        records: [createData]
      };

      const response = await apperClient.createRecord("vaccine", params);

      if (!response.success) {
        console.error("Error creating vaccine:", response.message);
        toast.error(response.message);
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

      // Only include Updateable fields for update operation
      const updateData = {
        Id: parseInt(id),
        ...(updatedData.commercialName !== undefined && { commercialName: updatedData.commercialName }),
        ...(updatedData.genericName !== undefined && { genericName: updatedData.genericName }),
        ...(updatedData.lotNumber !== undefined && { lotNumber: updatedData.lotNumber }),
        ...(updatedData.quantity !== undefined && { quantity: parseInt(updatedData.quantity) }),
        ...(updatedData.expirationDate !== undefined && { expirationDate: updatedData.expirationDate }),
        ...(updatedData.receivedDate !== undefined && { receivedDate: updatedData.receivedDate }),
        ...(updatedData.quantityOnHand !== undefined && { quantityOnHand: parseInt(updatedData.quantityOnHand) }),
        ...(updatedData.administeredDoses !== undefined && { administeredDoses: parseInt(updatedData.administeredDoses) })
      };

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord("vaccine", params);

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

      const response = await apperClient.deleteRecord("vaccine", params);

      if (!response.success) {
        console.error(`Error deleting vaccine with ID ${id}:`, response.message);
        toast.error(response.message);
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
          { field: { Name: "commercialName" } },
          { field: { Name: "genericName" } },
          { field: { Name: "quantityOnHand" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "commercialName",
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
                    fieldName: "genericName",
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
            fieldName: "commercialName",
            sorttype: "ASC"
          }
        ],
        pagingInfo: {
          limit: 20,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords("vaccine", params);

      if (!response.success) {
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