import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo } from "react";

import { Categories, Category, categoryApi } from "@/api/category.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { useLoaderData } from "react-router-dom";
import { TITLES } from "@/utils/titles";
import { DATE_TIME_FORMAT } from "@/utils/constants";

type Props = {};

const CategoriesPage: FC<Props> = () => {
  useDocumentTitle(TITLES.CATEGORIES);

  const { count, categories: rows } = useLoaderData() as Categories;

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
          moment(row.original.createdAt).format(DATE_TIME_FORMAT),
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <Paper title={TITLES.CATEGORIES}>
      <Table
        rows={rows}
        columns={columns}
        onSoftDelete={categoryApi.softDelete}
        count={count}
        hasRowSelection={true}
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

export default CategoriesPage;
