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

type Props = {};

const HomePage: FC<Props> = () => {
  useDocumentTitle("Trang chủ");

  const data = useLoaderData() as DashboardPage;

  const {
    recentBlogs,
    mostViewBlogs,
    currentMonthCountBlog,
    currentMonthCountReply,
    previousMonthCountBlog,
    previousMonthCountReply,
  } = data;

  const columns = useMemo<ColumnDef<Blog>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Tiêu đề",
        enableSorting: true,
      },
      {
        accessorKey: "slug",
        header: "Slug",
        enableSorting: true,
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
          moment(row.original.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <Paper>
          <Link to="/blog">
            <Widget
              icon={BsNewspaper}
              title={`${currentMonthCountBlog} Bài viết`}
              rate={getRate(previousMonthCountBlog, currentMonthCountBlog)}
              arrowDirection={
                previousMonthCountBlog > currentMonthCountBlog ? "down" : "up"
              }
              bgColor="bg-blue"
            />
          </Link>
        </Paper>
      </div>
      <div className="col-span-6">
        <Paper>
          <Link to="/reply">
            <Widget
              icon={BiCommentDetail}
              title={`${currentMonthCountReply} Phản hồi`}
              rate={getRate(previousMonthCountReply, currentMonthCountReply)}
              arrowDirection={
                previousMonthCountReply > currentMonthCountReply ? "down" : "up"
              }
              bgColor="bg-darkpink"
            />
          </Link>
        </Paper>
      </div>
      <div className="col-span-12">
        <Paper title="Bài viết gần đây">
          <Table rows={recentBlogs} columns={columns} hideTopActions={true} />
          <Link to="/blog" className="underline text-blue mt-1">
            Xem tất cả
          </Link>
        </Paper>
      </div>
      <div className="col-span-12">
        <Paper title="Bài viết được xem nhiều nhất">
          <Table rows={mostViewBlogs} columns={columns} hideTopActions={true} />
          <Link to="/blog" className="underline text-blue mt-1">
            Xem tất cả
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default HomePage;
