import { Post } from "@/src/api/posts";
import PostCard from "@/src/components/posts/PostCard";
import { useFavorites } from "@/src/context/FavoritesContext";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import Center from "../ui/Center";
import LoadingIndicator from "../ui/LoadingIndicator";
import Separator from "../ui/Separator";

interface PostListProps {
  posts: Post[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
}

export default function PostList({
  posts,
  isLoading,
  isError,
  emptyMessage = "No posts found",
}: PostListProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const [visibleCount, setVisibleCount] = useState(10);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visiblePosts = useMemo(
    () => posts?.slice(0, visibleCount) || [],
    [posts, visibleCount]
  );

  if (isLoading) {
    return <LoadingIndicator full />;
  }

  if (isError) {
    return (
      <Center full>
        <Text style={styles.errorText}>Error loading posts</Text>
      </Center>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Center full>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </Center>
    );
  }

  return (
    <FlatList
      data={visiblePosts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      showsVerticalScrollIndicator={true}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      windowSize={5}
      maxToRenderPerBatch={10}
    />
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: Colors.error,
  },
  emptyText: {
    color: Colors.secondaryText,
    fontSize: 18,
  },
});
