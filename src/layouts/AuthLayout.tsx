import { PROFILE, ProfileResponse } from "@/api/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { logout, setAuthor } from "@/redux/slice/auth.slice";
import { useQuery } from "@apollo/client";
import { FC, ReactNode, useEffect } from "react";

type Props = {
  children?: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  const appDispatch = useAppDispatch();

  const { data, error } = useQuery<ProfileResponse>(PROFILE);

  useEffect(() => {
    if (data) {
      if (data.profile) {
        appDispatch(setAuthor(data.profile));
      }
    }
    if (error) {
      appDispatch(logout());
    }
  }, [data, error]);

  return <>{children}</>;
};

export default AuthLayout;
