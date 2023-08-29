import { pageApi } from "@/api/page.api";
import { LoaderFunctionArgs } from "react-router-dom";

export const homePageLoader = async (_: LoaderFunctionArgs) => {
  try {
    const { data } = await pageApi.dashboardPage();
    if (data) return data.dashboardPage;
  } catch (error) {
    console.log(error);
  }
  return {
    recentBlogs: [],
    mostViewBlogs: [],
    currentMonthCountBlog: 0,
    previousMonthCountBlog: 0,
    currentMonthCountReply: 0,
    previousMonthCountReply: 0,
  };
};
