import { BlogResponse } from "@/api/blog.api";
import { RootCategoriesResponse } from "@/api/category.api";
import { Paper } from "@/components";
import { BlogForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";

type Props = {};

const EditBlogPage: FC<Props> = () => {
  useDocumentTitle("Sửa bài viết");

  const [data1, data2] = useLoaderData() as [
    RootCategoriesResponse,
    BlogResponse
  ];
  const categories = data1?.rootCategories ?? [];
  const blog = data2?.blog ?? null;
  if (!blog) return <>404</>;
  const title = (
    <div className="flex justify-between items-center">
      <div className="">Sửa bài viết</div>
      <Link
        to={`/blog/preview/${blog._id}`}
        className="px-4 py-1 bg-purple text-white rounded-sm font-normal text-sm"
        title="Xem trước bài viết"
      >
        Xem trước
      </Link>
    </div>
  );
  return (
    <Paper title={title}>
      <BlogForm categories={categories} item={blog} />
    </Paper>
  );
};

export default EditBlogPage;
