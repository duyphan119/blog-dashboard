import { useAppSelector } from "@/redux/hooks";
import { selectAuthor } from "@/redux/slice/auth.slice";
import { FC, memo } from "react";
import { FaSearch } from "react-icons/fa";
import { GrMenu } from "react-icons/gr";
import { Input } from "./inputs";
import NotificationIcon from "./NotificationIcon";

type Props = {
  onToggleSidebar: () => void;
  open?: boolean;
};

const Header: FC<Props> = ({ onToggleSidebar, open }) => {
  const profile = useAppSelector(selectAuthor);
  return (
    <header
      className={`px-6 bg-white shadow z-[9998] flex items-center justify-between gap-4 transition-all duration-500 h-20 ${
        open ? "ml-[286px]" : "ml-0"
      }`}
    >
      <div className="left flex items-center gap-4 flex-1">
        <span className="cursor-pointer text-2xl" onClick={onToggleSidebar}>
          <GrMenu />
        </span>
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Nhập từ khoá để tìm kiếm"
            inputClassName="pl-9"
          />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
            <FaSearch />
          </span>
        </div>
      </div>
      <div className="right flex items-center gap-4 justify-end">
        <NotificationIcon />
        <p className="text-neutral-500 hidden md:block">
          Xin chào,{" "}
          <span className="font-medium text-black">{profile?.name}</span>
        </p>
      </div>
    </header>
  );
};

export default memo(Header);
