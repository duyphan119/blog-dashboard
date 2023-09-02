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
        thumbnail
        createdAt
      }
      recentBlogs {
        _id
        categories {
          name
        }
        slug
        title
        thumbnail
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
  dashboardPage: async (): Promise<DashboardPage> => {
    try {
      const { data }: ApolloQueryResult<DashboardPageResponse> =
        await client.query({
          query: DASHBOARD_PAGE,
        });
      if (data) return data.dashboardPage;
    } catch (error) {}
    return {
      currentMonthCountBlog: 0,
      currentMonthCountReply: 0,
      mostViewBlogs: [],
      previousMonthCountBlog: 0,
      previousMonthCountReply: 0,
      recentBlogs: [],
    };
  },
};
