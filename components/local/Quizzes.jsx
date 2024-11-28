import React from "react";
import Quiz from "./Quiz";

const Quizzes = ({ quiz }) => {
  const { question, id, quizOption } = quiz || {};

  return (
    <div className=" p-6">
      <h3 className="pb-4 text-xl">{question}</h3>
      <div className="  grid md:grid-cols-2 gap-4 md:gap-6">
        {quizOption?.map((option) => (
          <Quiz key={option.id} quizOption={option} questionId={id} />
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
