export const SearchPageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <main className="flex min-h-[calc(100vh-4rem)] flex-col bg-white px-4 py-8 md:px-8">
    {children}
  </main>
);
