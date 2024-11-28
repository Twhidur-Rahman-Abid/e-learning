import TableWrapper from "@/components/local/table/TableWrapper";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { routes } from "@/constents/routes";
import { getAssignmentsWithVideoAndCourse } from "@/lib/fetchData";

const AssignmentPage = async () => {
  const { createAssignment } = routes;

  const assignments = await getAssignmentsWithVideoAndCourse();
  console.log(assignments);
  let content = "";

  const tableHeaders = ["Course Title", "Video Title", "Assignmet", "Action"];
  return (
    <div className="mt-32 px-[5%]">
      <TableWrapper
        heading="Assignment"
        btnText="Create Assignment"
        btnLink={createAssignment}
        tableTitle="All Assignment"
        tableSlug="Manage your online assignment"
        tableHeaders={tableHeaders}
      >
        {assignments?.map((assignment) => {
          const {
            id,
            title,
            video: {
              title: videoTitle,
              course: { title: courseTitle },
            },
          } = assignment;
          return (
            <TableRow className="border-black" key={id}>
              <TableCell>{courseTitle}</TableCell>
              <TableCell>{videoTitle}</TableCell>
              <TableCell>{title}</TableCell>
            </TableRow>
          );
        })}
      </TableWrapper>
    </div>
  );
};

export default AssignmentPage;
