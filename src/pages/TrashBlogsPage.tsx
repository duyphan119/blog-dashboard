import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo } from "react";

import { Blog, blogApi, DeletedBlogsResponse } from "@/api/blog.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { useLoaderData } from "react-router-dom";

type Props = {};

const TrashBlogsPage: FC<Props> = () => {
  useDocumentTitle("Quản lý bài viết đã xoá");
  const data = useLoaderData() as DeletedBlogsResponse | null;

  const rows = data?.deletedBlogs.blogs ?? [];
  const count = data?.deletedBlogs.count ?? 0;

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
    <Paper title="Danh sách bài viết đã xoá">
      <Table
        rows={rows}
        columns={columns}
        onDelete={blogApi.delete}
        onRestore={blogApi.restore}
        count={count}
        isTrashPage={true}
        hasRowSelection={true}
        sortable={true}
      />
    </Paper>
  );
};

export default TrashBlogsPage;
