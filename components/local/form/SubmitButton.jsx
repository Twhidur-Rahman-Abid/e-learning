"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ btnText }) => {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button type="submit" disabled={pending} className="mt-6 w-full">
        <Loader2Icon /> {btnText}
      </Button>
    );
  } else {
    return (
      <Button type="submit" className="mt-6 w-full">
        {btnText}
      </Button>
    );
  }
};

export default SubmitButton;
