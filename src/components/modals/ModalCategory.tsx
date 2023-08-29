import { Category } from "@/api/category.api";
import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  title?: string;
  selectedIds: string[];
  onOk: (ids: string[]) => void;
};

const ModalCategory: FC<Props> = ({
  open,
  onClose,
  categories,
  title,
  selectedIds,
  onOk,
}) => {
  const [ids, setIds] = useState(selectedIds);
  const handleOk = () => {
    onOk(ids);
    onClose();
  };
  const handleSelectCategory = (id: string) => {
    setIds((state) => [...state, id]);
  };
  const handleDeselectCategory = (id: string) => {
    setIds((state) => state.filter((item) => item !== id));
  };
  return (
    <>
      <div
        className="overlay fixed top-0 right-0 left-0 bottom-0 bg-[#00000090] z-[9999]"
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow bg-white border-lightgrey rounded-md z-[10000] max-w-[90vw] md:max-w-[60vw] ${
          open ? "" : "hidden"
        }`}
      >
        {title ? (
          <>
            <div className="flex items-center px-3 pt-3">
              <div className="flex-1 font-medium">{title}</div>
              <button
                type="button"
                className="hover:text-red"
                title="Đóng"
                onClick={onClose}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="h-[1px] w-full my-3 bg-hr"></div>
          </>
        ) : null}
        <ul
          className={`px-3 body max-h-[50vh] overflow-y-auto flex flex-col gap-3${
            title ? "" : " pt-3"
          }`}
        >
          {categories.map((category) => (
            <li key={category._id}>
              <div className="mb-2">{category.name}</div>
              <ul className="flex gap-2 items-center flex-wrap">
                {category.children.map((child) => {
                  const isActive =
                    ids.findIndex((id) => id === child._id) !== -1;
                  return (
                    <li key={child._id}>
                      <div
                        className={`border border-lightgrey px-2 py-1 cursor-pointer rounded-sm ${
                          isActive ? "bg-blue text-white" : ""
                        }`}
                        onClick={() =>
                          isActive
                            ? handleDeselectCategory(child._id)
                            : handleSelectCategory(child._id)
                        }
                      >
                        {child.name}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        <div className="h-[1px] w-full my-3 bg-hr"></div>
        <div className="px-3 flex items-center justify-end gap-3 pb-3">
          <button
            type="button"
            className="px-4 py-2 bg-lightgrey rounded-sm"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-teal text-white rounded-sm"
            onClick={handleOk}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalCategory;
