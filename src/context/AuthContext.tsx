import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

const AUTH_TOKEN_KEY = "user_token";

interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const userName = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);

        if (userName) {
          setUser(userName);
        }
      } catch (e) {
        console.error("Failed to load auth token", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, username);
      setUser(username);
    } catch (e) {
      console.error("Failed to sign in", e);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      setUser(null);
    } catch (e) {
      console.error("Failed to delete auth token", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
