import client from "@/config/apolloClient";
import { ApolloQueryResult, FetchResult, gql } from "@apollo/client";
import { Author } from "./author.api";

export const PROFILE = gql`
  query Query {
    profile {
      name
      avatar
      uid
      _id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      accessToken
      author {
        avatar
        name
        _id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      accessToken
      author {
        avatar
        name
        _id
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($updateProfileInput: UpdateProfileInput) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      avatar
      name
      _id
    }
  }
`;

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  name: string;
} & LoginDTO;

export type RegisterInput = {
  registerInput: RegisterDTO;
};

export type LoginInput = {
  loginInput: LoginDTO;
};

export type AuthResponse = {
  author: Author;
  accessToken: string;
};

export type LoginResponse = {
  login: AuthResponse;
};

export type RegisterResponse = {
  register: AuthResponse;
};

export type UpdateProfileDTO = {
  name: string;
};

export type ProfileResponse = {
  profile: Author;
};

export type UpdateProfileInput = {
  updateProfileInput: UpdateProfileDTO;
};

export type UpdateProfileResponse = {
  updateProfile: Author;
};

export type LogoutResponse = {
  logout: boolean;
};

export const LOGOUT = gql`
  mutation Mutation {
    logout
  }
`;

export const authApi = {
  login: async (dto: LoginDTO): Promise<AuthResponse | null> => {
    try {
      const { data }: FetchResult<LoginResponse> = await client.mutate({
        mutation: LOGIN,
        variables: {
          loginInput: dto,
        },
      });
      if (data) return data.login;
    } catch (error) {}
    return null;
  },
  register: async (dto: RegisterDTO): Promise<AuthResponse | null> => {
    try {
      const { data }: FetchResult<RegisterResponse> = await client.mutate({
        mutation: REGISTER,
        variables: {
          registerInput: dto,
        },
      });
      if (data) return data.register;
    } catch (error) {}
    return null;
  },
  profile: async (): Promise<Author | null> => {
    try {
      const { data }: ApolloQueryResult<ProfileResponse> = await client.query({
        query: PROFILE,
      });
      return data.profile;
    } catch (error) {}
    return null;
  },
  updateProfile: async (dto: UpdateProfileDTO): Promise<Author | null> => {
    try {
      const { data }: FetchResult<UpdateProfileResponse> = await client.mutate({
        mutation: UPDATE_PROFILE,
        variables: {
          updateProfileInput: dto,
        },
      });
      if (data) return data.updateProfile;
    } catch (error) {}
    return null;
  },
  logout: async (): Promise<boolean> => {
    try {
      const { data }: FetchResult<LogoutResponse> = await client.mutate({
        mutation: LOGOUT,
      });
      if (data) return data.logout;
    } catch (error) {}
    return false;
  },
};
