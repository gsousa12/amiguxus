import { queryClient } from "./common/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./common/components/app-layout/AppLayout";
import { AppProvider } from "./common/components/providers/app-provider/AppProvider";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <AppLayout />
    </AppProvider>
  </QueryClientProvider>
);

export default App;
