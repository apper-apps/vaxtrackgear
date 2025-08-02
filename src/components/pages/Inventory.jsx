import React, { useState, useEffect } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import VaccineTable from "@/components/organisms/VaccineTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { VaccineService } from "@/services/api/VaccineService";

const Inventory = () => {
  const [vaccines, setVaccines] = useState([]);
  const [filteredVaccines, setFilteredVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadVaccines = async () => {
    setLoading(true);
    setError("");
    
try {
      const data = await VaccineService.getAll();
      // Filter out vaccines with zero quantity on hand
      const filterVaccinesWithStock = (vaccines) => vaccines.filter(vaccine => vaccine.quantityOnHand > 0);
      const vaccinesWithStock = filterVaccinesWithStock(data);
      setVaccines(vaccinesWithStock);
      setFilteredVaccines(vaccinesWithStock);
    } catch (err) {
      setError("Failed to load vaccine inventory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term) {
      setFilteredVaccines(vaccines);
      return;
    }
    
    const filtered = vaccines.filter(vaccine => 
      vaccine.commercialName?.toLowerCase().includes(term) ||
      vaccine.genericName?.toLowerCase().includes(term) ||
      vaccine.lotNumber?.toLowerCase().includes(term)
    );
    
    setFilteredVaccines(filtered);
  };

  const handleUpdateVaccine = async (updatedVaccine) => {
try {
      await VaccineService.update(updatedVaccine.Id, updatedVaccine);
      
      const updatedVaccines = vaccines.map(vaccine => 
        vaccine.Id === updatedVaccine.Id ? updatedVaccine : vaccine
      );
      
      // Filter out vaccines with zero quantity on hand
      const filterVaccinesWithStock = (vaccines) => vaccines.filter(vaccine => vaccine.quantityOnHand > 0);
      const vaccinesWithStock = filterVaccinesWithStock(updatedVaccines);
      
      setVaccines(vaccinesWithStock);
      setFilteredVaccines(
        searchTerm ? 
        vaccinesWithStock.filter(vaccine => 
          vaccine.commercialName?.toLowerCase().includes(searchTerm) ||
          vaccine.genericName?.toLowerCase().includes(searchTerm) ||
          vaccine.lotNumber?.toLowerCase().includes(searchTerm)
        ) : vaccinesWithStock
      );
    } catch (err) {
      setError("Failed to update vaccine. Please try again.");
    }
  };

  useEffect(() => {
    loadVaccines();
  }, []);

  if (loading) {
    return <Loading rows={8} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadVaccines} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vaccine Inventory</h1>
          <p className="text-gray-600">Manage and monitor your vaccine stock levels</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <SearchBar
            placeholder="Search vaccines, generic names, or lot numbers..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-80"
          />
        </div>
      </div>

      {/* Inventory Table */}
      {filteredVaccines.length === 0 && !loading ? (
        <Empty
          title="No vaccines found"
          message={searchTerm ? "No vaccines match your search criteria." : "No vaccine inventory data is available."}
          icon="Package"
          actionLabel="Clear Search"
          onAction={() => {
            setSearchTerm("");
            setFilteredVaccines(vaccines);
          }}
        />
      ) : (
<VaccineTable 
          vaccines={filteredVaccines} 
          onUpdateVaccine={handleUpdateVaccine}
          showAdministration={false}
        />
      )}
    </div>
  );
};

export default Inventory;