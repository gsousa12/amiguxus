import { validateUserDispatch } from "@/common/api/dispatch/auth-dispatchs";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

interface AuthCtx {
  isAuth: boolean | null;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({
  isAuth: null,
  refreshAuth: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const location = useLocation();

  const checkAuth = useCallback(async () => {
    const ok = await validateUserDispatch();
    setIsAuth(ok);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuth, refreshAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
