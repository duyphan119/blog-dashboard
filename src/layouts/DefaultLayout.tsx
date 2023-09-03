import { useAppSelector } from "@/redux/hooks";
import { selectAuthor } from "@/redux/slice/auth.slice";
import { ROUTES } from "@/utils/routes";
import { FC, ReactNode, useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";

type Props = {
  children?: ReactNode;
};

const Content = ({ children }: Props) => {
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const [sidebarOpen, setSidebarOpen] = useState(isLgScreen);
  const profile = useAppSelector(selectAuthor);

  const handleToggleSidebar = () => {
    setSidebarOpen((state) => !state);
  };

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    setSidebarOpen(isLgScreen);
  }, [isLgScreen]);

  if (!profile) return <Navigate to={ROUTES.LOGIN} />;
  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} onClose={handleClose} />
      <div className="relative overflow-y-auto flex flex-col min-h-screen flex-1">
        <Header onToggleSidebar={handleToggleSidebar} open={sidebarOpen} />
        <main
          className={`sm:p-6 p-2 bg-lightgrey transition-all duration-500 flex-1 ${
            sidebarOpen ? "md:ml-[286px]" : "ml-0"
          }`}
        >
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

const DefaultLayout: FC<Props> = () => {
  return (
    <Content>
      <Outlet />
    </Content>
  );
};

export default DefaultLayout;
