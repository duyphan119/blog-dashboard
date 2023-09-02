import { FC, useMemo } from "react";
import { useDocumentTitle } from "@/hooks";
import { Paper, Widget } from "@/components";
import { Link, useLoaderData } from "react-router-dom";
import { DashboardPage } from "@/api/page.api";
import { Table } from "@/components/tables";
import { ColumnDef } from "@tanstack/react-table";
import { Blog } from "@/api/blog.api";
import moment from "moment";
import { BsNewspaper } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { getRate } from "@/utils/helpers";
import { TITLES } from "@/utils/titles";
import { DATE_TIME_FORMAT } from "@/utils/constants";
import { useMediaQuery } from "react-responsive";
import { ROUTES } from "@/utils/routes";

type Props = {};

const HomePage: FC<Props> = () => {
  useDocumentTitle(TITLES.HOME);

  const data = useLoaderData() as DashboardPage;

  const isSmScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const isMdScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const {
    recentBlogs,
    mostViewBlogs,
    currentMonthCountBlog,
    currentMonthCountReply,
    previousMonthCountBlog,
    previousMonthCountReply,
  } = data;

  const columns = useMemo<ColumnDef<Blog>[]>(() => {
    const example: ColumnDef<Blog>[] = [
      {
        accessorKey: "title",
        header: "Tiêu đề",
        enableSorting: true,
        cell: ({ row }) => (
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <img src={row.original.thumbnail} alt="" width={120} height={60} />
            <span>{row.original.title}</span>
          </div>
        ),
      },
      {
        accessorKey: "categories",
        header: "Danh mục",
        cell: ({ row }) =>
          row.original.categories
            ?.map((category) => category.name)
            .join(", ") ?? "Không có",
        enableSorting: true,
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) =>
          moment(row.original.createdAt).format(DATE_TIME_FORMAT),
        enableSorting: true,
      },
    ];
    if (isMdScreen) {
      return example;
    } else if (isSmScreen) {
      return [example[0], example[2]];
    }
    return [example[0]];
  }, [isSmScreen, isMdScreen]);

  const getRowLink = (row: Blog) => `${ROUTES.PREVIEW_BLOG}/${row._id}`;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="md:col-span-6 col-span-12">
        <Paper>
          <Link to={ROUTES.BLOGS}>
            <Widget
              icon={BsNewspaper}
              title={`${currentMonthCountBlog} Bài viết`}
              rate={getRate(previousMonthCountBlog, currentMonthCountBlog)}
              arrowDirection={
                previousMonthCountBlog === currentMonthCountBlog
                  ? "none"
                  : previousMonthCountBlog > currentMonthCountBlog
                  ? "down"
                  : "up"
              }
              bgColor="bg-blue"
            />
          </Link>
        </Paper>
      </div>
      <div className="md:col-span-6 col-span-12">
        <Paper>
          <Link to={ROUTES.REPLIES}>
            <Widget
              icon={BiCommentDetail}
              title={`${currentMonthCountReply} Phản hồi`}
              rate={getRate(previousMonthCountReply, currentMonthCountReply)}
              arrowDirection={
                previousMonthCountReply === currentMonthCountReply
                  ? "none"
                  : previousMonthCountReply > currentMonthCountReply
                  ? "down"
                  : "up"
              }
              bgColor="bg-darkpink"
            />
          </Link>
        </Paper>
      </div>
      <div className="col-span-12">
        <Paper
          title="Bài viết gần đây"
          rightTitle={
            <Link to={ROUTES.BLOGS} className="underline text-blue mt-1">
              Xem tất cả
            </Link>
          }
        >
          <Table
            rows={recentBlogs}
            columns={columns}
            hideTopActions={true}
            getRowLink={getRowLink}
          />
        </Paper>
      </div>
      <div className="col-span-12">
        <Paper
          title="Bài viết được xem nhiều nhất"
          rightTitle={
            <Link to={ROUTES.BLOGS} className="underline text-blue mt-1">
              Xem tất cả
            </Link>
          }
        >
          <Table
            rows={mostViewBlogs}
            columns={columns}
            hideTopActions={true}
            getRowLink={getRowLink}
          />
        </Paper>
      </div>
    </div>
  );
};

export default HomePage;
