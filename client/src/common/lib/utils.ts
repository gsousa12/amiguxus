import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserId = (): number | null => {
  try {
    const raw = sessionStorage.getItem("user");
    return raw ? JSON.parse(raw).userId : null;
  } catch {
    return null;
  }
};

export const getUserName = (): string | null => {
  try {
    const raw = sessionStorage.getItem("user");
    return raw ? JSON.parse(raw).name : null;
  } catch {
    return null;
  }
};
