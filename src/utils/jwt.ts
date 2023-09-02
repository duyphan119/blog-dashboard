import { JwtPayload } from "@/types";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { ACCESS_TOKEN_KEY } from "@/utils/constants";

export const decodeToken = (token: string): JwtPayload => {
  const payload: JwtPayload = jwtDecode(token);
  return payload;
};

export const getAccessToken = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get(ACCESS_TOKEN_KEY);
  return accessToken || "";
};

export const saveAccessToken = (accessToken: string) => {
  const cookies = new Cookies();
  cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  });
};

export const removeAccessToken = () => {
  const cookies = new Cookies();
  cookies.remove(ACCESS_TOKEN_KEY);
};
