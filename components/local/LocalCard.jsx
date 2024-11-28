import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";

const LocalCard = ({ course, ...props }) => {
  const { image, id, title } = course;
  return (
    <Link href={`course-player/${id}`}>
      <Card {...props}>
        <Image
          src={image}
          alt=""
          width={500}
          height={100}
          className="p-6 rounded-md h-56 object-cover bg-center bg-cover"
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p>2:20h</p>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default LocalCard;
