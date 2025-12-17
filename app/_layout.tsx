import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { FavoritesProvider } from "../src/context/FavoritesContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="post/[id]"
            options={{
              title: "Post Details",
              headerShown: true,
            }}
          />
        </Stack>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}
