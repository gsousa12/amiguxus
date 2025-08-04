import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserJwtPayload = {
  id: string;
  full_name: string;
  email: string;
};

export type AuthStateType = {
  isAuthenticated: boolean;
  user: UserJwtPayload | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: UserJwtPayload | null) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStateType>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
