import { categoryApi, CategoryParams } from "@/api/category.api";
import { DEFAULT_LIMIT } from "@/utils/constants";
import { LoaderFunctionArgs } from "react-router-dom";

export const categoriesLoader = async ({ request }: LoaderFunctionArgs) => {
  let [_, qs] = request.url.split("?");
  let obj: CategoryParams = {};
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
  if (!obj.limit) {
    obj.limit = DEFAULT_LIMIT;
  }

  return await categoryApi.categories(obj);
};
export const deletedCategoriesLoader = async ({
  request,
}: LoaderFunctionArgs) => {
  let [_, qs] = request.url.split("?");
  let obj: CategoryParams = {};
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
  if (!obj.limit) {
    obj.limit = DEFAULT_LIMIT;
  }

  return await categoryApi.deletedCategories(obj);
};

export const addCategoryLoader = async (_: LoaderFunctionArgs) => {
  return await categoryApi.rootCategories();
};

export const editCategoryLoader = async ({
  params: { categoryId },
}: LoaderFunctionArgs) => {
  const data = [];
  const data1 = await categoryApi.rootCategories();
  data.push(data1);
  if (categoryId) {
    const data2 = await categoryApi.category(categoryId);
    data.push(data2);
  }
  return data;
};
