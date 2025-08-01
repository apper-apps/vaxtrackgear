import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ 
  label, 
  error, 
  required = false, 
  className, 
  children, 
  ...inputProps 
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label variant={required ? "required" : error ? "error" : "default"}>
          {label}
        </Label>
      )}
      {children || <Input variant={error ? "error" : "default"} {...inputProps} />}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;