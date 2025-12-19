import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Post } from "../api/posts";
import { storage } from "../services/storage";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: Post[];
  toggleFavorite: (post: Post) => void;
  isFavorite: (postId: number) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const storedFavorites = await storage.getFavorites(user);
      setFavorites(storedFavorites);
      setIsLoading(false);
    };

    loadFavorites();
  }, [user]);

  const saveFavorites = async (newFavorites: Post[]) => {
    if (!user) return;
    await storage.setFavorites(user, newFavorites);
  };

  const toggleFavorite = (post: Post) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === post.id);
      const newFavorites = exists
        ? prev.filter((p) => p.id !== post.id)
        : [...prev, post];

      saveFavorites(newFavorites);
      return newFavorites;
    });
  };

  const isFavorite = (postId: number) => {
    return favorites.some((p) => p.id === postId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, isLoading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
