import { categoryApi, CategoryParams } from "@/api/category.api";
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

  try {
    const { data } = await categoryApi.categories(obj);
    if (data) return data;
  } catch (error) {}
  return null;
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

  try {
    const { data } = await categoryApi.deletedCategories(obj);
    if (data) return data;
  } catch (error) {}
  return null;
};

export const addCategoryLoader = async (_: LoaderFunctionArgs) => {
  try {
    const { data } = await categoryApi.rootCategories();

    if (data) return data;
  } catch (error) {}
  return null;
};

export const editCategoryLoader = async ({
  params: { categoryId },
}: LoaderFunctionArgs) => {
  const data = [];
  try {
    const { data: data1 } = await categoryApi.rootCategories();
    if (data1) {
      data.push(data1);
    }
    if (categoryId) {
      const { data: data2 } = await categoryApi.category(categoryId);

      if (data2) data.push(data2);
    }
  } catch (error) {}
  return data;
};
