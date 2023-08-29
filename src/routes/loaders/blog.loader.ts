import { blogApi, BlogParams } from "@/api/blog.api";
import { categoryApi } from "@/api/category.api";
import { LoaderFunctionArgs } from "react-router-dom";

export const blogsLoader = async ({ request }: LoaderFunctionArgs) => {
  let [_, qs] = request.url.split("?");
  let obj: BlogParams = {};
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
    const { data } = await blogApi.blogs(obj);
    if (data) return data;
  } catch (error) {}
  return null;
};
export const deletedBlogsLoader = async ({ request }: LoaderFunctionArgs) => {
  let [_, qs] = request.url.split("?");
  let obj: BlogParams = {};
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
    const { data } = await blogApi.deletedBlogs(obj);
    if (data) return data;
  } catch (error) {}
  return null;
};

export const addBlogLoader = async (_: LoaderFunctionArgs) => {
  try {
    const { data } = await categoryApi.rootCategories();

    if (data) return data;
  } catch (error) {}
  return null;
};

export const editBlogLoader = async ({
  params: { blogId },
}: LoaderFunctionArgs) => {
  const data = [];
  try {
    const { data: data1 } = await categoryApi.rootCategories();
    if (data1) {
      data.push(data1);
    }
    if (blogId) {
      const { data: data2 } = await blogApi.blog(blogId);

      if (data2) data.push(data2);
    }
  } catch (error) {}
  return data;
};
export const previewBlogLoader = async ({
  params: { blogId },
}: LoaderFunctionArgs) => {
  if (blogId) {
    try {
      const { data } = await blogApi.blog(blogId);

      if (data) return data;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};
