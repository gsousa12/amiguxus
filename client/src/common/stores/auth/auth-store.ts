import { AuthStateType } from "./auth-store-types";
import { create } from "zustand";

export const useAuthStore = create<AuthStateType>((set, _) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
}));
