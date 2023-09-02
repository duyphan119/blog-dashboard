import { Blog } from "@/api/blog.api";
import { BlogContent, Paper } from "@/components";
import { useDocumentTitle } from "@/hooks";
import { TITLES } from "@/utils/titles";
import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";

type Props = {};

const BlogPreviewPage: FC<Props> = () => {
  useDocumentTitle(TITLES.PREVIEW_BLOG);

  const blog = useLoaderData() as Blog | null;

  if (!blog) return <>404</>;

  return (
    <Paper
      title={TITLES.PREVIEW_BLOG}
      rightTitle={
        <Link
          to={`/blog/edit/${blog._id}`}
          className="px-4 py-1 bg-orange text-white rounded-sm font-normal text-sm"
          title={TITLES.UPDATE_BLOG}
        >
          Sửa
        </Link>
      }
    >
      <BlogContent blog={blog} />
    </Paper>
  );
};

export default BlogPreviewPage;
