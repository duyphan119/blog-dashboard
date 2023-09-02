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

const TrashCategoriesPage: FC<Props> = () => {
  useDocumentTitle(TITLES.TRASH_CATEGORIES);
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
    <Paper title={TITLES.TRASH_CATEGORIES}>
      <Table
        rows={rows}
        columns={columns}
        onDelete={categoryApi.delete}
        onRestore={categoryApi.restore}
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

export default TrashCategoriesPage;
