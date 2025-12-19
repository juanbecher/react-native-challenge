import { useFavorites } from "@/src/context/FavoritesContext";
import { mockPost } from "@/src/mocks/posts";
import { AppProviders } from "@/src/providers/AppProviders";
import { storage } from "@/src/services/storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import * as SecureStore from "expo-secure-store";

describe("FavoritesContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppProviders>{children}</AppProviders>
  );

  test("adds a post to favorites", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite(mockPost);
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([mockPost]);
    });
  });

  test("removes a post from favorites if already favorited", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite(mockPost);
    });

    act(() => {
      result.current.toggleFavorite(mockPost);
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });
  });

  test("returns true if post is favorite", async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite(mockPost);
    });

    await waitFor(() => {
      expect(result.current.isFavorite(mockPost.id)).toBe(true);
      expect(result.current.isFavorite(2)).toBe(false);
    });
  });

  test("loads favorites for logged user", async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue("testuser");
    (storage.getFavorites as jest.Mock).mockResolvedValue([{ id: 1 }]);

    const { result } = renderHook(() => useFavorites(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([{ id: 1 }]);
    });
  });
});
