import { AuthForm } from "@/components/forms";
import { ROUTES } from "@/constants";
import { useDocumentTitle } from "@/hooks";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthor } from "@/redux/slice/auth.slice";
import { FC } from "react";
import { Navigate } from "react-router-dom";

type Props = {};

const LoginPage: FC<Props> = () => {
  useDocumentTitle("Đăng nhập");
  const user = useAppSelector(selectAuthor);
  if (user) return <Navigate to={ROUTES.ADMIN} />;
  return (
    <>
      <AuthForm />
    </>
  );
};

export default LoginPage;
