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

export const getOnlyFirstName = (name: string): string => {
  const parts = name.split(" ");
  if (parts.length > 1) {
    return parts[0];
  } else {
    return name;
  }
};

export const formatPhone = (phone: string) =>
  phone
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");

export const STATE_SIGLAS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;
