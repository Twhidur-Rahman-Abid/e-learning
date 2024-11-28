import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

const SelectGroup = ({ label, selectItems = [], placeholder, ...props }) => {
  return (
    <div className="w-full">
      <Label htmlFor="title">{label} </Label>
      <Select {...props}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((selectItem) => (
            <SelectItem
              value={selectItem.value}
              data={{ id: selectItem.id, value: selectItem.value }}
              key={selectItem.id}
              className="space-y-2"
            >
              {selectItem.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectGroup;
