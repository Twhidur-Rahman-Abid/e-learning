import Link from "next/link";

// Import Image
import videoImg from "/public/assets/video.png";
import courseImg from "/public/assets/couse.png";
import assignmentImg from "/public/assets/assignment.png";
import quizImg from "/public/assets/quiz.png";
import Image from "next/image";

// Import other
import { routes } from "@/constents/routes";
import { cn } from "@/lib/utils";
const Card = ({ classes = "", title = "", img, url }) => {
  return (
    <Link
      href={url}
      className={`w-full flex items-center justify-between md:flex-col md:w-60 border rounded-md p-6 hover:scale-105 transition-all ${cn(
        classes
      )}`}
    >
      <Image src={img} className="w-10" placeholder="blur" alt="title" />
      <h3 className="md:text-4xl text-xl  mt-4 md:mt-6 font-medium ">
        {title}
      </h3>
    </Link>
  );
};

const page = () => {
  const { tVideo, tAssignment, tCourse, tQuiz, assignmentMark } = routes;
  return (
    <div className="grid justify-items-center mt-20  p-[5%] px-[10%]">
      <div className="grid md:grid-cols-2 gap-6 md:gap-20 w-full  md:max-w-max relative ">
        <Card url={tVideo} img={videoImg} title="Video" />

        <Card
          url={tCourse}
          classes="md:absolute md:rounded-full  md:translate-y-[-50%] md:translate-x-[-50%] md:top-1/2 md:left-1/2 bg-white w-full md:w-min p-4 rounded-full z-30 "
          img={courseImg}
          title="Course"
        />
        <Card url={tAssignment} img={assignmentImg} title="Assignment" />
        <Card url={tQuiz} img={quizImg} title="Qize" />
        <Card url={assignmentMark} img={courseImg} title="Assignment Mark" />
      </div>
    </div>
  );
};

export default page;
