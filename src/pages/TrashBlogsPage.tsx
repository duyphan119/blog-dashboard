import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useCallback, useMemo } from "react";

import { Blog, blogApi, Blogs } from "@/api/blog.api";
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

const TrashBlogsPage: FC<Props> = () => {
  useDocumentTitle(TITLES.TRASH_BLOGS);
  const { count, blogs: rows } = useLoaderData() as Blogs;

  const isMdScreen = useMediaQuery(MD_SCREEN_QUERY);
  const isSmScreen = useMediaQuery(SM_SCREEN_QUERY);

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
    if (isMdScreen) return example;
    else if (isSmScreen) return [example[0], example[example.length - 1]];
    return [example[0]];
  }, [isMdScreen, isSmScreen]);

  const getRowLink = useCallback(
    (row: Blog) => `${ROUTES.BLOGS}/${row._id}`,
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
        getRowLink={getRowLink}
      />
    </Paper>
  );
};

export default TrashBlogsPage;
