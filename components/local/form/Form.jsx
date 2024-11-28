import { Button } from "@/components/ui/button";
import React from "react";
import SubmitButton from "./SubmitButton";

const Form = ({
  action,
  title = "",

  btnText = "",
  error = "",

  children,
}) => {
  return (
    <div className="grid place-items-center  min-h-[90vh]">
      <div className="border rounded-lg p-6 space-y-4 w-5/6 md:w-1/3 ">
        <h1 className="text-2xl font-bold "> {title}</h1>
        <form action={action} className="  space-y-4">
          {children}
          <SubmitButton btnText={btnText} />
          {/* {error && <Error message={error} />} */}
        </form>
      </div>
    </div>
  );
};

export default Form;
