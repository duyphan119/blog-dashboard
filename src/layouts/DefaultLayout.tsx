import { useAppSelector } from "@/redux/hooks";
import { selectAuthor } from "@/redux/slice/auth.slice";
import { FC, ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { DASHBOARD } from "../constants";

type Props = {
  children?: ReactNode;
};

const Content = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const profile = useAppSelector(selectAuthor);

  const handleToggleSidebar = () => {
    setSidebarOpen((state) => !state);
  };
  if (!profile) return <></>;
  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} />
      <div
        className="relative overflow-y-auto flex flex-col bg-green-200 min-h-screen flex-1 transition-all duration-500"
        style={{
          marginLeft: sidebarOpen ? DASHBOARD.SIDEBAR_WIDTH : 0,
        }}
      >
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="p-6 bg-lightgrey flex-1">
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
