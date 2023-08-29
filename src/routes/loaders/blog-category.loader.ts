import blogCategoryApi, {
  BlogCategory,
  BlogCategoryParams,
} from "@/api/blog-category.api";
import { LoaderFunctionArgs } from "react-router-dom";

export const getAllBlogCategoriesLoader = async (
  { request }: LoaderFunctionArgs,
  params?: BlogCategoryParams,
  trash?: boolean
) => {
  let [_, qs] = request.url.split("?");
  let obj: BlogCategoryParams = { nested: false };
  if (qs) {
    let searchParams = new URLSearchParams(qs);
    let pageIndex = searchParams.get("pageIndex");
    let pageSize = searchParams.get("pageSize");
    let sortBy = searchParams.get("sortBy");
    let sortType = searchParams.get("sortType");
    let keyword = searchParams.get("keyword");
    if (pageIndex) {
      obj.p = +`${pageIndex}`;
    }
    if (pageSize) {
      obj.limit = +`${pageSize}`;
    }
    if (keyword) {
      obj.keyword = keyword;
    }
    if (sortBy && sortType) {
      obj.sortBy = sortBy;
      obj.sortType = sortType === "asc" ? "asc" : "desc";
    }
  }
  let rows: BlogCategory[] = [];
  let count = 0;
  try {
    const response = await (trash
      ? blogCategoryApi.trashGetAll({ ...obj, ...params })
      : blogCategoryApi.getAll({ ...obj, ...params }));
    const { data } = response.data;
    rows = data.rows;
    count = data.count;
  } catch (error) {
    console.log(error);
  }
  return { rows, count };
};

export const getBlogCategoryByIdLoader = async (
  { params: { blogCategoryId } }: LoaderFunctionArgs,
  params?: BlogCategoryParams
) => {
  let item: BlogCategory | null = null;
  let rows: BlogCategory[] = [];
  let count = 0;
  try {
    const [response1, response2] = await Promise.all([
      blogCategoryApi.getAll({ ...params }),
      blogCategoryApi.getById(`${blogCategoryId}`),
    ]);
    const { data: data1 } = response1.data;
    const { data: data2 } = response2.data;
    rows = data1.rows;
    count = data1.count;
    if (data2) {
      item = data2;
    }
  } catch (error) {
    console.log(error);
  }
  return { rows, count, item };
};
