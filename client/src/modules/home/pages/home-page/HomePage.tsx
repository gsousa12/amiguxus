import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { useAuthStore } from "@/common/stores/auth/auth-store";

export const HomePage = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  console.log(isAuthenticated);
  return <ContentWrapper>{isAuthenticated ?? <>Autenticado</>}</ContentWrapper>;
};
