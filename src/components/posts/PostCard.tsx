import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Post } from "../../api/posts";
import { Colors } from "../../constants/Colors";
import { Config } from "../../constants/Config";
import FavoriteButton from "../ui/buttons/FavoriteButton";

interface PostCardProps {
  post: Post;
  isFavorite: boolean;
  onToggleFavorite: (post: Post) => void;
}

export default function PostCard({
  post,
  isFavorite,
  onToggleFavorite,
}: PostCardProps) {
  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "/posts/[id]",
          params: { id: post.id.toString() },
        }}
      >
        <View style={styles.content}>
          <Image
            source={{
              uri: `${Config.IMAGE_BASE_URL}/${post.id}/400/200`,
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body} numberOfLines={2}>
            {post.content}
          </Text>
        </View>
      </Link>
      <FavoriteButton
        isFavorite={isFavorite}
        onPress={() => onToggleFavorite(post)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    overflow: "hidden",
  },
  content: {
    padding: 12,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.text,
  },
  body: {
    color: Colors.text,
  },
});
