import { fetchPostById } from "@/src/api/posts";
import { PostDetailsView } from "@/src/components/posts/PostDetailsView";
import { Colors } from "@/src/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = parseInt(id || "0", 10);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId && !isNaN(postId),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <SafeAreaView style={styles.safeAreaWhite}>
      <PostDetailsView post={post} isLoading={isLoading} isError={isError} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaWhite: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
