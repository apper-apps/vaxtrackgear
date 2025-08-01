import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const TableHeader = ({ 
  columns, 
  sortBy, 
  sortOrder, 
  onSort, 
  className 
}) => {
  const handleSort = (column) => {
    if (!column.sortable) return;
    
    if (sortBy === column.key) {
      onSort(column.key, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSort(column.key, "asc");
    }
  };

  return (
    <thead className={cn("bg-gray-50", className)}>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              column.sortable && "cursor-pointer hover:bg-gray-100 select-none"
            )}
            onClick={() => handleSort(column)}
          >
            <div className="flex items-center space-x-1">
              <span>{column.label}</span>
              {column.sortable && (
                <div className="flex flex-col">
                  <ApperIcon 
                    name="ChevronUp" 
                    className={cn(
                      "h-3 w-3",
                      sortBy === column.key && sortOrder === "asc" 
                        ? "text-primary-600" 
                        : "text-gray-400"
                    )} 
                  />
                  <ApperIcon 
                    name="ChevronDown" 
                    className={cn(
                      "h-3 w-3 -mt-1",
                      sortBy === column.key && sortOrder === "desc" 
                        ? "text-primary-600" 
                        : "text-gray-400"
                    )} 
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;