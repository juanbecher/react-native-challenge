import React, { createContext, ReactNode, useContext, useState } from "react";
import { Post } from "../api/post";

interface FavoritesContextType {
  favorites: Post[];
  toggleFavorite: (post: Post) => void;
  isFavorite: (postId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Post[]>([]);

  const toggleFavorite = (post: Post) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === post.id);
      if (exists) {
        return prev.filter((p) => p.id !== post.id);
      }
      return [...prev, post];
    });
  };

  const isFavorite = (postId: number) => {
    return favorites.some((p) => p.id === postId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
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
