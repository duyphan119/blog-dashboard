import { privateClient } from "@/config/apolloClient";
import { gql } from "@apollo/client";
import { Author } from "./author.api";
import { Category } from "./category.api";

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  author: Author;
  content: string;
  categories: Category[];
  categoryIds: string[];
  thumbnail: string;
};

export type CreateBlogDTO = {
  title: string;
  content: string;
  slug?: string;
  thumbnail?: string;
  categoryIds: string[];
};

export type CreateBlogInput = {
  createBlogInput: CreateBlogDTO;
};

export type UpdateBlogInput = {
  updateBlogInput: {
    id: string;
  } & Partial<CreateBlogDTO>;
};

export type BlogParams = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
  keyword: string;
  slug: string;
  categoryIds: string[];
  matchAllCategoryIds: boolean;
}>;

export type BlogsInput = {
  blogsInput: BlogParams;
};

export type CreateBlogResponse = {
  createBlog: Blog;
};

export type UpdateBlogResponse = {
  updateBlog: boolean;
};

export type DeleteBlogsResponse = {
  deleteBlogs: boolean;
};

export type SoftDeleteBlogsResponse = {
  softDeleteBlogs: boolean;
};

export type RestoreBlogsResponse = {
  restoreBlogs: boolean;
};

export type BlogsResponse = {
  blogs: {
    blogs: Category[];
    count: number;
    totalPages: number;
  };
};

export type BlogResponse = {
  blog: Blog;
};

export type DeletedBlogsResponse = {
  deletedBlogs: {
    blogs: Category[];
    count: number;
    totalPages: number;
  };
};

export const CREATE_BLOG = gql`
  mutation Mutation($createBlogInput: CreateBlogInput) {
    createBlog(createBlogInput: $createBlogInput) {
      _id
      createdAt
      deletedAt
      title
      content
      authorId
      slug
      updatedAt
    }
  }
`;

export const BLOG = gql`
  query Query($blogId: String) {
    blog(id: $blogId) {
      _id
      title
      createdAt
      slug
      content
      thumbnail
      author {
        _id
        name
      }
      categoryIds
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($updateBlogInput: UpdateBlogInput) {
    updateBlog(updateBlogInput: $updateBlogInput)
  }
`;

export const SOFT_DELETE_BLOGS = gql`
  mutation SoftDeleteBlogs($idList: [String]) {
    softDeleteBlogs(idList: $idList)
  }
`;

export const DELETE_BLOGS = gql`
  mutation DeleteBlogs($idList: [String]) {
    deleteBlogs(idList: $idList)
  }
`;

export const RESTORE_BLOGS = gql`
  mutation RestoreBlogs($idList: [String]) {
    restoreBlogs(idList: $idList)
  }
`;

export const BLOGS = gql`
  query Query($blogsInput: BlogsInput) {
    blogs(blogsInput: $blogsInput) {
      blogs {
        _id
        createdAt
        title
        slug
        updatedAt
        author {
          _id
          name
        }
        categories {
          _id
          name
        }
      }
      count
      totalPages
    }
  }
`;

export const DELETED_BLOGS = gql`
  query Query($blogsInput: BlogsInput) {
    deletedBlogs(blogsInput: $blogsInput) {
      blogs {
        _id
        createdAt
        title
        content
        slug
        updatedAt
        author {
          _id
          name
        }
      }
      count
      totalPages
    }
  }
`;

export const blogApi = {
  softDelete: (idList: string[]) =>
    privateClient().mutate({
      mutation: SOFT_DELETE_BLOGS,
      variables: {
        idList,
      },
    }),
  delete: (idList: string[]) =>
    privateClient().mutate({
      mutation: DELETE_BLOGS,
      variables: {
        idList,
      },
    }),
  restore: (idList: string[]) =>
    privateClient().mutate({
      mutation: RESTORE_BLOGS,
      variables: {
        idList,
      },
    }),
  blogs: (params: BlogParams) =>
    privateClient().query({
      query: BLOGS,
      variables: {
        blogsInput: params,
      },
    }),
  deletedBlogs: (params: BlogParams) =>
    privateClient().query({
      query: DELETED_BLOGS,
      variables: {
        blogsInput: params,
      },
    }),
  blog: (blogId: string) =>
    privateClient().query({
      query: BLOG,
      variables: {
        blogId,
      },
    }),
};
