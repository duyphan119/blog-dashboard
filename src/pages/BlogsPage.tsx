import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo } from "react";

import { Blog, blogApi, Blogs } from "@/api/blog.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { DATE_TIME_FORMAT } from "@/utils/constants";
import { TITLES } from "@/utils/titles";
import { useLoaderData } from "react-router-dom";

type Props = {};

const BlogsPage: FC<Props> = () => {
  useDocumentTitle(TITLES.BLOGS);

  const { count, blogs: rows } = useLoaderData() as Blogs;

  const columns = useMemo<ColumnDef<Blog>[]>(
    () => [
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
    ],
    []
  );

  return (
    <Paper title={TITLES.BLOGS}>
      <Table
        rows={rows}
        columns={columns}
        onSoftDelete={blogApi.softDelete}
        count={count}
        hasRowSelection={true}
        previewAction={true}
        sortable={true}
        softDeleteAction={true}
        editAction={true}
        hasDeleteBtn={true}
        hasSearch={true}
        hasLinkCreate={true}
      />
    </Paper>
  );
};

export default BlogsPage;
