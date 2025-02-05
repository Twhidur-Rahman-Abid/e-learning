import VideoList from "@/components/course-player/VideoList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import authOptions from "@/lib/auth";
import { getVideo } from "@/lib/fetchData";
import { VideoOff } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const CoursePlayerPage = async ({ params, searchParams }) => {
  const { id } = params;

  const { video: searchVideo } = searchParams;

  const session = await getServerSession(authOptions);
  const { id: userId } = session?.user;

  let getVideo;
  // If have searchVideo then fetch video based on searchVideo
  // Otherwise fetch first video based on course
  if (!searchVideo) {
    getVideo = await prisma.video.findFirst({
      where: {
        courseId: Number(id), // Replace courseId with the actual Course id you're querying
      },
      orderBy: {
        id: "asc",
      },
      include: {
        quiz: {
          select: {
            id: true,
          },
        },
      },
    });
  } else {
    getVideo = await prisma.video.findFirst({
      where: {
        id: Number(searchVideo), // Replace courseId with the actual Course id you're querying
      },
      orderBy: {
        id: "asc",
      },
      include: {
        quiz: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  const { id: videoId, title, description, url, quiz } = getVideo || {};

  let videoContent = (
    <Skeleton className="w-full h-52 md:h-96 grid place-items-center">
      <div>
        <VideoOff className="w-28" size="48" />
        <p>Video not found!</p>
      </div>
    </Skeleton>
  );

  // Check the user is submitted quiz
  // const isSubmitedQuiz = await prisma.quizMark.findFirst({
  //   where: {
  //     videoId: Number(videoId),
  //     studentId: Number(userId),
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  let quizButton;
  // if (quiz?.length > 0) {
  //   if (isSubmitedQuiz) {
  //     quizButton = <Button className="bg-purple-400">Quiz Submitted</Button>;
  //   } else {
  //     quizButton = (
  //       <Link href={`/course-player/${id}/${videoId}/quiz`}>
  //         <Button>Quiz</Button>
  //       </Link>
  //     );
  //   }
  // } else {
  //   quizButton = <h1>This video has no quizzes</h1>;
  // }

  return (
    <div className="p-[5%] mt-6">
      <div className="md:flex gap-6 space-y-6 md:space-y-0">
        <div className="basis-3/5 space-y-4">
          {/* video */}
          {url ? (
            <video className="w-full" controls download={false}>
              <source src={url} />
              <p>Your browser does not support HTML video</p>
            </video>
          ) : (
            <div>not found</div>
          )}

          <div className="flex justify-between ">
            <Button>Assignment</Button>

            {quizButton}
          </div>

          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="w-full">{description}</p>
        </div>
        <div className="basis-2/5">
          <div className=" border p-4 h-60 overflow-y-auto">
            <VideoList id={id} />
          </div>
          {/* <Deshboard userId={userId} /> */}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;
