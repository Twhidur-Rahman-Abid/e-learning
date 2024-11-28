import TableWrapper from "@/components/local/table/TableWrapper";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { routes } from "@/constents/routes";
import { getQuezzes } from "@/lib/fetchData";
import { SquarePen, Trash2 } from "lucide-react";

const QuizPage = async () => {
  const { createQuiz } = routes;

  const quizzes = await getQuezzes();

  console.log(quizzes);

  const title = "React";
  const vtitle = "Component";
  const tableHeaders = ["Course Title", "Video Title"];
  return (
    <div className="mt-32 px-[5%]">
      <TableWrapper
        heading="Quiz"
        btnText="Create Quiz"
        btnLink={createQuiz}
        tableTitle="All Quizzes"
        tableSlug="Manage your online quizzes"
        tableHeaders={tableHeaders}
      >
        {quizzes?.map((quiz) => {
          const { id, title, video } = quiz;
          return (
            <TableRow className="border-black" key={id}>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>
                <Table className="border-l">
                  <TableRow>
                    <TableCell className="font-medium">Video Title</TableCell>
                    <TableCell className="text-right font-medium">
                      Quiz
                    </TableCell>
                  </TableRow>
                  {video.map((v) => {
                    const { title, quiz } = v;
                    return (
                      <TableRow
                        className="border-b-0 hover:bg-muted/80"
                        key={v.title}
                      >
                        <TableCell>{vtitle}</TableCell>
                        <Table className="border-l">
                          <TableRow>
                            <TableCell className="font-medium">
                              Quiz Title
                            </TableCell>
                            <TableCell className="text-end font-medium">
                              Action
                            </TableCell>
                          </TableRow>
                          {quiz.map((q) => {
                            const { question } = q;
                            return (
                              <TableRow
                                className="border-b-0 hover:bg-purple-900/5"
                                key={question}
                              >
                                <TableCell>{question}</TableCell>
                                <TableCell className=" flex justify-end gap-4">
                                  <SquarePen />
                                  <Trash2 />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </Table>
                      </TableRow>
                    );
                  })}
                </Table>
              </TableCell>
            </TableRow>
          );
        })}
      </TableWrapper>
    </div>
  );
};

export default QuizPage;
