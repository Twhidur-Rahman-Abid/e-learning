import CourseSelect from "@/components/local/CourseSelect";
import Form from "@/components/local/form/Form";
import InputGroup from "@/components/local/form/InputGroup";
import SelectGroup from "@/components/local/form/SelectGroup";
import TextareaGroup from "@/components/local/form/TextareaGroup";
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

const page = async ({ searchParams }) => {
  const { tAssignment } = routes;
  const courses = await getCoursesByAuthor();
  const selectCourseItems = selectItems(courses);
  const selectedCourse = await searchParams.course;
  const selectedCourseId = getSelectedItemId(selectCourseItems, selectedCourse);

  const videos = await getVideo(
    { id: true, title: true },
    { courseId: selectedCourseId, assignment: null }
  );

  const selectVideoItems = selectItems(videos);

  const createAssignment = async (formData) => {
    "use server";

    const video = formData.get("video");
    const title = formData.get("title");
    const description = formData.get("description");
    const totalMark = Number(formData.get("totalMark"));

    const videoId = getSelectedItemId(selectVideoItems, video);

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        totalMark,
        video: {
          connect: { id: videoId },
        },
      },
    });

    if (assignment) {
      revalidatePath(tAssignment);
      redirect(tAssignment);
    }
  };
  return (
    <Form
      title="Create Assignment"
      btnText="Create Assignment"
      action={createAssignment}
    >
      <div className="flex gap-4">
        <CourseSelect
          label="Select course"
          placeholder={"Select course"}
          selectItems={selectCourseItems}
        />
        <SelectGroup
          label="Select video"
          placeholder={"Select video"}
          selectItems={selectVideoItems}
          name="video"
          required={true}
        />
      </div>
      <InputGroup
        label="Title"
        placeholder="Assignment title"
        name="title"
        required={true}
      />
      <InputGroup
        label="Total mark"
        type="number"
        placeholder="100"
        name="totalMark"
      />
      <TextareaGroup
        label="Description"
        placeholder="Type course description"
        name="description"
      />
    </Form>
  );
};

export default page;
