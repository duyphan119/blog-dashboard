import { GoMoveToTop } from "react-icons/go";
import { FC, useEffect, useState } from "react";
import { TITLES } from "@/utils/titles";
type Props = {};

const ScrollToTop: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const scroll = () => {
      setVisible(window.scrollY > 0);
    };
    document.addEventListener("scroll", scroll);

    return () => document.removeEventListener("scroll", scroll);
  }, []);

  const handleClick = () => {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  };

  return visible ? (
    <div className="fixed bottom-3 right-3 z-10">
      <button
        type="button"
        onClick={handleClick}
        title={TITLES.SCROLL_TO_TOP}
        className="bg-navy text-white p-2 outline-none opacity-50 cursor-pointer"
      >
        <GoMoveToTop />
      </button>
    </div>
  ) : (
    <></>
  );
};

export default ScrollToTop;
