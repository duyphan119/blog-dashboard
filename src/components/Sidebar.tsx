import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slice/auth.slice";
import { ROUTES } from "@/utils/routes";
import { TITLES } from "@/utils/titles";
import { FC, Fragment, useMemo } from "react";
import { IconType } from "react-icons";
import { BiSolidCategory, BiSolidContact } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
};

type Item = {
  label: string;
  title?: string;
  href?: string;
  icon?: IconType;
  children?: Item[];
};

const Sidebar: FC<Props> = ({ open }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const appDispatch = useAppDispatch();

  const items: Item[] = useMemo(
    () => [
      {
        label: "Quản lý",
        children: [
          {
            label: "Danh mục bài viết",
            href: ROUTES.CATEGORIES,
            icon: BiSolidCategory,
            children: [],
          },
          {
            label: "Bài viết",
            href: ROUTES.BLOGS,
            icon: BsNewspaper,
            children: [],
          },
          {
            label: "Liên hệ",
            href: ROUTES.CONTACTS,
            icon: BiSolidContact,
            children: [],
          },
        ],
      },
      {
        label: "Phục hồi",
        children: [
          {
            label: "Danh mục bài viết",
            href: ROUTES.TRASH_CATEGORIES,
            icon: BiSolidCategory,
            children: [],
          },
          {
            label: "Bài viết",
            href: ROUTES.TRASH_BLOGS,
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
            href: ROUTES.PROFILE,
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
      className={`bg-navy text-white fixed top-0 left-0 bottom-0 z-[9999] transition-all duration-500 ${
        open ? "translate-x-0" : "-translate-x-[286px]"
      } w-[286px]`}
    >
      <Link
        to={ROUTES.HOME}
        className="logo px-4 flex items-center h-20"
        title={TITLES.HOME}
      >
        <span className="font-bold">ITS</span>
      </Link>
      <nav>
        <ul className="px-4 flex flex-col gap-6">
          {items.map((item, index) => {
            return (
              <li key={index}>
                <span className="text-neutral-500 mx-2">{item.label}</span>
                {item.children && item.children.length > 0 ? (
                  <ul className="flex flex-col mt-2 gap-0.5">
                    {item.children.map((child, indexChild) => {
                      const Icon = child.icon || Fragment;
                      const isActive = child.href
                        ? location.pathname.startsWith(child.href)
                        : false;
                      const linkClassName = `flex items-center gap-2 hover:bg-lightgrey hover:text-navy p-2 hover:rounded-sm w-full ${
                        isActive ? "text-navy bg-lightgrey" : ""
                      }`;
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
