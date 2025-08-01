import { format, parseISO, differenceInDays, isAfter, isBefore } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "N/A";
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return format(parsedDate, "MM/dd/yyyy");
  } catch (error) {
    return "Invalid Date";
  }
};

export const getDaysUntilExpiration = (expirationDate) => {
  if (!expirationDate) return null;
  try {
    const expDate = typeof expirationDate === "string" ? parseISO(expirationDate) : expirationDate;
    const today = new Date();
    return differenceInDays(expDate, today);
  } catch (error) {
    return null;
  }
};

export const isExpired = (expirationDate) => {
  if (!expirationDate) return false;
  try {
    const expDate = typeof expirationDate === "string" ? parseISO(expirationDate) : expirationDate;
    const today = new Date();
    return isBefore(expDate, today);
  } catch (error) {
    return false;
  }
};

export const isExpiringSoon = (expirationDate, daysThreshold = 30) => {
  if (!expirationDate) return false;
  try {
    const expDate = typeof expirationDate === "string" ? parseISO(expirationDate) : expirationDate;
    const today = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(today.getDate() + daysThreshold);
    
    return isAfter(expDate, today) && isBefore(expDate, thresholdDate);
  } catch (error) {
    return false;
  }
};

export const getExpirationStatus = (expirationDate) => {
  if (!expirationDate) return "unknown";
  
  if (isExpired(expirationDate)) {
    return "expired";
  } else if (isExpiringSoon(expirationDate, 30)) {
    return "expiring";
  } else {
    return "good";
  }
};