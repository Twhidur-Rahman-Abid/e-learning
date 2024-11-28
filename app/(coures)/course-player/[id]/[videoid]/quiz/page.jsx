import Quizzes from "@/components/local/Quizzes";
import { Button } from "@/components/ui/button";
import authOptions from "@/lib/auth";
import { getQuizQuestionAndOption } from "@/lib/fetchData";
import { groupBy, groupByQuestionId } from "@/lib/utils";
import { getServerSession } from "next-auth";

import React from "react";

const page = async ({ params }) => {
  const { videoid } = params;
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const quizdata = await getQuizQuestionAndOption({
    where: { videoid: Number(videoid) },
  });

  const submitQuiz = async (formData, quizdata) => {
    "use server";

    const questionIds = quizdata.map((val) => String(val.id));

    const formDataInArrayOfObject = [...formData]
      .map((val) => ({
        name: val[0],
        Value: val[1],
      }))
      .filter(({ name, Value }) => questionIds.includes(name) && Value);

    // const formDataGroup = groupBy(formDataInArrayOfObject, "name");
    const formDataGroup = groupByQuestionId(formDataInArrayOfObject);

    const calculateScore = (data, result) => {
      let correctCount = 0;

      for (const { id, quizOption } of data) {
        const userAnswers = result[id] || [];
        const correctAnswers = quizOption
          .filter((option) => option.isCorrect)
          .map((option) => String(option.id));
        const allOptionIds = quizOption.map((option) => String(option.id));

        // Check if all correct answers are selected
        const hasAllCorrectAnswers = correctAnswers.every((answer) =>
          userAnswers.includes(answer)
        );

        // Check if user selected any incorrect options
        const hasIncorrectAnswers = userAnswers.some(
          (answer) =>
            !correctAnswers.includes(answer) && allOptionIds.includes(answer)
        );

        // If all correct answers are selected and no incorrect answers, count as correct
        if (hasAllCorrectAnswers && !hasIncorrectAnswers) {
          correctCount += 1;
        }
      }

      return correctCount;
    };

    const result = calculateScore(quizdata, formDataGroup);
    console.log(`Number of correct answers: ${result}`);

    const submitQuizMark = await prisma.quizMark.create({
      data: {
        totalMark: result * 5,
        videoId: Number(videoid),
        studnet: {
          connect: { id: userId },
        },
      },
    });

    console.log(submitQuizMark);
  };

  return (
    <div className="p-[5%] pt-10 ">
      <div className="border ">
        <form
          action={async (formData) => {
            "use server";
            submitQuiz(formData, quizdata);
          }}
        >
          {quizdata?.length > 0 &&
            quizdata.map((quiz) => {
              return <Quizzes key={quiz.id} quiz={quiz} />;
            })}

          <Button type="submit" className="ml-6 mt-6 mb-6">
            Submit Quiz
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;
