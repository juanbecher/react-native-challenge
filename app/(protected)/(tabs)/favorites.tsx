import { Colors } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostList from "../../../src/components/posts/PostList";
import { useFavorites } from "../../../src/context/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites, isLoading } = useFavorites();

  return (
    <SafeAreaView style={styles.safeArea}>
      <PostList
        posts={favorites}
        isLoading={isLoading}
        isError={false}
        emptyMessage="No favorites yet."
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
});
