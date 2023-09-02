import { client } from "@/config/apolloClient";
import { ApolloQueryResult, FetchResult, gql } from "@apollo/client";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  parent: Category | null;
  children: Category[];
};

export type CreateCategoryDTO = {
  name: string;
  parentId: string | null;
  slug?: string;
};

export type CreateCategoryInput = {
  createCategoryInput: CreateCategoryDTO;
};

export type UpdateCategoryInput = {
  updateCategoryInput: {
    id: string;
    name?: string;
    parentId?: string | null;
    slug?: string;
  };
};

export type CategoryParams = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
  keyword: string;
}>;

export type CategoriesInput = {
  categoriesInput: CategoryParams;
};

export type CategoryResponse = {
  category: Category;
};

export type CreateCategoryResponse = {
  createCategory: Category;
};

export type UpdateCategoryResponse = {
  updateCategory: boolean;
};

export type DeleteCategoriesResponse = {
  deleteCategories: boolean;
};

export type SoftDeleteCategoriesResponse = {
  softDeleteCategories: boolean;
};

export type RestoreCategoriesResponse = {
  restoreCategories: boolean;
};

export type RootCategoriesResponse = {
  rootCategories: Category[];
};

export type Categories = {
  categories: Category[];
  count: number;
  totalPages: number;
};

export type CategoriesResponse = {
  categories: Categories;
};

export type DeletedCategoriesResponse = {
  deletedCategories: Categories;
};

export const CREATE_CATEGORY = gql`
  mutation Mutation($createCategoryInput: CreateCategoryInput) {
    createCategory(createCategoryInput: $createCategoryInput) {
      _id
      createdAt
      deletedAt
      name
      parentId
      slug
      updatedAt
    }
  }
`;

export const CATEGORY = gql`
  query Query($categoryId: String) {
    category(id: $categoryId) {
      _id
      createdAt
      deletedAt
      name
      parentId
      slug
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput) {
    updateCategory(updateCategoryInput: $updateCategoryInput)
  }
`;

export const SOFT_DELETE_CATEGORIES = gql`
  mutation SoftDeleteCategories($idList: [String]) {
    softDeleteCategories(idList: $idList)
  }
`;

export const DELETE_CATEGORIES = gql`
  mutation DeleteCategories($idList: [String]) {
    deleteCategories(idList: $idList)
  }
`;

export const RESTORE_CATEGORIES = gql`
  mutation RestoreCategories($idList: [String]) {
    restoreCategories(idList: $idList)
  }
`;

export const ROOT_CATEGORIES = gql`
  query Query {
    rootCategories {
      _id
      name
      children {
        _id
        name
      }
    }
  }
`;

export const CATEGORIES = gql`
  query Query($categoriesInput: CategoriesInput) {
    categories(categoriesInput: $categoriesInput) {
      categories {
        _id
        createdAt
        name
        parentId
        slug
        updatedAt
        parent {
          _id
          name
        }
      }
      count
      totalPages
    }
  }
`;

export const DELETED_CATEGORIES = gql`
  query Query($categoriesInput: CategoriesInput) {
    deletedCategories(categoriesInput: $categoriesInput) {
      categories {
        _id
        createdAt
        name
        parentId
        slug
        updatedAt
        parent {
          _id
          name
        }
      }
      count
      totalPages
    }
  }
`;

export const categoryApi = {
  softDelete: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<SoftDeleteCategoriesResponse> =
        await client.mutate({
          mutation: SOFT_DELETE_CATEGORIES,
          variables: {
            idList,
          },
        });
      if (data) return data.softDeleteCategories;
    } catch (error) {}
    return false;
  },
  delete: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<DeleteCategoriesResponse> =
        await client.mutate({
          mutation: DELETE_CATEGORIES,
          variables: {
            idList,
          },
        });
      if (data) return data.deleteCategories;
    } catch (error) {}
    return false;
  },
  restore: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<RestoreCategoriesResponse> =
        await client.mutate({
          mutation: RESTORE_CATEGORIES,
          variables: {
            idList,
          },
        });
      if (data) return data.restoreCategories;
    } catch (error) {}
    return false;
  },
  categories: async (params?: CategoryParams): Promise<Categories> => {
    try {
      const { data }: ApolloQueryResult<CategoriesResponse> =
        await client.query({
          query: CATEGORIES,
          variables: {
            categoriesInput: params,
          },
        });
      if (data) return data.categories;
    } catch (error) {}
    return {
      categories: [],
      count: 0,
      totalPages: 0,
    };
  },
  deletedCategories: async (params?: CategoryParams): Promise<Categories> => {
    try {
      const { data }: ApolloQueryResult<DeletedCategoriesResponse> =
        await client.query({
          query: DELETED_CATEGORIES,
          variables: {
            categoriesInput: params,
          },
        });
      if (data) return data.deletedCategories;
    } catch (error) {}
    return {
      categories: [],
      count: 0,
      totalPages: 0,
    };
  },
  rootCategories: async (): Promise<Category[]> => {
    try {
      const { data }: ApolloQueryResult<RootCategoriesResponse> =
        await client.query({
          query: ROOT_CATEGORIES,
        });
      if (data) return data.rootCategories;
    } catch (error) {}
    return [];
  },
  category: async (categoryId: string): Promise<Category | null> => {
    try {
      const { data }: ApolloQueryResult<CategoryResponse> = await client.query({
        query: CATEGORY,
        variables: {
          categoryId,
        },
      });
      if (data) return data.category;
    } catch (error) {}
    return null;
  },
};
