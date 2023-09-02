import { pageApi } from "@/api/page.api";
import { LoaderFunctionArgs } from "react-router-dom";

export const homePageLoader = async (_: LoaderFunctionArgs) => {
  return await pageApi.dashboardPage();
};
