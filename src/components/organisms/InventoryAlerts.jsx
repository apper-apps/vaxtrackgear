import React from "react";
import { cn } from "@/utils/cn";
import AlertBanner from "@/components/molecules/AlertBanner";
import { 
  getExpiringVaccines, 
  getExpiredVaccines, 
  getLowStockVaccines,
  getOutOfStockVaccines 
} from "@/utils/vaccineUtils";

const InventoryAlerts = ({ vaccines = [], className }) => {
  const expiringSoon = getExpiringVaccines(vaccines, 30);
  const expired = getExpiredVaccines(vaccines);
  const lowStock = getLowStockVaccines(vaccines, 5);
  const outOfStock = getOutOfStockVaccines(vaccines);

  return (
    <div className={cn("space-y-4", className)}>
      {expired.length > 0 && (
        <AlertBanner
          title="Expired Vaccines"
          message={`${expired.length} vaccine lot${expired.length !== 1 ? "s have" : " has"} expired and should be removed from inventory.`}
          severity="error"
          items={expired}
        />
      )}
      
      {expiringSoon.length > 0 && (
        <AlertBanner
          title="Vaccines Expiring Soon"
          message={`${expiringSoon.length} vaccine lot${expiringSoon.length !== 1 ? "s expire" : " expires"} within the next 30 days.`}
          severity="warning"
          items={expiringSoon}
        />
      )}
      
      {outOfStock.length > 0 && (
        <AlertBanner
          title="Out of Stock Vaccines"
          message={`${outOfStock.length} vaccine${outOfStock.length !== 1 ? "s are" : " is"} currently out of stock.`}
          severity="error"
          items={outOfStock}
        />
      )}
      
      {lowStock.length > 0 && (
        <AlertBanner
          title="Low Stock Alert"
          message={`${lowStock.length} vaccine${lowStock.length !== 1 ? "s have" : " has"} low stock levels (≤5 doses).`}
          severity="warning"
          items={lowStock}
        />
      )}
    </div>
  );
};

export default InventoryAlerts;