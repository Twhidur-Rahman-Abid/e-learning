import TableWrapper from "@/components/local/table/TableWrapper";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { routes } from "@/constents/routes";
import { getCoursesByAuthor } from "@/lib/fetchData";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import { Suspense } from "react";

// const TableRow = async () => {
//   const courses = await getCoursesByAuthor();
//   console.log(courses);
//   if (courses?.length === 0) {
//     return <div>You did not create a course</div>;
//   }
//   if (courses?.length > 0) {
//     return courses.map((d) => {
//       const { title, enrollment, price } = d;
//       return (
//         <TableRow key={d.id}>
//           <TableCell className="font-medium">{title}</TableCell>
//           <TableCell>{enrollment.length}</TableCell>
//           <TableCell>$ {enrollment.length * price}</TableCell>
//           <TableCell>$ {price}</TableCell>
//           <TableCell className=" flex justify-end gap-4">
//             <SquarePen />
//             <Trash2 />
//           </TableCell>
//         </TableRow>
//       );
//     });
//   }
// };

const CoursePage = async () => {
  const { createCourse } = routes;

  const courses = await getCoursesByAuthor({
    title: true,
    price: true,
    enrollment: true,
  });

  console.log(courses);

  const tableHeaders = [
    "Course",
    "Enrollments",
    "Revenue",
    "Published",
    "Action",
  ];

  return (
    <div className="mt-32 px-[5%]">
      <TableWrapper
        heading="Course"
        btnText="Create Course"
        btnLink={createCourse}
        tableTitle="All Courses"
        tableSlug="Manage your online courses"
        tableHeaders={tableHeaders}
      >
        <TableBody>
          {courses?.map((d) => {
            const { id, title, enrollment, price } = d;
            return (
              <TableRow key={id}>
                <TableCell className="font-medium">{title}</TableCell>
                <TableCell>{enrollment.length}</TableCell>
                <TableCell>$ {enrollment.length * price}</TableCell>
                <TableCell>$ {price}</TableCell>
                <TableCell className=" flex justify-end gap-4">
                  <SquarePen />
                  <Trash2 />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableWrapper>
    </div>
  );
};

export default CoursePage;
