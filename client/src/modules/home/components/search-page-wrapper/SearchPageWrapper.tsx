export const SearchPageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <main
    /* h-full garante que o flex-grow funcione; 
       min-h calcula a área visível sem header */
    className="flex min-h-[calc(100vh-4rem)] flex-col bg-white px-4 py-8 md:px-8"
  >
    {children}
  </main>
);
