import { Category } from "@/api/category.api";
import { Paper } from "@/components";
import { BlogForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { TITLES } from "@/utils/titles";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";

type Props = {};

const AddBlogPage: FC<Props> = () => {
  useDocumentTitle(TITLES.CREATE_BLOG);

  const categories = useLoaderData() as Category[];

  return (
    <Paper title={TITLES.CREATE_BLOG}>
      <BlogForm categories={categories} item={null} />
    </Paper>
  );
};

export default AddBlogPage;
