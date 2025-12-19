import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import Center from "./Center";

interface ErrorFallbackProps {
  error: Error;
  retry?: () => Promise<void>;
  resetErrorBoundary?: (...args: any[]) => void;
}

export function ErrorFallback({
  error,
  retry,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const handleRetry = () => {
    if (retry) retry();
    if (resetErrorBoundary) resetErrorBoundary();
  };

  return (
    <Center style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color={Colors.tint} />
      <Text style={styles.title}>Oops! Something went wrong</Text>
      <Text style={styles.message}>
        {error?.message || "An unexpected error occurred"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRetry}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    color: Colors.text,
  },
  message: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.tint,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});
