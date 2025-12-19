import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/src/context/AuthContext";
import { FavoritesProvider } from "@/src/context/FavoritesContext";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
