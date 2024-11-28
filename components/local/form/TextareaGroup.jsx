import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";

const TextareaGroup = ({ label, placeholder, ...props }) => {
  return (
    <div className="">
      <Label htmlFor={label}>{label}</Label>
      <Textarea placeholder={placeholder} {...props} />
    </div>
  );
};

export default TextareaGroup;
