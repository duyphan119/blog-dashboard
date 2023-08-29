import { FC, memo } from "react";

type Props = {
  onCancel: () => void;
  submitLoading: boolean;
};

const FooterForm: FC<Props> = ({ onCancel, submitLoading }) => {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="bg-lightgrey px-4 py-2 rounded-sm"
        onClick={onCancel}
      >
        Huỷ bỏ
      </button>
      <button
        type="submit"
        className="bg-navy px-4 py-2 text-white rounded-sm"
        disabled={submitLoading}
      >
        {submitLoading ? "Đang lưu..." : "Lưu"}
      </button>
    </div>
  );
};

export default memo(FooterForm);
