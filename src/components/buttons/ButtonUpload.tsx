import { FC, ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onSuccess: (url: string) => void;
  disabled?: boolean;
};

const ButtonUpload: FC<Props> = ({
  children,
  className = "",
  onSuccess,
  disabled,
}) => {
  const widget = useRef<any>(null);
  useEffect(() => {
    widget.current = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        folder: "blog",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onSuccess(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleClick = () => {
    if (widget.current) {
      widget.current.open();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={` ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonUpload;
