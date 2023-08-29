import { RootCategoriesResponse } from "@/api/category.api";
import { Paper } from "@/components";
import { BlogForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";

type Props = {};

const AddBlogPage: FC<Props> = () => {
  useDocumentTitle("Thêm mới bài viết");

  const data = useLoaderData() as RootCategoriesResponse | null;

  const categories = data?.rootCategories ?? [];

  return (
    <Paper title="Thêm mới bài viết">
      <BlogForm categories={categories} item={null} />
    </Paper>
  );
};

export default AddBlogPage;
