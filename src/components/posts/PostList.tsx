import { Post } from "@/src/api/post";
import PostCard from "@/src/components/posts/PostCard";
import { useFavorites } from "@/src/context/FavoritesContext";
import { FlatList, Text, View } from "react-native";
import PostListSkeleton from "./PostListSkeleton";

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

  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <Text style={{ color: "#d32f2f" }}>Error loading posts</Text>
      </View>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <Text style={{ color: "#666", fontSize: 18 }}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      showsVerticalScrollIndicator={true}
    />
  );
}
