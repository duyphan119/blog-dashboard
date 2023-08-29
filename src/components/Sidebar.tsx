import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slice/auth.slice";
import { FC, Fragment, useMemo } from "react";
import { IconType } from "react-icons";
import { BiSolidCategory } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { DASHBOARD, ROUTES } from "../constants";

type Props = {
  open: boolean;
};

type Item = {
  label: string;
  title?: string;
  href?: string;
  icon?: IconType;
  children: Item[];
};

const Sidebar: FC<Props> = ({ open }) => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const items: Item[] = useMemo(
    () => [
      {
        label: "Quản lý",
        children: [
          {
            label: "Danh mục bài viết",
            href: "/category",
            icon: BiSolidCategory,
            children: [],
          },
          {
            label: "Bài viết",
            href: "/blog",
            icon: BsNewspaper,
            children: [],
          },
        ],
      },
      {
        label: "Phục hồi",
        children: [
          {
            label: "Danh mục bài viết",
            href: "/category/trash",
            icon: BiSolidCategory,
            children: [],
          },
          {
            label: "Bài viết",
            href: "/blog/trash",
            icon: BsNewspaper,
            children: [],
          },
        ],
      },
      {
        label: "Tài khoản",
        title: "Tài khoản",
        children: [
          {
            icon: CgProfile,
            label: "Thông tin tài khoản",
            href: "/profile",
            children: [],
          },
          {
            icon: FiLogOut,
            label: "Đăng xuất",
            children: [],
          },
        ],
      },
    ],
    []
  );
  const handleLogout = () => {
    appDispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside
      className="bg-navy text-white fixed top-0 left-0 bottom-0 z-[9999] transition-all duration-500"
      style={{
        width: DASHBOARD.SIDEBAR_WIDTH,
        transform: `translateX(${
          open ? "0" : "-" + DASHBOARD.SIDEBAR_WIDTH + "px"
        })`,
      }}
    >
      <Link
        to={ROUTES.ADMIN}
        className="logo px-4 flex items-center"
        title="Trang chủ"
        style={{ height: DASHBOARD.HEADER_HEIGHT }}
      >
        <span className="font-bold">BLOG</span>
      </Link>
      <nav>
        <ul className="px-4 flex flex-col gap-6">
          {items.map((item, index) => {
            return (
              <li key={index}>
                <span className="text-neutral-500 mx-2">{item.label}</span>
                {item.children.length > 0 ? (
                  <ul className="flex flex-col mt-2">
                    {item.children.map((child, indexChild) => {
                      const Icon = child.icon || Fragment;
                      const linkClassName =
                        "flex items-center gap-2 hover:bg-lightgrey hover:text-navy p-2 hover:rounded-sm w-full";
                      return (
                        <li key={indexChild}>
                          {child.href ? (
                            <Link to={child.href} className={linkClassName}>
                              <Icon />
                              {child.label}
                            </Link>
                          ) : (
                            <button
                              className={linkClassName}
                              onClick={handleLogout}
                            >
                              <Icon />
                              {child.label}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
