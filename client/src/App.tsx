import { queryClient } from "./common/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./common/components/app/app-layout/AppLayout";
import { AppProvider } from "./common/components/providers/app-provider/AppProvider";
import { AuthProvider } from "./common/components/contexts/auth-context";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
