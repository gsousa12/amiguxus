// src/contexts/AuthContext.tsx
import { validateUserDispatch } from "@/common/api/dispatch/auth-dispatchs";
import { getUserId } from "@/common/lib/utils";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

interface AuthCtx {
  isAuth: boolean | null; // null = carregando
  refreshAuth: () => Promise<void>; // expõe se você quiser disparar manualmente
}

const AuthContext = createContext<AuthCtx>({
  isAuth: null,
  refreshAuth: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const location = useLocation(); // detecta mudança de rota

  const checkAuth = useCallback(async () => {
    const ok = await validateUserDispatch(getUserId());
    setIsAuth(ok);
  }, []);

  /* Valida 1) na montagem e 2) sempre que a rota mudar */
  useEffect(() => {
    checkAuth();
  }, [checkAuth, location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuth, refreshAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/* Hook de conveniência */
export const useAuth = () => useContext(AuthContext);
