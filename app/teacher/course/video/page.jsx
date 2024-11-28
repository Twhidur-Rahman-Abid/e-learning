import TableWrapper from "@/components/local/table/TableWrapper";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { routes } from "@/constents/routes";
import { getCouraseWithVideo } from "@/lib/fetchData";
import { SquarePen, Trash2 } from "lucide-react";
const VideoPage = async () => {
  const { createVideo } = routes;
  const courseSelcet = {
    title: true,
  };
  const videoSelect = {
    title: true,
  };
  const videos = await getCouraseWithVideo(courseSelcet, videoSelect);

  // console.log(videos);
  console.log(videos[0].video);

  let content = "";

  const tableHeaders = ["Course", "Video"];
  return (
    <div className="mt-32 px-[5%]">
      <TableWrapper
        heading="Video"
        btnText="Create Video"
        btnLink={createVideo}
        tableTitle="All Videos"
        tableSlug="Manage your online videos"
        tableHeaders={tableHeaders}
      >
        {videos?.map((videoWCours) => {
          const { id, title, video } = videoWCours;
          return (
            <TableRow className="border-black" key={id}>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>
                <Table>
                  <TableRow>
                    <TableCell className="font-bold">Video</TableCell>
                    <TableCell className="text-end font-bold">Action</TableCell>
                  </TableRow>
                  {video.map((v) => {
                    return (
                      <TableRow className="border-b-0" key={v.title}>
                        <TableCell>{v.title}</TableCell>
                        <TableCell className=" flex justify-end gap-4">
                          <SquarePen />
                          <Trash2 />
                        </TableCell>
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

export default VideoPage;
