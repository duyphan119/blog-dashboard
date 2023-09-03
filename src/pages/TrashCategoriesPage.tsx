import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";

import { Categories, Category, categoryApi } from "@/api/category.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { useLoaderData } from "react-router-dom";
import { TITLES } from "@/utils/titles";
import {
  DATE_TIME_FORMAT,
  MD_SCREEN_QUERY,
  SM_SCREEN_QUERY,
} from "@/utils/constants";
import { useMediaQuery } from "react-responsive";
import { ROUTES } from "@/utils/routes";

type Props = {};

const TrashCategoriesPage: FC<Props> = () => {
  useDocumentTitle(TITLES.TRASH_CATEGORIES);
  const { count, categories: rows } = useLoaderData() as Categories;

  const isSmScreen = useMediaQuery(SM_SCREEN_QUERY);
  const isMdScreen = useMediaQuery(MD_SCREEN_QUERY);

  const columns = useMemo<ColumnDef<Category>[]>(() => {
    const example: ColumnDef<Category>[] = [
      {
        accessorKey: "name",
        header: "Tên",
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
    ];
    if (isMdScreen) {
      return example;
    } else if (isSmScreen) {
      return [example[0], example[example.length - 1]];
    }
    return [example[0]];
  }, [isSmScreen, isMdScreen]);

  const getRowLink = useCallback(
    (row: Category) => `${ROUTES.CATEGORIES}/edit/${row._id}`,
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
        getRowLink={getRowLink}
      />
    </Paper>
  );
};

export default TrashCategoriesPage;
