import { AppProviders } from "@/src/providers/AppProviders";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AppProviders>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </SafeAreaProvider>
    </AppProviders>
  );
}
