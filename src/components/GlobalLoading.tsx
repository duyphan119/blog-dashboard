import { FC } from "react";

type Props = {};

const GlobalLoading: FC<Props> = () => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
      <div
        className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid  align-[-0.125em] text-navy motion-reduce:animate-[spin_1.5s_linear_infinite]"
        style={{ borderColor: "initial", borderRightColor: "transparent" }}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default GlobalLoading;
