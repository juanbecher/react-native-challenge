import { View } from "react-native";
import PostList from "../../src/components/posts/PostList";
import { useFavorites } from "../../src/context/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <PostList
        posts={favorites}
        isLoading={false}
        isError={false}
        emptyMessage="No favorites yet."
      />
    </View>
  );
}
