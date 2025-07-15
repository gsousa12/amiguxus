import { ReactNode } from "react";

interface SearchPageWrapperProps {
  children: ReactNode;
}

export const SearchPageWrapper = ({ children }: SearchPageWrapperProps) => {
  return <div className="bg-gray-50 text-gray-900 p-8">{children}</div>;
};
