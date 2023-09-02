import { client } from "@/config/apolloClient";
import { ApolloQueryResult, FetchResult, gql } from "@apollo/client";
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

export type UpdateBlogDTO = {
  id: string;
} & Partial<CreateBlogDTO>;

export type UpdateBlogInput = {
  updateBlogInput: UpdateBlogDTO;
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

export type Blogs = {
  blogs: Blog[];
  count: number;
  totalPages: number;
};

export type BlogsResponse = {
  blogs: Blogs;
};

export type BlogResponse = {
  blog: Blog;
};

export type DeletedBlogsResponse = {
  deletedBlogs: Blogs;
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
        thumbnail
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
  softDelete: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<SoftDeleteBlogsResponse> =
        await client.mutate({
          mutation: SOFT_DELETE_BLOGS,
          variables: {
            idList,
          },
        });
      if (data) return data.softDeleteBlogs;
    } catch (error) {}
    return false;
  },
  delete: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<DeleteBlogsResponse> = await client.mutate({
        mutation: DELETE_BLOGS,
        variables: {
          idList,
        },
      });
      if (data) return data.deleteBlogs;
    } catch (error) {}
    return false;
  },
  restore: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<RestoreBlogsResponse> = await client.mutate({
        mutation: RESTORE_BLOGS,
        variables: {
          idList,
        },
      });
      if (data) return data.restoreBlogs;
    } catch (error) {}
    return false;
  },
  blogs: async (params?: BlogParams): Promise<Blogs> => {
    try {
      const { data }: ApolloQueryResult<BlogsResponse> = await client.query({
        query: BLOGS,
        variables: {
          blogsInput: params || {},
        },
      });
      if (data) return data.blogs;
    } catch (error) {}
    return {
      blogs: [],
      count: 0,
      totalPages: 0,
    };
  },
  deletedBlogs: async (params?: BlogParams): Promise<Blogs> => {
    try {
      const { data }: ApolloQueryResult<DeletedBlogsResponse> =
        await client.query({
          query: DELETED_BLOGS,
          variables: {
            blogsInput: params || {},
          },
        });
      if (data) return data.deletedBlogs;
    } catch (error) {}
    return {
      blogs: [],
      count: 0,
      totalPages: 0,
    };
  },
  blog: async (blogId: string): Promise<Blog | null> => {
    try {
      const { data }: ApolloQueryResult<BlogResponse> = await client.query({
        query: BLOG,
        variables: {
          blogId,
        },
      });
      return data.blog;
    } catch (error) {}
    return null;
  },
  createBlog: async (dto: CreateBlogDTO): Promise<Blog | null> => {
    try {
      const { data }: FetchResult<CreateBlogResponse> = await client.mutate({
        mutation: CREATE_BLOG,
        variables: {
          createBlogInput: dto,
        },
      });
      if (data) return data.createBlog;
    } catch (error) {}
    return null;
  },
  updateBlog: async (dto: UpdateBlogDTO): Promise<boolean> => {
    try {
      const { data }: FetchResult<UpdateBlogResponse> = await client.mutate({
        mutation: UPDATE_BLOG,
        variables: {
          updateBlogInput: dto,
        },
      });
      if (data) return data.updateBlog;
    } catch (error) {}
    return false;
  },
};
