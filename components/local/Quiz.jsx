import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const Quiz = ({ quizOption, questionId }) => {
  const { option, id } = quizOption;

  return (
    <div className="relative grid justify-items-center items-center  h-10">
      <Label
        htmlFor={option + questionId}
        name={questionId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-6 text-black z-30 cursor-pointer"
      >
        {option}
      </Label>
      <Checkbox
        className="absolute left-0 top-0 w-full h-full z-20 data-[state=checked]:bg-purple-400"
        checkIcon={false}
        name={questionId}
        value={id}
        id={option + questionId}
      />
    </div>
  );
};

export default Quiz;
