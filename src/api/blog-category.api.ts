import { AxiosResponse } from "axios";
import {
  PaginationParams,
  privateApi,
  publicApi,
  ResponseEntity,
  ResponseRows,
  SortParams,
} from ".";

const name = "blog-category";

export type BlogCategoryParams = Partial<{
  level: number;
  nested: boolean;
  depth: boolean;
  parent: boolean;
  children: boolean;
  name: string;
  description: string;
  keyword: string;
}> &
  SortParams &
  PaginationParams;

export type BlogCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  children: BlogCategory[];
  parent: BlogCategory | null;
  name: string;
  description: string;
  slug: string;
  thumbnail: string;
  level: number;
};

export type CreateBlogCategoryDTO = {
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  parentId: string;
};

const blogCategoryApi = {
  getAll: (
    params?: BlogCategoryParams
  ): Promise<AxiosResponse<ResponseEntity<ResponseRows<BlogCategory>>>> =>
    publicApi.get(name, params),
  getById: (
    blogCategoryId: string
  ): Promise<AxiosResponse<ResponseEntity<BlogCategory>>> =>
    publicApi.get(`${name}/${blogCategoryId}`),
  createOne: (
    dto: CreateBlogCategoryDTO
  ): Promise<AxiosResponse<ResponseEntity<BlogCategory>>> =>
    privateApi().post(name, dto),
  updateOne: (
    id: string,
    dto: Partial<CreateBlogCategoryDTO>
  ): Promise<AxiosResponse<ResponseEntity<BlogCategory>>> =>
    privateApi().patch(`${name}/${id}`, dto),
  softDelete: (
    ids: string[]
  ): Promise<AxiosResponse<ResponseEntity<boolean>>> =>
    privateApi().patch(`${name}/soft-delete`, { blogCategoryIds: ids }),
  restore: (ids: string[]): Promise<AxiosResponse<ResponseEntity<boolean>>> =>
    privateApi().patch(`${name}/restore`, { blogCategoryIds: ids }),
  delete: (ids: string[]): Promise<AxiosResponse<ResponseEntity<boolean>>> =>
    privateApi().delete(name, { blogCategoryIds: ids.join(",") }),
  trashGetAll: (
    params?: BlogCategoryParams
  ): Promise<AxiosResponse<ResponseEntity<ResponseRows<BlogCategory>>>> =>
    privateApi().get(`${name}/trash`, params),
};

export default blogCategoryApi;
