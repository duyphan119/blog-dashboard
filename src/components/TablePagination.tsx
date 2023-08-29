import { useQueryString } from "@/hooks";
import { FC, memo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  pageSize: number;
  pageIndex: number;
  searchParams: { [key: string]: string | number };
  pageSizeOptions?: number[];
  pageCount: number;
};

const TablePagination: FC<Props> = ({
  pageIndex,
  pageSize,
  searchParams,
  pageSizeOptions = [10, 30, 50, 100, 200],
  pageCount,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { generateQueryString } = useQueryString();
  const pageNumRef = useRef<HTMLInputElement | null>(null);

  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number
  ) => {
    const qs = generateQueryString({
      ...searchParams,
      pageIndex: newPageIndex,
      pageSize: newPageSize,
    });
    navigate(`${pathname}${qs}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="border rounded p-1 hover:bg-navy disabled:bg-white hover:text-white disabled:text-navy"
        onClick={() => handlePaginationChange(1, pageSize)}
        disabled={pageIndex === 1}
        title="Đi tới trang đầu tiên"
      >
        {"<<"}
      </button>
      <button
        className="border rounded p-1 hover:bg-navy disabled:bg-white hover:text-white disabled:text-navy"
        onClick={() => handlePaginationChange(pageIndex - 1, pageSize)}
        disabled={pageIndex === 1}
        title="Đi tới trang trước"
      >
        {"<"}
      </button>
      <button
        className="border rounded p-1 hover:bg-navy disabled:bg-white hover:text-white disabled:text-navy"
        onClick={() => handlePaginationChange(pageIndex + 1, pageSize)}
        disabled={pageIndex === pageCount}
        title="Đi tới trang sau"
      >
        {">"}
      </button>
      <button
        className="border rounded p-1 hover:bg-navy disabled:bg-white hover:text-white disabled:text-navy"
        onClick={() => handlePaginationChange(pageCount, pageSize)}
        disabled={pageIndex === pageCount}
        title="Đi tới trang cuối cùng"
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1">
        <div>Trang</div>
        <span>
          <strong>{pageIndex}</strong> / {pageCount}
        </span>
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pageNumRef.current) {
            let page = 1;

            const num = Number(pageNumRef.current.value);

            if (!isNaN(num)) page = num;

            if (page > pageCount) page = pageCount;

            handlePaginationChange(page, pageSize);
          }
        }}
        className="flex items-center gap-1"
      >
        | Đi tới trang:
        <input
          defaultValue={pageIndex}
          ref={pageNumRef}
          className="border p-1 rounded w-16 outline-none"
        />
      </form>
      <select
        value={pageSize}
        onChange={(e) => {
          handlePaginationChange(
            pageIndex === 1 ? pageIndex : 1,
            Number(e.target.value)
          );
        }}
        className="outline-none border border-black p-1.5 rounded"
      >
        {pageSizeOptions.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Hiển thị {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(TablePagination);
