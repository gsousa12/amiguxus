import { getUserInformationDispatch } from "@/common/api/dispatch/auth-dispatchs";
import { useAuthStore } from "@/common/stores/auth/auth-store";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthCtx {
  isLoading: boolean;
}

const AuthContext = createContext<AuthCtx>({ isLoading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, setAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const raw: any = await getUserInformationDispatch();
        let user = raw;
        while (user && typeof user === "object" && "data" in user) {
          user = user.data;
        }
        if (user && user.id) {
          setUser(user);
          setAuthenticated(true);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, setAuthenticated, logout]);

  if (isLoading) {
    return <div>Carregando aplicação...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
