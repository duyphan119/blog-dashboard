import { Category } from "@/api/category.api";
import { Paper } from "@/components";
import { CategoryForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { TITLES } from "@/utils/titles";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";

type Props = {};

const EditCategoryPage: FC<Props> = () => {
  useDocumentTitle(TITLES.UPDATE_CATEGORY);

  const [parents, blog] = useLoaderData() as [Category[], Category | null];

  return (
    <Paper title={TITLES.UPDATE_CATEGORY}>
      <CategoryForm item={blog} parents={parents} />
    </Paper>
  );
};

export default EditCategoryPage;
