export class DatabaseStatusService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'databaseStatus';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "status"
            }
          },
          {
            field: {
              Name: "lastCheckTime"
            }
          },
          {
            field: {
              Name: "connectionCount"
            }
          },
          {
            field: {
              Name: "availableStorage"
            }
          },
          {
            field: {
              Name: "uptime"
            }
          },
          {
            field: {
              Name: "CreatedOn"
            }
          },
          {
            field: {
              Name: "ModifiedOn"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "ModifiedOn",
            sorttype: "DESC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching database status:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching database status:", error.message);
        throw error;
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "status"
            }
          },
          {
            field: {
              Name: "lastCheckTime"
            }
          },
          {
            field: {
              Name: "connectionCount"
            }
          },
          {
            field: {
              Name: "availableStorage"
            }
          },
          {
            field: {
              Name: "uptime"
            }
          },
          {
            field: {
              Name: "CreatedOn"
            }
          },
          {
            field: {
              Name: "ModifiedOn"
            }
          }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching database status with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching database status with ID ${id}:`, error.message);
        throw error;
      }
    }
  }

  async create(data) {
    try {
      // Only include updateable fields
      const params = {
        records: [
          {
            Name: data.Name || "Database Status",
            status: data.status || "Unknown",
            lastCheckTime: data.lastCheckTime || new Date().toISOString(),
            connectionCount: parseInt(data.connectionCount) || 0,
            availableStorage: parseInt(data.availableStorage) || 0,
            uptime: data.uptime || "0 minutes"
          }
        ]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create database status ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating database status:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating database status:", error.message);
        throw error;
      }
    }
  }

  async update(id, data) {
    try {
      // Only include updateable fields
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: data.Name,
            status: data.status,
            lastCheckTime: data.lastCheckTime,
            connectionCount: data.connectionCount ? parseInt(data.connectionCount) : undefined,
            availableStorage: data.availableStorage ? parseInt(data.availableStorage) : undefined,
            uptime: data.uptime
          }
        ]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update database status ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating database status:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating database status:", error.message);
        throw error;
      }
    }
  }

  async delete(recordIds) {
    try {
      const params = {
        RecordIds: Array.isArray(recordIds) ? recordIds : [recordIds]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete database status ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulDeletions.length === params.RecordIds.length;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting database status:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting database status:", error.message);
        throw error;
      }
    }
  }
}

// Export singleton instance
export const databaseStatusService = new DatabaseStatusService();