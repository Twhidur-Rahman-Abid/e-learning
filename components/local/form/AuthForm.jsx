"use client";
import { Button } from "@/components/ui/button";
import { ShadcnForm } from "@/components/ui/form";
import React from "react";

const AuthForm = ({
  title = "",
  onSubmit = () => {},
  btnText = "",
  error = "",
  isLoading = false,
  children,
  form,
}) => {
  return (
    <div className="grid place-items-center min-h-[90vh]">
      <div className="border rounded-lg p-6 space-y-4 w-5/6 md:w-1/3 ">
        <h1 className="text-2xl font-bold "> {title}</h1>
        <ShadcnForm {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {children}
            <Button type="submit" disabled={isLoading} className="mt-6 w-full">
              {btnText}
            </Button>
            {/* {error && <Error message={error} />} */}
          </form>
        </ShadcnForm>
      </div>
    </div>
  );
};

export default AuthForm;
