import { Blog } from "@/api/blog.api";
import { Category } from "@/api/category.api";
import { Paper } from "@/components";
import { BlogForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { ROUTES } from "@/utils/routes";
import { TITLES } from "@/utils/titles";
import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";

type Props = {};

const EditBlogPage: FC<Props> = () => {
  useDocumentTitle(TITLES.UPDATE_BLOG);

  const [categories, blog] = useLoaderData() as [Category[], Blog | null];
  if (!blog) return <>404</>;

  return (
    <Paper
      title={TITLES.UPDATE_BLOG}
      rightTitle={
        <Link
          to={`${ROUTES.PREVIEW_BLOG}/${blog._id}`}
          className="px-4 py-1 bg-purple text-white rounded-sm font-normal text-sm"
          title={TITLES.PREVIEW_BLOG}
        >
          Xem trước
        </Link>
      }
    >
      <BlogForm categories={categories} item={blog} />
    </Paper>
  );
};

export default EditBlogPage;
