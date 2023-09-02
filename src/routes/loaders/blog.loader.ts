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

  return await blogApi.blogs(obj);
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

  return await blogApi.deletedBlogs(obj);
};

export const addBlogLoader = async (_: LoaderFunctionArgs) => {
  return await categoryApi.rootCategories();
};

export const editBlogLoader = async ({
  params: { blogId },
}: LoaderFunctionArgs) => {
  const data = [];
  const data1 = await categoryApi.rootCategories();
  data.push(data1);
  if (blogId) {
    const data2 = await blogApi.blog(blogId);

    data.push(data2);
  }
  return data;
};
export const previewBlogLoader = async ({
  params: { blogId },
}: LoaderFunctionArgs) => {
  if (blogId) {
    return await blogApi.blog(blogId);
  }
  return null;
};
