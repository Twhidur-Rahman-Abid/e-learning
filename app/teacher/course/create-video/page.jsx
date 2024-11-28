import Form from "@/components/local/form/Form";
import InputGroup from "@/components/local/form/InputGroup";
import SelectGroup from "@/components/local/form/SelectGroup";
import TextareaGroup from "@/components/local/form/TextareaGroup";
import { routes } from "@/constents/routes";
import {
  getCoursesByAuthor,
  getSelectedItemId,
  uploadVideo,
} from "@/lib/fetchData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const CreateVideoPage = async () => {
  const { tVideo } = routes;
  const courses = await getCoursesByAuthor();
  const selectItems = courses?.map((course) => ({
    id: course.id,
    value: course.title,
  }));

  const createVidoe = async (formData) => {
    "use server";
    const courseTitle = formData.get("course");
    const title = formData.get("title");
    const description = formData.get("description");
    const video = formData.get("video");
    const courseId = getSelectedItemId(selectItems, courseTitle);

    const videoUrl = await uploadVideo(video);

   
    const videoUploadInDB = await prisma.video.create({
      data: {
        title,
        description,
        url: videoUrl,
        course: {
          connect: { id: courseId },
        },
      },
    });

    if (videoUploadInDB) {
      revalidatePath(tVideo);
      redirect(tVideo);
    }
  };

  return (
    <Form title="Create video" btnText="Create video" action={createVidoe}>
      <SelectGroup
        label="Select course"
        placeholder={"Select course"}
        name="course"
        selectItems={selectItems}
      />

      <InputGroup label="Title" placeholder="Video title" name="title" />
      <TextareaGroup
        label="Description"
        placeholder="Type course description"
        name="description"
      />
      <InputGroup label="Video" type="file" accept="video/*" name="video" />
    </Form>
  );
};

export default CreateVideoPage;
