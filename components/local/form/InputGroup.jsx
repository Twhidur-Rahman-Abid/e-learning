import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const InputGroup = ({
  label = "",
  type = "text",
  placeholder = "",
  ...props
}) => {
  return (
    <div className="">
      <Label htmlFor={label}>{label}</Label>
      <Input
        className="w-full"
        type={type}
        id={label}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputGroup;
