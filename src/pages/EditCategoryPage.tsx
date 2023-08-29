import { CategoryResponse, RootCategoriesResponse } from "@/api/category.api";
import { Paper } from "@/components";
import { CategoryForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";

type Props = {};

const EditCategoryPage: FC<Props> = () => {
  useDocumentTitle("Sửa danh mục bài viết");

  const [data1, data2] = useLoaderData() as [
    RootCategoriesResponse,
    CategoryResponse
  ];
  console.log(data2);
  const parents = data1?.rootCategories ?? [];
  const item = data2?.category ?? null;

  return (
    <Paper title="Sửa danh mục bài viết">
      <CategoryForm item={item} parents={parents} />
    </Paper>
  );
};

export default EditCategoryPage;
