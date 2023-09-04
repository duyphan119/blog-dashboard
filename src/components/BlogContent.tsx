import { Blog } from "@/api/blog.api";
import { DATE_TIME_FORMAT } from "@/utils/constants";
import moment from "moment";
import { FC, memo } from "react";

type Props = { blog: Blog };

const BlogContent: FC<Props> = ({ blog }) => {
  return (
    <div className="ql-editor">
      {blog.thumbnail ? (
        <img src={blog.thumbnail} alt="thumbnail" className="mb-2" />
      ) : null}
      <div className="mb-2 font-bold text-2xl">{blog.title}</div>
      <div className="flex flex-col sm:flex-row justify-between mb-2 text-grey">
        <div className="">
          Người đăng: <strong>{blog.author.name}</strong>
        </div>
        <div className="">
          Ngày đăng:{" "}
          <strong>{moment(blog.createdAt).format(DATE_TIME_FORMAT)}</strong>
        </div>
      </div>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default memo(BlogContent);
