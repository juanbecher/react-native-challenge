import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import TextInput from "../src/components/ui/TextInput";
import { Colors } from "../src/constants/Colors";
import { useAuth } from "../src/context/AuthContext";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(protected)/(tabs)/posts");
    }
  }, [user, router]);

  const handleLogin = async () => {
    if (username.trim()) {
      await signIn(username, password);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? "Signing In..." : "Sign In"}
            onPress={handleLogin}
            disabled={!username || isLoading}
            color={Colors.tint}
          />
        </View>

        <Text style={styles.footerText}>Hint: Use any username to sign in</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 16,
  },
  footerText: {
    marginTop: 24,
    color: "#999",
    textAlign: "center",
    fontSize: 14,
  },
});
