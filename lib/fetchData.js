import { getServerSession } from "next-auth";
import prisma from "./db";

const session = getServerSession();
const userId = session?.user?.id;

// get user
export const getUser = async (email) => {
  const user = await prisma.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

// Upload Image in CLOUDNARY
export const uploadImage = async (image) => {
  const img = new FormData();
  img.append("file", image);
  img.append("cloud_name", "df18dcdbp");
  img.append("upload_preset", "nldbvr4j");

  const res = await fetch(process.env.CLOUDINARY_IMAGE_API, {
    method: "post",
    body: img,
  });

  const imgData = await res.json();
  const imgUrl = imgData.url.toString();

  return imgUrl;
};

// Upload video in CLO
export const uploadVideo = async (video) => {
  const vid = new FormData();
  vid.append("file", video);
  vid.append("cloud_name", "df18dcdbp");
  vid.append("upload_preset", "nldbvr4j");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/df18dcdbp/video/upload",
    {
      method: "post",
      body: vid,
    }
  );

  const videoRes = await res.json();
  const videoUrl = videoRes?.url?.toString();
  return videoUrl;
};

// get courses
export const getCoursesByAuthor = async (
  select = { id: true, title: true }
) => {
  const res = await prisma.course.findMany({
    select: {
      ...select,
    },
    where: {
      authorId: userId,
    },
  });
  return res;
};

export const getCourse = async (param = {}) => {
  let res;

  if (param?.where) {
    res = await prisma.course.findMany({
      select: {
        ...(param?.select ?? {
          id: true,
          title: true,
        }),
      },
      where: {
        ...param?.where,
      },
    });
    return res;
  }

  res = await prisma.course.findMany({
    select: {
      ...(param?.select ?? {
        id: true,
        title: true,
      }),
    },
  });
  return res;
};

export const getVideo = async (select = { id: true, title: true }, where) => {
  let res;

  if (where) {
    res = await prisma.video.findMany({
      select: {
        ...select,
      },
      where: {
        ...where,
      },
    });

    return res;
  }
  res = await prisma.video.findMany({
    select: {
      ...select,
    },
  });

  return res;
};

export const getCourseByIdCourseId = async (id) => {
  const res = await prisma.course.findUnique({
    where: {
      id: id,
    },
  });
  return res;
};

export const getCouraseWithVideo = async (
  Cselect = {},
  vSelect = {
    id: true,
    title: true,
    description: true,
    url: true,
    courseId: true,
    course: true,
    assignment: true,
  },
  where = {}
) => {
  const res = await prisma.course.findMany({
    where: {
      autherId: userId,
      ...where,
      video: {
        some: {
          title: {
            gt: "0",
          },
        },
      },
    },
    select: {
      ...Cselect,
      video: {
        select: {
          ...vSelect,
        },
      },
    },
  });
  return res;
};

// get video by author
export const getVideosByAuthor = async () => {
  const res = await prisma.video.findMany({
    where: {
      authorId: userId,
    },
  });
  return res;
};

// Get selected item id
export const getSelectedItemId = (items = [], select) => {
  return items.filter((item) => item.value === select)[0]?.id;
};

// get assignmet with video title and course title
export const getAssignmentsWithVideoAndCourse = async () => {
  const assignments = await prisma.assignment.findMany({
    include: {
      video: {
        select: {
          title: true,
          course: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  return assignments;
};

export const getQuezzes = async () => {
  const data = await prisma.course.findMany({
    where: {
      video: {
        some: {
          quiz: {
            some: {},
          },
        },
      },
    },
    select: {
      title: true,
      video: {
        where: {
          quiz: {
            some: {},
          },
        },
        select: {
          title: true,
          quiz: {
            select: {
              question: true,
            },
          },
        },
      },
    },
  });
  return data;
};

export const getQuizQuestionAndOption = async ({ where, select }) => {
  const { videoid } = where;

  const quizzes = await prisma.quiz.findMany({
    where: {
      videoId: videoid, // Replace videoId with the actual ID you want to query
    },
    include: {
      quizOption: true,
    },
  });

  return quizzes;
};
