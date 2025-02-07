/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import SelectGroup from "./form/SelectGroup";
import { useRouter } from "next/navigation";

const CourseSelect = ({
  selectItems,
  search = "course",
  placeholder,
  label,
}) => {
  const [selecet, setSelect] = useState();
  const router = useRouter();
  const onChange = (value) => {
    setSelect(value);
  };

  useEffect(() => {
    if (selecet) {
      router.push(`${window.location.pathname}?${search}=${selecet}`);
    }
  }, [selecet]);
  return (
    <SelectGroup
      selectItems={selectItems}
      onValueChange={onChange}
      label={label}
      placeholder={placeholder}
    />
  );
};

export default CourseSelect;
