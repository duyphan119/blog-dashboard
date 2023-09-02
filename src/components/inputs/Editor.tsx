import { FC, useState, memo } from "react";
import { Editor as TextEditor } from "@tinymce/tinymce-react";
import { API_KEY_TINYMCE } from "@/utils/constants";

type Props = {
  value: string;
  onChange: (text: string) => void;
  className?: string;
};

const Editor: FC<Props> = ({ value, onChange, className = "" }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <div className={`relative h-[70vh] ${className}`}>
      {loading ? (
        <div className="bg-white absolute top-0 left-0 right-0 bottom-0"></div>
      ) : null}
      <TextEditor
        onInit={() => {
          setLoading(false);
        }}
        value={value}
        initialValue="<p>Note Content</p>"
        init={{
          height: "100%",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          auto_focus: true,
        }}
        onEditorChange={(value, _) => handleEditorChange(value)}
        apiKey={API_KEY_TINYMCE}
      />
    </div>
  );
};

export default memo(Editor);
