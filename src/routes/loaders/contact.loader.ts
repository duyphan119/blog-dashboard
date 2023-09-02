import api from "@/api";
import { ContactParams } from "@/api/contact.api";
import { LoaderFunctionArgs } from "react-router-dom";

export const contactsLoader = async ({ request }: LoaderFunctionArgs) => {
  let [_, qs] = request.url.split("?");
  let obj: ContactParams = {};
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

  const data = await api.contact.contacts(obj);
  return data;
};
