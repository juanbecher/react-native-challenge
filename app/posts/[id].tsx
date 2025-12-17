import { fetchPostById } from "@/src/api/post";
import FavoriteButton from "@/src/components/ui/FavoriteButton";
import { Config } from "@/src/constants/Config";
import { useFavorites } from "@/src/context/FavoritesContext";
import { formatDate } from "@/src/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const postId = parseInt(id || "0", 10);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(postId);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId && !isNaN(postId),
  });

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !post) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text style={{ color: "#d32f2f", fontSize: 16, marginBottom: 12 }}>
            Error loading post
          </Text>
          <Text
            style={{ color: "#0066cc", fontSize: 14 }}
            onPress={() => router.back()}
          >
            Go back
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["bottom", "left", "right"]}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <Image
              source={{
                uri: `${Config.IMAGE_BASE_URL}/${post.id}/800/400`,
              }}
              style={{
                width: "100%",
                height: 250,
                borderRadius: 8,
              }}
              resizeMode="cover"
            />
            <FavoriteButton
              isFavorite={favorite}
              onPress={() => toggleFavorite(post)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 20,
                padding: 8,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 12,
              color: "#000",
            }}
          >
            {post.title}
          </Text>

          {post.publishedAt && (
            <Text
              style={{
                color: "#666",
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              Published: {formatDate(post.publishedAt)}
            </Text>
          )}

          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#333",
              marginBottom: 16,
            }}
          >
            {post.content}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
