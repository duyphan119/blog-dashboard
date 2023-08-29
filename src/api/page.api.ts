import client from "@/config/apolloClient";
import { ApolloQueryResult, gql } from "@apollo/client";
import { Blog } from "./blog.api";

export const DASHBOARD_PAGE = gql`
  query DashboardPage {
    dashboardPage {
      currentMonthCountBlog
      currentMonthCountReply
      mostViewBlogs {
        _id
        categories {
          name
        }
        slug
        title
        createdAt
      }
      recentBlogs {
        _id
        categories {
          name
        }
        slug
        title
        createdAt
      }
      previousMonthCountBlog
      previousMonthCountReply
    }
  }
`;

export type DashboardPage = {
  previousMonthCountBlog: number;
  previousMonthCountReply: number;
  currentMonthCountBlog: number;
  currentMonthCountReply: number;
  recentBlogs: Blog[];
  mostViewBlogs: Blog[];
};

export type DashboardPageResponse = {
  dashboardPage: DashboardPage;
};

export const pageApi = {
  dashboardPage: (): Promise<ApolloQueryResult<DashboardPageResponse>> =>
    client.query({
      query: DASHBOARD_PAGE,
    }),
};
