import CourseSelect from "@/components/local/CourseSelect";
import CheckboxGroup from "@/components/local/form/CheckboxGroup";
import Form from "@/components/local/form/Form";
import InputGroup from "@/components/local/form/InputGroup";
import SelectGroup from "@/components/local/form/SelectGroup";
import { routes } from "@/constents/routes";
import prisma from "@/lib/db";
import {
  getCoursesByAuthor,
  getSelectedItemId,
  getVideo,
} from "@/lib/fetchData";
import { selectItems } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const QuizPage = async ({ searchParams }) => {
  const { tQuiz } = routes;

  const courses = await getCoursesByAuthor();
  const selectCourseItems = selectItems(courses);
  const selectedCourse = searchParams.course;
  const selectedCourseId = getSelectedItemId(selectCourseItems, selectedCourse);

  const videos = await getVideo(
    { id: true, title: true },
    { courseId: selectedCourseId }
  );

  const selectVideoItems = selectItems(videos);

  const createQuiz = async (formData) => {
    "use server";

    const video = formData.get("video");
    const videoId = getSelectedItemId(selectVideoItems, video);

    const question = formData.get("question");

    const optionOne = formData.get("optionOne");
    const isCorrectOne = formData.get("isCorrectOne");

    const optionTwo = formData.get("optionTwo");
    const isCorrectTwo = formData.get("isCorrectTwo");

    const optionThree = formData.get("optionThree");
    const isCorrectThree = formData.get("isCorrectThree");

    const optionFour = formData.get("optionFour");
    const isCorrectFour = formData.get("isCorrectFour");

    const crateQuiz = await prisma.quiz.create({
      data: {
        question: question,
        video: {
          connect: { id: videoId },
        },
        quizOption: {
          create: [
            {
              option: optionOne,
              isCorrect: Boolean(isCorrectOne),
            },
            {
              option: optionTwo,
              isCorrect: Boolean(isCorrectTwo),
            },
            {
              option: optionThree,
              isCorrect: Boolean(isCorrectThree),
            },
            {
              option: optionFour,
              isCorrect: Boolean(isCorrectFour),
            },
          ],
        },
      },
    });

    if (crateQuiz) {
      revalidatePath(tQuiz);
      redirect(tQuiz);
    }
  };

  return (
    <Form title="Create quiz" btnText="Create quiz" action={createQuiz}>
      <div className="flex gap-4">
        <CourseSelect
          selectItems={selectCourseItems}
          placeholder="Select Course"
          label="Select Course"
        />
        <SelectGroup
          label="Select video"
          placeholder="Select Video"
          selectItems={selectVideoItems}
          name="video"
        />
      </div>
      <InputGroup
        label="Question"
        placeholder="Quiz Question"
        name="question"
      />

      <div className="grid grid-cols-2 gap-6">
        <div className="">
          <InputGroup label="Option" placeholder="option 1" name="optionOne" />
          <CheckboxGroup
            label="Is correct"
            labelId="isC1"
            name="isCorrectOne"
          />
        </div>

        <div className="">
          <InputGroup label="Option" placeholder="option 2" name="optionTwo" />
          <CheckboxGroup
            label="Is correct"
            labelId="isC2"
            name="isCorrectTwo"
          />
        </div>
        <div className="">
          <InputGroup
            label="Option"
            placeholder="option 3"
            name="optionThree"
          />
          <CheckboxGroup
            label="Is correct"
            labelId="isC3"
            name="isCorrectThree"
          />
        </div>
        <div className="">
          <InputGroup label="Option" placeholder="option 4" name="optionFour" />
          <CheckboxGroup
            label="Is correct"
            labelId="isC1"
            name="isCorrectFour"
          />
        </div>
      </div>
    </Form>
  );
};

export default QuizPage;
