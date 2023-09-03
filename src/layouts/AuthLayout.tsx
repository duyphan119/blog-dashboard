import { PROFILE, ProfileResponse } from "@/api/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { logout, setAuthor } from "@/redux/slice/auth.slice";
import { useQuery } from "@apollo/client";
import { FC, ReactNode, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  const appDispatch = useAppDispatch();

  const { data, error } = useQuery<ProfileResponse>(PROFILE);

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.profile) {
        appDispatch(setAuthor(data.profile));
      }
    }
    if (error) {
      appDispatch(logout());
    }
    setFetched(true);
  }, [data, error]);

  if (!fetched) return <></>;
  return <>{children}</>;
};

export default AuthLayout;
