import { Post } from "@/src/api/posts";
import FavoriteButton from "@/src/components/ui/buttons/FavoriteButton";
import { Colors } from "@/src/constants/Colors";
import { Config } from "@/src/constants/Config";
import { useFavorites } from "@/src/context/FavoritesContext";
import { formatDate } from "@/src/utils/date";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import LoadingIndicator from "../ui/LoadingIndicator";

interface PostDetailsViewProps {
  post?: Post;
  isLoading: boolean;
  isError: boolean;
}
export function PostDetailsView({
  post,
  isLoading,
  isError,
}: PostDetailsViewProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (isLoading) {
    return <LoadingIndicator full />;
  }

  if (isError || !post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading post</Text>
      </View>
    );
  }

  const favorite = isFavorite(post.id);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `${Config.IMAGE_BASE_URL}/${post.id}/800/400`,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <FavoriteButton
            isFavorite={favorite}
            onPress={() => toggleFavorite(post)}
          />
        </View>

        <Text style={styles.title}>{post.title}</Text>

        {post.publishedAt && (
          <Text style={styles.date}>
            Published: {formatDate(post.publishedAt)}
          </Text>
        )}

        <Text style={styles.content}>{post.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: Colors.text,
  },
  date: {
    color: Colors.secondaryText,
    fontSize: 14,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    marginBottom: 12,
  },
});
