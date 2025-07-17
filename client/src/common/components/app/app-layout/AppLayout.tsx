import { AppRoutes } from "../app-routes/AppRoutes";
import { Header } from "../../header/header/Header";
import { GlobalLoader } from "../../loader/GlobalLoader";
import { GlobalWrapper } from "../../wrappers/global-wrapper/GlobalWrapper";
import { Fragment } from "react/jsx-runtime";

export const AppLayout = () => {
  return (
    <GlobalWrapper>
      <GlobalLoader />
      <Fragment>
        <Header />
        <AppRoutes />
      </Fragment>
    </GlobalWrapper>
  );
};
