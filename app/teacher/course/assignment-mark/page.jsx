import TableWrapper from "@/components/local/table/TableWrapper";
import { TableBody } from "@/components/ui/table";

import { routes } from "@/constents/routes";

const AssignmentMarkPage = () => {
  const { createQuiz } = routes;
  let content = "";

  const tableHeaders = [
    "Assignmet Title",
    "Video Title",
    "User Name",
    "Action",
  ];
  return (
    <div className="mt-32 px-[5%]">
      <TableWrapper
        heading="Assignment Mark"
        tableTitle="All Assignment"
        tableSlug="Manage your online Assignment"
        tableHeaders={tableHeaders}
      >
        <TableBody>{content}</TableBody>
      </TableWrapper>
    </div>
  );
};

export default AssignmentMarkPage;
