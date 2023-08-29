export const PUBLIC_ROUTES = {
  DEFAULT: "/",
  ADMIN: {
    DEFAULT: "/admin",
  },
};

export const ROUTES = {
  ADMIN: "/",
  BLOGS: "/blogs",
  BLOG_CATEGORIES: "/blog-categories",
  TRASH_BLOGS: "/trash/blogs",
  TRASH_BLOG_CATEGORIES: "/trash/blog-categories",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
};

export const IS_NEXT_RESPONSE_EMPTY = {
  rows: [],
  isNext: false,
};
export const PAGINATION_RESPONSE_EMPTY = {
  rows: [],
  count: 0,
  total_pages: 0,
};
export const DEFAULT_LIMIT = 10;
export const DEFAULT_PAGE = 1;
export const HOME_PAGE = {
  LIMIT_NEWS: 4,
  LIMIT_VANBAN: 10,
};
export const PLACEHOLDER_THUMBNAIL = "/images/placeholder-thumbnail.jfif";
export const HEADER_HEIGHT = 80;
export const DASHBOARD = {
  SIDEBAR_WIDTH: 286,
  HEADER_HEIGHT: 80,
};
export const ACCESS_TOKEN_KEY = "access_token";
export const API_KEY_TINYMCE = `${import.meta.env.VITE_API_KEY_TINYMCE}`;
export const SERVER =
  import.meta.env.VITE_NODE_ENV === "production"
    ? `${import.meta.env.VITE_SERVER}`
    : "http://localhost:4000";
export const WS_GRAPHQL_SERVER =
  import.meta.env.VITE_NODE_ENV === "production"
    ? `${import.meta.env.VITE_WS_GRAPHQL_SERVER}`
    : "ws://localhost:4000/graphql";
