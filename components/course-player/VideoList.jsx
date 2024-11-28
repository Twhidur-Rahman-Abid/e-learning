import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Play, PlayCircle } from "lucide-react";
import { getVideo } from "@/lib/fetchData";
import Link from "next/link";

const VideoListSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="w-full  p-4 ">
        <Play className="w-28" />
      </Skeleton>
      <Skeleton className="w-full  p-4 ">
        <Play className="w-28" />
      </Skeleton>
      <Skeleton className="w-full  p-4 ">
        <Play className="w-28" />
      </Skeleton>
    </div>
  );
};

const VideoList = async ({ id: courseId }) => {
  const videos = await getVideo(
    { id: true, title: true, courseId: true },
    { courseId: Number(courseId) }
  );

  if (videos?.length === 0) {
    return (
      <Skeleton className="w-full  p-4 ">
        <Play className="w-28" />
        <p>Video list not found!</p>
      </Skeleton>
    );
  }

  return (
    <div className="space-y-4">
      {videos?.map((video) => {
        const { id, title } = video;
        return (
          <Link
            href={{
              pathname: `/course-player/${courseId}`,
              query: { video: id },
            }}
            className="flex items-start  gap-4 border p-2"
            key={id}
          >
            <PlayCircle />
            <div className="">
              <h3 className="text-base font-medium leading-none">{title}</h3>
              <div className="felx">
                <p>1:00 hours</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VideoList;
