import { AuthForm } from "@/components/forms";
import { useDocumentTitle } from "@/hooks";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthor } from "@/redux/slice/auth.slice";
import { ROUTES } from "@/utils/routes";
import { TITLES } from "@/utils/titles";
import { FC } from "react";
import { Navigate } from "react-router-dom";

type Props = {};

const LoginPage: FC<Props> = () => {
  useDocumentTitle(TITLES.LOGIN);
  const user = useAppSelector(selectAuthor);
  if (user) return <Navigate to={ROUTES.HOME} />;
  return <AuthForm />;
};

export default LoginPage;
