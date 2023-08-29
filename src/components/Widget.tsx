import { FC, memo } from "react";
import { IconType } from "react-icons";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

type Props = {
  icon: IconType;
  arrowDirection?: "up" | "down";
  title: string;
  rate?: number;
  bgColor?: "bg-blue" | "bg-darkpink";
};

const Widget: FC<Props> = ({
  icon: Icon,
  arrowDirection = "up",
  title,
  rate = 0,
  bgColor,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="mb-2">{title}</div>
        <div
          className={`w-20 h-20 flex items-center justify-center rounded-full ${
            bgColor || ""
          } text-white text-3xl`}
        >
          <Icon />
        </div>
      </div>
      <div
        className={`text-3xl flex gap-2 items-center ${
          arrowDirection === "up" ? "text-green" : "text-red"
        }`}
        title="So với tháng trước"
      >
        {arrowDirection === "up" ? <BsArrowUpRight /> : <BsArrowDownRight />}
        <span className="">{rate ? `${rate * 100}%` : null}</span>
      </div>
    </div>
  );
};

export default memo(Widget);
