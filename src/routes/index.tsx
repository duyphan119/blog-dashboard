import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  addBlogLoader,
  blogsLoader,
  deletedBlogsLoader,
  editBlogLoader,
  previewBlogLoader,
} from "./loaders/blog.loader";
import {
  addCategoryLoader,
  categoriesLoader,
  deletedCategoriesLoader,
  editCategoryLoader,
} from "./loaders/category.loader";
import { lazy } from "react";
import { homePageLoader } from "./loaders/homePage.loader";
import { contactsLoader } from "./loaders/contact.loader";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const DefaultLayout = lazy(() => import("@/layouts/DefaultLayout"));
const TrashBlogsPage = lazy(() => import("@/pages/TrashBlogsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const BlogPreviewPage = lazy(() => import("@/pages/BlogPreviewPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const AddBlogPage = lazy(() => import("@/pages/AddBlogPage"));
const EditBlogPage = lazy(() => import("@/pages/EditBlogPage"));
const BlogsPage = lazy(() => import("@/pages/BlogsPage"));
const AddCategoryPage = lazy(() => import("@/pages/AddCategoryPage"));
const EditCategoryPage = lazy(() => import("@/pages/EditCategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const TrashCategoriesPage = lazy(() => import("@/pages/TrashCategoriesPage"));
const ContactsPage = lazy(() => import("@/pages/ContactsPage"));

const router = createBrowserRouter([
  {
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "/",
            loader: homePageLoader,
            element: <HomePage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "blogs",
            loader: blogsLoader,
            element: <BlogsPage />,
          },
          {
            path: "blogs/add",
            loader: addBlogLoader,
            element: <AddBlogPage />,
          },
          {
            path: "blogs/edit/:blogId",
            loader: editBlogLoader,
            element: <EditBlogPage />,
          },
          {
            path: "blogs/preview/:blogId",
            loader: previewBlogLoader,
            element: <BlogPreviewPage />,
          },
          {
            path: "blogs/trash",
            loader: deletedBlogsLoader,
            element: <TrashBlogsPage />,
          },
          {
            path: "categories",
            loader: categoriesLoader,
            element: <CategoriesPage />,
          },
          {
            path: "categories/add",
            loader: addCategoryLoader,
            element: <AddCategoryPage />,
          },
          {
            path: "categories/edit/:categoryId",
            loader: editCategoryLoader,
            element: <EditCategoryPage />,
          },
          {
            path: "categories/trash",
            loader: deletedCategoriesLoader,
            element: <TrashCategoriesPage />,
          },
          {
            path: "contacts",
            loader: contactsLoader,
            element: <ContactsPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
export default router;
