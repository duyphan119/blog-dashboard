import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo } from "react";

import { Blog, blogApi, Blogs } from "@/api/blog.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { useLoaderData } from "react-router-dom";
import { TITLES } from "@/utils/titles";
import { DATE_TIME_FORMAT } from "@/utils/constants";

type Props = {};

const TrashBlogsPage: FC<Props> = () => {
  useDocumentTitle(TITLES.TRASH_BLOGS);
  const { count, blogs: rows } = useLoaderData() as Blogs;

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
          moment(row.original.createdAt).format(DATE_TIME_FORMAT),
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <Paper title={TITLES.TRASH_BLOGS}>
      <Table
        rows={rows}
        columns={columns}
        onDelete={blogApi.delete}
        onRestore={blogApi.restore}
        count={count}
        restoreAction={true}
        hasRowSelection={true}
        sortable={true}
        hasDeleteBtn={true}
        hasSearch={true}
        hasRestoreBtn={true}
      />
    </Paper>
  );
};

export default TrashBlogsPage;
