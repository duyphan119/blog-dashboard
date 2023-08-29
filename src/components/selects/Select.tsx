import { memo, useId, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  required?: boolean;
  options: { label?: string; value: any }[];
};

const Select: FC<Props> = ({
  label,
  className = "",
  selectClassName = "",
  labelClassName = "",
  placeholder = "",
  error = "",
  register,
  required = false,
  options = [],
}) => {
  const id = useId();
  return (
    <div className={`w-full ${className}`}>
      {label ? (
        <label
          htmlFor={id}
          className={`block mb-1 font-medium ${labelClassName}`}
        >
          {label} {required ? "(Bắt buộc)" : ""}
        </label>
      ) : null}
      <select
        id={id}
        className={`w-full border-[2px] outline-none border-black px-2 py-[9.6px] rounded-[3px] ${
          error !== "" ? "focus:border-red border-red" : "focus:border-navy"
        } ${selectClassName}`}
        placeholder={placeholder}
        {...register}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
      {error !== "" ? (
        <div className="text-red">Trường này không được bỏ trống</div>
      ) : null}
    </div>
  );
};

export default memo(Select);
