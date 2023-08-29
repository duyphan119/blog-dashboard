import { toastError, toastSuccess } from "@/config/toastify";
import { useQueryString } from "@/hooks";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
  AiTwotoneDelete,
  AiTwotoneEdit,
} from "react-icons/ai";
import { FaSearch, FaTrashRestoreAlt } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IndeterminateCheckbox } from "../inputs";
import TablePagination from "../TablePagination";

type Props = {
  columns: ColumnDef<any>[];
  rows?: any[];
  count?: number;
  pageSizeOptions?: number[];
  onSoftDelete?: (ids: string[]) => Promise<any>;
  onRestore?: (ids: string[]) => Promise<any>;
  onDelete?: (ids: string[]) => Promise<any>;
  isTrashPage?: boolean;
  hasRowSelection?: boolean;
  previewAction?: boolean;
  hideTopActions?: boolean;
  sortable?: boolean;
};

const Table = ({
  columns,
  rows = [],
  count = 0,
  pageSizeOptions = [10, 30, 50, 100, 200],
  onSoftDelete,
  isTrashPage,
  onDelete,
  onRestore,
  hasRowSelection,
  previewAction,
  hideTopActions,
  sortable = false,
}: Props) => {
  const hasActions = onDelete || onRestore || onSoftDelete ? true : false;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { generateQueryString, getNumber, getString } = useQueryString();
  const sortBy = getString("sortBy", "");
  const sortType = getString("sortType", "");
  const keyword = getString("keyword", "");
  const pageIndex = getNumber("pageIndex", 1);
  const pageSize = getNumber("pageSize", 10);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [firstRendered, setFirstRendered] = useState(false);
  const [sorting, setSorting] = useState<SortingState>(
    sortBy && sortType
      ? [
          {
            id: `${sortBy}`,
            desc: `${sortType}`.toLowerCase() === "desc",
          },
        ]
      : []
  );
  const [data, setData] = useState(rows);
  const pageCount = useMemo<number>(
    () => Math.ceil(count / pageSize),
    [count, pageSize]
  );

  useEffect(() => {
    if (firstRendered) {
      const params = { pageSize, pageIndex, keyword };
      const qs = generateQueryString({
        ...params,
        ...(sorting.length > 0
          ? {
              sortBy: sorting[0].id,
              sortType: sorting[0].desc ? "desc" : "asc",
            }
          : {}),
      });
      navigate(`${pathname}${qs}`);
    } else {
      setFirstRendered(true);
    }
  }, [sorting]);

  useEffect(() => {
    if (firstRendered) {
      setData(rows);
    }
  }, [rows]);

  const newColumns = useMemo(() => {
    const result = [...columns];
    if (hasRowSelection) {
      result.unshift({
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      });
    }
    if (hasActions) {
      result.push({
        header: "Thao tác",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-center">
            {isTrashPage ? (
              <button
                className="text-xl text-teal"
                type="button"
                title="Phục hồi bản ghi"
                onClick={() => handleRestore([], [row.original._id])}
              >
                <FaTrashRestoreAlt />
              </button>
            ) : (
              <Link
                to={`${pathname}/edit/${row.original._id}`}
                className="text-xl text-orange"
                title="Sửa bản ghi"
              >
                <AiTwotoneEdit />
              </Link>
            )}
            {previewAction ? (
              <Link
                to={`${pathname}/preview/${row.original._id}`}
                className="text-xl text-purple"
                title="Xem bản ghi"
              >
                <VscPreview />
              </Link>
            ) : null}
            <button
              className="text-xl text-red"
              type="button"
              title="Xoá bản ghi"
              onClick={() => handleDelete([], [row.original._id])}
            >
              <AiTwotoneDelete />
            </button>
          </div>
        ),
        enableSorting: false,
      });
    }
    return result;
  }, [columns, isTrashPage, hasActions, hasRowSelection]);

  const table = useReactTable({
    data,
    columns: newColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
      sorting,
    },
    onSortingChange: setSorting,
  });

  const selectedRowIndexes = useMemo(
    () => Object.keys(table.getState().rowSelection),
    [table.getState().rowSelection]
  );

  const countSelectedRows = useMemo(
    () => selectedRowIndexes.length,
    [selectedRowIndexes]
  );

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchRef.current) {
      const keyword = searchRef.current.value;
      const qs = generateQueryString({
        sortBy,
        sortType,
        pageSize,
        pageIndex: 1,
        keyword,
      });
      navigate(`${pathname}${qs}`);
    }
  };

  const handleDelete = async (
    keys: string[],
    listId?: string[],
    loading?: boolean
  ) => {
    const answer = window.confirm(
      `Bạn có chắc chắn xoá${isTrashPage ? " vĩnh viễn " : " "}?`
    );
    if (answer) {
      if (loading) setDeleteLoading(true);
      const ids = listId || (keys.map((key) => data[+key]._id) as string[]);

      try {
        const response = await (isTrashPage
          ? onDelete?.(ids)
          : onSoftDelete?.(ids));

        if (response.data) {
          const keys = Object.keys(response.data);
          if (keys.length > 0) {
            if (response.data[keys[0]]) {
              table.setRowSelection({});
              toastSuccess("Xoá thành công");
              setData((state) =>
                state.filter((item) => !ids.includes(item._id))
              );
            }
          }
        }
      } catch (error) {
        toastError("Xoá không thành công");
      } finally {
        if (loading) setDeleteLoading(false);
      }
    }
  };

  const handleRestore = async (
    keys: string[],
    listId?: string[],
    loading?: boolean
  ) => {
    const answer = window.confirm(`Bạn có chắc chắn phục hồi ?`);
    if (answer) {
      if (loading) setRestoreLoading(true);
      const ids = listId || (keys.map((key) => data[+key]._id) as string[]);

      try {
        const response = await onRestore?.(ids);
        if (response.data) {
          const keys = Object.keys(response.data);
          if (keys.length > 0) {
            if (response.data[keys[0]]) {
              table.setRowSelection({});
              toastSuccess("Phục hồi thành công");
              setData((state) =>
                state.filter((item) => !ids.includes(item._id))
              );
            }
          }
        }
      } catch (error) {
        toastError("Phục hồi không thành công");
      } finally {
        if (loading) setRestoreLoading(false);
      }
    }
  };

  return (
    <>
      {hideTopActions ? null : (
        <div className="flex gap-4 items-center">
          <form
            onSubmit={handleSubmitSearch}
            className="flex-1 pl-2 flex items-center border-black border rounded-sm overflow-hidden"
          >
            <FaSearch className="text-black" />
            <input
              type="search"
              className="w-full outline-none p-2"
              placeholder="Tìm kiếm"
              ref={searchRef}
              defaultValue={keyword || ""}
            />
          </form>
          {isTrashPage ? (
            <button
              className={`uppercase bg-teal text-white px-6 py-2 rounded-sm`}
              type="button"
              title="Phục hồi nhiều bản ghi"
              disabled={countSelectedRows === 0}
              onClick={() => handleRestore(selectedRowIndexes, undefined, true)}
            >
              {restoreLoading ? (
                "Đang Phục hồi..."
              ) : (
                <>
                  Phục hồi{" "}
                  {countSelectedRows === 0 ? null : `(${countSelectedRows})`}
                </>
              )}
            </button>
          ) : null}
          <button
            className={`uppercase bg-red text-white px-6 py-2 rounded-sm`}
            type="button"
            disabled={countSelectedRows === 0}
            title="Xoá vĩnh viễn nhiều bản ghi"
            onClick={() => handleDelete(selectedRowIndexes, undefined, true)}
          >
            {deleteLoading ? (
              "Đang xoá..."
            ) : (
              <>
                Xoá {countSelectedRows === 0 ? null : `(${countSelectedRows})`}
              </>
            )}
          </button>
          <Link
            to={`${pathname}/add`}
            className="uppercase bg-blue text-white px-6 py-2 rounded-sm "
          >
            Thêm mới
          </Link>
        </div>
      )}

      <table className="w-full border text-center text-sm dark:border-hr mt-4">
        <thead className="border-b font-medium dark:border-hr">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    key={header.id}
                    className={`px6 py-4 ${
                      index === 0 ? "" : "border-l border-l-hr"
                    }`}
                    colSpan={header.colSpan}
                  >
                    <div
                      {...{
                        className: `${
                          header.column.getCanSort() && sortable
                            ? "cursor-pointer select-none"
                            : ""
                        } ${index === 0 ? "justify-center" : ""}`,
                        ...(sortable
                          ? { onClick: header.column.getToggleSortingHandler() }
                          : {}),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: (
                          <AiOutlineSortAscending className="inline-block ml-1 text-lg -translate-y-[1px]" />
                        ),
                        desc: (
                          <AiOutlineSortDescending className="inline-block ml-1 text-lg -translate-y-[1px]" />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, indexRow) => {
            return (
              <tr
                key={row.id}
                className={`${indexRow === 0 ? "" : "border-t border-t-hr"}`}
              >
                {row.getVisibleCells().map((cell, indexCol) => {
                  return (
                    <td
                      key={cell.id}
                      className={`px6 py-4 ${
                        indexCol === 0 ? "" : "border-l border-l-hr"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pageCount > 1 ? (
        <TablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          searchParams={{ pageIndex, pageSize, sortBy, sortType, keyword }}
          pageSizeOptions={pageSizeOptions}
        />
      ) : null}
    </>
  );
};

export default Table;
