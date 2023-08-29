import { ACCESS_TOKEN_KEY } from "@/constants";
import axios from "axios";

const option = {
  baseURL: "http://localhost:4646",
  withCredentials: true,
};

const instance = axios.create(option);

export type SortParams = Partial<{
  sortBy: string;
  sortType: string;
}>;

export type PaginationParams = Partial<{
  p: number;
  limit: number;
}>;

export type ResponseRows<Entity> = {
  rows: Entity[];
  count: number;
};

export type ResponseEntity<Entity> = {
  data: Entity;
  message: string;
};

export const publicApi = {
  get: (url: string, params?: any) => instance.get(url, { params }),
  post: (url: string, body?: any) => instance.post(url, body),
  patch: (url: string, body?: any) => instance.patch(url, body),
  delete: (url: string) => instance.delete(url),
};

export const privateApi = () => {
  const tokenInstance = axios.create({
    ...option,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    },
  });
  return {
    get: (url: string, params?: any) => tokenInstance.get(url, { params }),
    post: (url: string, body?: any) => tokenInstance.post(url, body),
    patch: (url: string, body?: any) => tokenInstance.patch(url, body),
    delete: (url: string, params?: any) =>
      tokenInstance.delete(url, { params }),
  };
};
