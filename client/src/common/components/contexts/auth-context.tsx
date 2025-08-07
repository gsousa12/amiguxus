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
    return (
      <div
        role="status"
        aria-busy="true"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-rose-50 to-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span
            className="absolute left-6 top-8 text-6xl opacity-20 motion-safe:animate-bounce"
            style={{ animationDuration: "2.2s" }}
          >
            🐶
          </span>
          <span
            className="absolute right-10 top-24 text-5xl opacity-20 motion-safe:animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            🐱
          </span>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 text-5xl opacity-20 motion-safe:animate-pulse">
            🐰
          </span>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 text-5xl opacity-20 motion-safe:animate-pulse">
            🐹
          </span>
          <span
            className="absolute bottom-10 left-10 text-7xl opacity-10 motion-safe:animate-bounce"
            style={{ animationDuration: "2.6s" }}
          >
            🐾
          </span>
          <span
            className="absolute bottom-16 right-8 text-6xl opacity-10 motion-safe:animate-bounce"
            style={{ animationDuration: "2.8s" }}
          >
            🐾
          </span>
          <span className="absolute left-1/3 top-12 text-4xl opacity-10 motion-safe:animate-pulse">
            🐶
          </span>
          <span className="absolute right-1/4 bottom-12 text-4xl opacity-10 motion-safe:animate-pulse">
            🐱
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3 rounded-2xl bg-white/60 px-6 py-5 backdrop-blur">
          <p className="text-sm font-medium text-rose-800">
            Carregando aplicação...
          </p>
        </div>

        <span className="sr-only">Carregando aplicação...</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
