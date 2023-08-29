import { FC, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "toastify-js/src/toastify.css";
import "./App.css";
import GlobalLoading from "./components/GlobalLoading";
import ScrollToTop from "./components/ScrollToTop";
import router from "./routes";

type Props = {};

const App: FC<Props> = () => {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <ScrollToTop />
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
