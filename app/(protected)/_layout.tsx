import { ErrorFallback } from "@/src/components/ui/ErrorFallback";
import LoadingIndicator from "@/src/components/ui/LoadingIndicator";
import { Redirect, Stack } from "expo-router";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "../../src/context/AuthContext";

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingIndicator full />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="posts/[id]"
          options={{
            title: "News Details",
            headerShown: true,
          }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
