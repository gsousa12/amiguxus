import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../../not-found-page/NotFoundPage";
import { ProtectedRoute } from "../../protected-route/ProtectedRoute";
import { HomePage } from "@/modules/home/pages/home-page/HomePage";
import { SearchPage } from "@/modules/search/pages/search-page/SearchPage";
import { PetDetailsPage } from "@/modules/pets/pages/pet-details/PetDetails";
import { SignInPage } from "@/modules/users/pages/sign-in-page/SignIn";
import { SignUpPage } from "@/modules/users/pages/sign-up-page/SignUpPage";
import { PetRegisterPage } from "@/modules/pets/pages/pet-register/PetRegister";

export const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details" element={<PetDetailsPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/register" element={<PetRegisterPage />} />
        </Route>
      </Routes>
    </main>
  );
};
