import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";

const AuthInputGroup = ({
  label = "",
  type = "text",
  placeholder = "",
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name={label.toLocaleLowerCase()}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AuthInputGroup;
