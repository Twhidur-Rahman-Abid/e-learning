import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

const CheckboxGroup = ({ label, labelId, ...props }) => {
  return (
    <div className="flex items-center gap-6 pt-2">
      <Label htmlFor={labelId}>{label}</Label>
      <Checkbox id={labelId} {...props} />
    </div>
  );
};

export default CheckboxGroup;
