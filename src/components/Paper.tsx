import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  rightTitle?: ReactNode;
};

const Paper: FC<Props> = ({ children, title, rightTitle }) => {
  return (
    <section className="bg-white rounded-md overflow-x-hidden">
      {title ? (
        <>
          <div className="px-4 pt-4 pb-2 flex justify-between items-center">
            <strong>{title}</strong>
            {rightTitle}
          </div>
          <div className="px-4 py-2">
            <div className="bg-black h-[1px] w-full"></div>
          </div>
        </>
      ) : null}

      <div className={`${title ? "px-4 pt-2 pb-4" : "p-4"}`}>{children}</div>
    </section>
  );
};

export default Paper;
