import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const TableWrapper = ({
  btnText = "",
  heading = "",
  tableTitle = "",
  tableSlug = "",
  btnLink,
  children,
  tableHeaders = [],
}) => {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <Link href="/teacher" className="text-2xl font-bold">
          <MoveLeft />
          {heading}
        </Link>
        {btnLink && btnText && (
          <Link href={btnLink}>
            <Button size="lg" className="text-xl">
              + {btnText}
            </Button>
          </Link>
        )}
      </div>

      <div className="p-6 border rounded-md">
        <div className="mb-10">
          <h3 className="text-3xl font-bold">{tableTitle}</h3>
          <p>{tableSlug}</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((thead, i) => (
                <TableHead
                  key={i}
                  className={`${i === tableHeaders.length - 1 && "text-right"}`}
                >
                  {thead}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {children}
        </Table>
      </div>
    </div>
  );
};

export default TableWrapper;
