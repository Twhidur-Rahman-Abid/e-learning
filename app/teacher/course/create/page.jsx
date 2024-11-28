import Form from "@/components/local/form/Form";
import InputGroup from "@/components/local/form/InputGroup";
import TextareaGroup from "@/components/local/form/TextareaGroup";
import { routes } from "@/constents/routes";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { uploadImage } from "@/lib/fetchData";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const CourseCreate = async () => {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const { tCourse } = routes;

  const crateCourse = async (formData) => {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const price = Number(formData.get("price"));

    const imageUrl = await uploadImage(image);

    const course = await prisma.course.create({
      data: {
        title,
        description,
        image: imageUrl,
        price,
        author: {
          connect: { id: userId },
        },
      },
    });

    if (course) {
      revalidatePath(tCourse);
      redirect(tCourse);
    }
  };

  const btnText = "Create Course";
  return (
    <Form title="Create course" btnText={btnText} action={crateCourse}>
      <InputGroup label="Title" placeholder="Enter course title" name="title" />

      <TextareaGroup
        label="Description"
        placeholder="Type course description"
        name="description"
      />
      <InputGroup label="Price" placeholder="200" type="number" name="price" />
      <InputGroup
        label="Image"
        type="file"
        name="image"
        accept="image/png, image/jpg,image/JPG, image/jpeg, image/webp"
        //   onChange={(e) => setImage(e.target.files[0])}
      />
    </Form>
  );
};

export default CourseCreate;
