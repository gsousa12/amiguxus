import { AppRoutes } from "../app-routes/AppRoutes";
import { Header } from "../../header/header/Header";
import { GlobalLoader } from "../../loader/GlobalLoader";
import { GlobalWrapper } from "../../wrappers/global-wrapper/GlobalWrapper";

export const AppLayout = () => {
  return (
    <GlobalWrapper>
      <GlobalLoader />
      <>
        <Header />
        <AppRoutes />
      </>
    </GlobalWrapper>
  );
};
