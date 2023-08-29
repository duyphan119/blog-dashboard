import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo } from "react";

import { CategoriesResponse, Category, categoryApi } from "@/api/category.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { useLoaderData } from "react-router-dom";

type Props = {};

const CategoriesPage: FC<Props> = () => {
  useDocumentTitle("Quản lý danh mục bài viết");

  const data = useLoaderData() as CategoriesResponse | null;

  const rows = data?.categories.categories ?? [];
  const count = data?.categories.count ?? 0;

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên",
        enableSorting: true,
      },
      {
        accessorKey: "slug",
        header: "Slug",
        enableSorting: true,
      },
      {
        accessorKey: "parent",
        header: "Danh mục cha",
        cell: ({ row }) => row.original.parent?.name ?? "Không có",
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
    <Paper title="Danh sách danh mục bài viết">
      <Table
        rows={rows}
        columns={columns}
        onSoftDelete={categoryApi.softDelete}
        count={count}
        hasRowSelection={true}
        sortable={true}
      />
    </Paper>
  );
};

export default CategoriesPage;
