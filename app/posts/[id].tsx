import { fetchPostById } from "@/src/api/post";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const postId = parseInt(id || "0", 10);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Image
            source={{
              uri: `https://picsum.photos/seed/${post.id}/800/400`,
            }}
            style={{
              width: "100%",
              height: 250,
              borderRadius: 8,
              marginBottom: 16,
            }}
            resizeMode="cover"
          />

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

          <View
            style={{
              flexDirection: "row",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {post.category && (
              <View
                style={{
                  backgroundColor: "#e3f2fd",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                }}
              >
                <Text style={{ color: "#1976d2", fontSize: 12 }}>
                  {post.category}
                </Text>
              </View>
            )}
            {post.status && (
              <View
                style={{
                  backgroundColor: "#f3e5f5",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                }}
              >
                <Text style={{ color: "#7b1fa2", fontSize: 12 }}>
                  {post.status}
                </Text>
              </View>
            )}
          </View>

          {post.publishedAt && (
            <Text
              style={{
                color: "#666",
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              Published: {new Date(post.publishedAt).toLocaleDateString()}
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
