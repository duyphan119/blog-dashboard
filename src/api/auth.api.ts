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

export const NEW_ACCESS_TOKEN = gql`
  mutation Mutation {
    newAccessToken
  }
`;

const authApi = {
  login: (dto: LoginDTO): Promise<FetchResult<LoginResponse>> =>
    client.mutate({
      mutation: LOGIN,
      variables: {
        loginInput: dto,
      },
    }),
  register: (dto: RegisterDTO): Promise<FetchResult<RegisterResponse>> =>
    client.mutate({
      mutation: REGISTER,
      variables: {
        registerInput: dto,
      },
    }),
  profile: (): Promise<ApolloQueryResult<ProfileResponse>> =>
    client.query({
      query: PROFILE,
    }),
  updateProfile: (
    dto: UpdateProfileDTO
  ): Promise<FetchResult<UpdateProfileResponse>> =>
    client.mutate({
      mutation: UPDATE_PROFILE,
      variables: {
        updateProfileInput: dto,
      },
    }),
  newAccessToken: (): Promise<FetchResult<{ newAccessToken: string }>> =>
    client.mutate({
      mutation: NEW_ACCESS_TOKEN,
    }),
};

export default authApi;