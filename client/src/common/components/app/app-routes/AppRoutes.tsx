import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../../not-found-page/NotFoundPage";
import { ProtectedRoute } from "../../protected-route/ProtectedRoute";
import { HomePage } from "@/modules/home/pages/home-page/HomePage";
import { SearchPage } from "@/modules/search/pages/search-page/SearchPage";

export const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </main>
  );
};
