import LocalCard from "@/components/local/LocalCard";
import authOptions from "@/lib/auth";
import { getCoursesByAuthor } from "@/lib/fetchData";
import { getServerSession } from "next-auth";
import React from "react";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const courses = await getCoursesByAuthor({
    title: true,
    description: true,
    id: true,
    image: true,
  });

  return (
    <div>
      <div className="md:h-[70vh] w-full grid place-items-center">
        <div>
          <h1 className="my-10 md:my-0 text-6xl md:text-8xl text-purple-500 font-bold text-center">
            Start your coding
          </h1>
        </div>
      </div>

      <div className="grid gap-6 p-[5%] md:grid-cols-3 mt-6">
        {courses?.map((course) => {
          const { id } = course;
          return <LocalCard key={id} course={course} />;
        })}
      </div>
    </div>
  );
};

export default Home;
