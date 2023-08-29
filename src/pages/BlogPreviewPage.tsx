import { BlogResponse } from "@/api/blog.api";
import { BlogContent, Paper } from "@/components";
import { useDocumentTitle } from "@/hooks";
import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";

type Props = {};

const BlogPreviewPage: FC<Props> = () => {
  useDocumentTitle("Xem trước bài viết");

  const data = useLoaderData() as BlogResponse | null;

  const blog = data?.blog ?? null;

  if (!blog) return <>404</>;

  const title = (
    <div className="flex justify-between items-center">
      <div className="">Xem trước bài viết</div>
      <Link
        to={`/blog/edit/${blog._id}`}
        className="px-4 py-1 bg-orange text-white rounded-sm font-normal text-sm"
        title="Sửa bài viết"
      >
        Sửa
      </Link>
    </div>
  );

  return (
    <Paper title={title}>
      <BlogContent blog={blog} />
    </Paper>
  );
};

export default BlogPreviewPage;
