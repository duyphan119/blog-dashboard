import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  hide?: boolean;
};

const BadgeNotification: FC<Props> = ({ children, hide }) => {
  if (hide) return <>{children}</>;
  return (
    <div
      className="relative inline-flex w-fit cursor-pointer"
      title="Thông báo"
    >
      <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red p-1.5"></div>
      <div className="flex items-center justify-center rounded-lg p-1 text-center text-white shadow-lg dark:text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default BadgeNotification;
