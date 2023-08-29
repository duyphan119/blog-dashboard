import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo } from "react";

import { Blog, blogApi, BlogsResponse } from "@/api/blog.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { useLoaderData } from "react-router-dom";

type Props = {};

const BlogsPage: FC<Props> = () => {
  useDocumentTitle("Quản lý bài viết");

  const data = useLoaderData() as BlogsResponse | null;

  const rows = data?.blogs.blogs ?? [];
  const count = data?.blogs.count ?? 0;

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
    <Paper title="Danh sách bài viết">
      <Table
        rows={rows}
        columns={columns}
        onSoftDelete={blogApi.softDelete}
        count={count}
        hasRowSelection={true}
        previewAction={true}
        sortable={true}
      />
    </Paper>
  );
};

export default BlogsPage;
