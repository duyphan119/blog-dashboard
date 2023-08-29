import { RootCategoriesResponse } from "@/api/category.api";
import { Paper } from "@/components";
import { CategoryForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";

type Props = {};

const AddCategoryPage: FC<Props> = () => {
  useDocumentTitle("Thêm mới danh mục bài viết");
  const data = useLoaderData() as RootCategoriesResponse | null;

  const parents = data?.rootCategories ?? [];

  return (
    <Paper title="Thêm mới danh mục bài viết">
      <CategoryForm item={null} parents={parents} />
    </Paper>
  );
};

export default AddCategoryPage;
