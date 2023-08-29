import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type ActionPayload<Payload> = { payload: Payload; type: string };

export type AppDispatch = typeof store.dispatch;

export default store;
