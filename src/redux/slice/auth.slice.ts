import { AuthResponse } from "@/api/auth.api";
import { Author } from "@/api/author.api";
import {
  getAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "@/utils/jwt";
import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, RootState } from "../store";

const name = "auth";

type State = {
  author: Author | null;
  accessToken: string;
};

const authSlice = createSlice({
  name,
  initialState: {
    author: null,
    accessToken: getAccessToken(),
  } as State,
  reducers: {
    login: (state, { payload }: ActionPayload<AuthResponse>) => {
      state.author = payload.author;
      state.accessToken = payload.accessToken;
      saveAccessToken(state.accessToken);
    },
    logout: (state) => {
      state.author = null;
      state.accessToken = "";
      removeAccessToken();
    },
    setAuthor: (state, { payload }: ActionPayload<Author>) => {
      state.author = payload;
    },
  },
});

export const { login, logout, setAuthor } = authSlice.actions;

export const selectAuthor = (state: RootState) => state.auth.author;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

const authReducer = authSlice.reducer;

export default authReducer;
