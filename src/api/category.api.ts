import { privateClient } from "@/config/apolloClient";
import { gql } from "@apollo/client";

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

export type CategoriesResponse = {
  categories: {
    categories: Category[];
    count: number;
    totalPages: number;
  };
};

export type DeletedCategoriesResponse = {
  deletedCategories: {
    categories: Category[];
    count: number;
    totalPages: number;
  };
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
  softDelete: (idList: string[]) =>
    privateClient().mutate({
      mutation: SOFT_DELETE_CATEGORIES,
      variables: {
        idList,
      },
    }),
  delete: (idList: string[]) =>
    privateClient().mutate({
      mutation: DELETE_CATEGORIES,
      variables: {
        idList,
      },
    }),
  restore: (idList: string[]) =>
    privateClient().mutate({
      mutation: RESTORE_CATEGORIES,
      variables: {
        idList,
      },
    }),
  categories: (params: CategoryParams) =>
    privateClient().query({
      query: CATEGORIES,
      variables: {
        categoriesInput: params,
      },
    }),
  deletedCategories: (params: CategoryParams) =>
    privateClient().query({
      query: DELETED_CATEGORIES,
      variables: {
        categoriesInput: params,
      },
    }),
  rootCategories: () =>
    privateClient().query({
      query: ROOT_CATEGORIES,
    }),
  category: (categoryId: string) =>
    privateClient().query({
      query: CATEGORY,
      variables: {
        categoryId,
      },
    }),
};
