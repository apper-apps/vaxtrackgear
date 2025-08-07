import { toast } from "react-toastify";

export const DatabaseExportService = {
  async exportAllData() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const exportData = {};
      const tableConfigs = [
        {
          name: 'vaccine',
          fields: [
            { field: { Name: "Name" } },
            { field: { Name: "Tags" } },
            { field: { Name: "commercialName" } },
            { field: { Name: "genericName" } },
            { field: { Name: "lotNumber" } },
            { field: { Name: "quantity" } },
            { field: { Name: "expirationDate" } },
            { field: { Name: "receivedDate" } },
            { field: { Name: "quantityOnHand" } },
            { field: { Name: "administeredDoses" } },
            { field: { Name: "editPassword" } },
            { field: { Name: "CreatedOn" } },
            { field: { Name: "ModifiedOn" } }
          ]
        },
        {
          name: 'report',
          fields: [
            { field: { Name: "Name" } },
            { field: { Name: "Tags" } },
            { field: { Name: "reportType" } },
            { field: { Name: "vaccine" } },
            { field: { Name: "organization" } },
            { field: { Name: "CreatedOn" } },
            { field: { Name: "ModifiedOn" } }
          ]
        },
        {
          name: 'databaseStatus',
          fields: [
            { field: { Name: "Name" } },
            { field: { Name: "Tags" } },
            { field: { Name: "status" } },
            { field: { Name: "lastCheckTime" } },
            { field: { Name: "connectionCount" } },
            { field: { Name: "availableStorage" } },
            { field: { Name: "uptime" } },
            { field: { Name: "CreatedOn" } },
            { field: { Name: "ModifiedOn" } }
          ]
        },
        {
          name: 'organization',
          fields: [
            { field: { Name: "Name" } },
            { field: { Name: "Tags" } },
            { field: { Name: "CreatedOn" } },
            { field: { Name: "ModifiedOn" } }
          ]
        },
        {
          name: 'databaseExport_c',
          fields: [
            { field: { Name: "Name" } },
            { field: { Name: "Tags" } },
            { field: { Name: "exportConfigurations_c" } },
            { field: { Name: "lastExportDate_c" } },
            { field: { Name: "CreatedOn" } },
            { field: { Name: "ModifiedOn" } }
          ]
        }
      ];

      // Fetch data from each table
      for (const tableConfig of tableConfigs) {
        try {
          const params = {
            fields: tableConfig.fields,
            orderBy: [
              {
                fieldName: "Id",
                sorttype: "ASC"
              }
            ],
            pagingInfo: {
              limit: 1000,
              offset: 0
            }
          };

          const response = await apperClient.fetchRecords(tableConfig.name, params);

          if (!response.success) {
            console.error(`Error fetching ${tableConfig.name} data:`, response.message);
            exportData[tableConfig.name] = {
              data: [],
              error: response.message,
              count: 0
            };
          } else {
            exportData[tableConfig.name] = {
              data: response.data || [],
              count: response.data?.length || 0,
              success: true
            };
          }
        } catch (error) {
          console.error(`Error fetching ${tableConfig.name} data:`, error.message);
          exportData[tableConfig.name] = {
            data: [],
            error: error.message,
            count: 0
          };
        }
      }

      return {
        success: true,
        data: exportData,
        metadata: {
          exportDate: new Date().toISOString(),
          totalTables: tableConfigs.length,
          exportVersion: "1.0"
        }
      };

    } catch (error) {
      console.error("Error during database export:", error.message);
      toast.error("Failed to export database. Please try again.");
      return {
        success: false,
        error: error.message
      };
    }
  }
};