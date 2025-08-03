export const getStockStatus = (quantityOnHand, lowStockThreshold = 5) => {
  if (quantityOnHand === 0) return "out-of-stock";
  if (quantityOnHand <= lowStockThreshold) return "low-stock";
  return "in-stock";
};

export const calculateTotalDoses = (vaccines) => {
  return vaccines.reduce((total, vaccine) => total + (vaccine.quantityOnHand || 0), 0);
};

export const calculateAdministeredDoses = (vaccines) => {
  return vaccines.reduce((total, vaccine) => total + (vaccine.administeredDoses || 0), 0);
};

export const getExpiringVaccines = (vaccines, daysThreshold = 30) => {
  const today = new Date();
  const thresholdDate = new Date();
  thresholdDate.setDate(today.getDate() + daysThreshold);
  
  return vaccines.filter(vaccine => {
    if (!vaccine.expirationDate) return false;
    const expDate = new Date(vaccine.expirationDate);
    return expDate > today && expDate <= thresholdDate;
  });
};

export const getExpiredVaccines = (vaccines) => {
  const today = new Date();
  return vaccines.filter(vaccine => {
    if (!vaccine.expirationDate) return false;
    const expDate = new Date(vaccine.expirationDate);
    return expDate < today;
  });
};

export const getLowStockVaccines = (vaccines, threshold = 5) => {
  return vaccines.filter(vaccine => 
    vaccine.quantityOnHand > 0 && vaccine.quantityOnHand <= threshold
  );
};

export const getOutOfStockVaccines = (vaccines) => {
  return vaccines.filter(vaccine => vaccine.quantityOnHand === 0);
};

export const sortVaccines = (vaccines, sortBy, sortOrder = "asc") => {
  return [...vaccines].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle different data types
    if (sortBy === "expirationDate" || sortBy === "receivedDate") {
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
};

export const searchVaccines = (vaccines, searchTerm) => {
  if (!searchTerm.trim()) return [];
  
  const term = searchTerm.toLowerCase();
  return vaccines.filter(vaccine => 
    vaccine.commercialName?.toLowerCase().includes(term) ||
    vaccine.genericName?.toLowerCase().includes(term)
  );
};

export const getUniqueVaccinesByName = (vaccines) => {
  const uniqueMap = new Map();
  
  vaccines.forEach(vaccine => {
    const key = `${vaccine.commercialName}-${vaccine.genericName}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, vaccine);
    }
  });
  
  return Array.from(uniqueMap.values());
};

export const aggregateVaccinesByName = (vaccines) => {
  const aggregatedMap = new Map();
  
  vaccines.forEach(vaccine => {
    const key = `${vaccine.commercialName}-${vaccine.genericName}`;
    
    if (aggregatedMap.has(key)) {
      const existing = aggregatedMap.get(key);
      existing.quantityOnHand += vaccine.quantityOnHand || 0;
      existing.administeredDoses += vaccine.administeredDoses || 0;
    } else {
      aggregatedMap.set(key, {
        commercialName: vaccine.commercialName,
        genericName: vaccine.genericName,
        quantityOnHand: vaccine.quantityOnHand || 0,
        administeredDoses: vaccine.administeredDoses || 0
      });
    }
  });
  
  return Array.from(aggregatedMap.values());
};

export const formatVaccineDisplayName = (vaccine) => {
  return `${vaccine.commercialName} (${vaccine.genericName})`;
};

export const findVaccineByNames = (vaccines, commercialName, genericName) => {
  return vaccines.find(vaccine => 
    vaccine.commercialName?.toLowerCase() === commercialName?.toLowerCase() &&
    vaccine.genericName?.toLowerCase() === genericName?.toLowerCase()
  );
};

export const hasExactMatch = (vaccines, searchTerm) => {
  const term = searchTerm.toLowerCase();
  return vaccines.some(vaccine => 
    vaccine.commercialName?.toLowerCase() === term ||
    vaccine.genericName?.toLowerCase() === term ||
    `${vaccine.commercialName} (${vaccine.genericName})`.toLowerCase() === term
  );
};

export const getSearchSuggestions = (vaccines, searchTerm, limit = 10) => {
  if (!searchTerm.trim()) return [];
  
  const term = searchTerm.toLowerCase();
  const exactMatches = [];
  const partialMatches = [];
  
  vaccines.forEach(vaccine => {
    const commercialName = vaccine.commercialName?.toLowerCase() || '';
    const genericName = vaccine.genericName?.toLowerCase() || '';
    const fullName = `${vaccine.commercialName} (${vaccine.genericName})`.toLowerCase();
    
    if (commercialName === term || genericName === term || fullName === term) {
      exactMatches.push(vaccine);
    } else if (commercialName.includes(term) || genericName.includes(term)) {
      partialMatches.push(vaccine);
    }
  });
  
  return [...exactMatches, ...partialMatches].slice(0, limit);
};