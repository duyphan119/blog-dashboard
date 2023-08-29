import { HTMLProps, useEffect, useId, useRef } from "react";

const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  const id = useId();

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <label
      htmlFor={id}
      className="w-5 h-5 inline-flex items-center justify-center cursor-pointer select-none"
    >
      <input type="checkbox" ref={ref} id={id} {...rest} />
    </label>
  );
};
export default IndeterminateCheckbox;
