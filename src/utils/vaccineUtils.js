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