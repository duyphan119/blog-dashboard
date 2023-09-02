import { Category } from "@/api/category.api";
import { Paper } from "@/components";
import { CategoryForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { TITLES } from "@/utils/titles";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";

type Props = {};

const AddCategoryPage: FC<Props> = () => {
  useDocumentTitle(TITLES.CREATE_CATEGORY);
  const parents = useLoaderData() as Category[];

  return (
    <Paper title={TITLES.CREATE_CATEGORY}>
      <CategoryForm item={null} parents={parents} />
    </Paper>
  );
};

export default AddCategoryPage;
