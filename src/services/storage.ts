import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "../api/posts";

const getFavoritesKey = (userId: string) => `favorites_${userId}`;

export const storage = {
  async getFavorites(userId: string): Promise<Post[]> {
    try {
      const storedFavorites = await AsyncStorage.getItem(
        getFavoritesKey(userId)
      );
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error loading favorites from storage:", error);
      return [];
    }
  },

  async setFavorites(userId: string, favorites: Post[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        getFavoritesKey(userId),
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Error saving favorites to storage:", error);
    }
  },
};
