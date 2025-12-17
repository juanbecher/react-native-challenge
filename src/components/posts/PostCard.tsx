import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { Post } from "../../api/post";
import { Config } from "../../constants/Config";
import FavoriteButton from "../ui/FavoriteButton";

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
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 12,
        borderColor: "#e0e0e0",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <Link
        href={{
          pathname: "/posts/[id]",
          params: { id: post.id.toString() },
        }}
      >
        <View style={{ padding: 12 }}>
          <Image
            source={{
              uri: `${Config.IMAGE_BASE_URL}/${post.id}/400/200`,
            }}
            style={{
              width: "100%",
              height: 150,
              borderRadius: 6,
              marginBottom: 8,
            }}
          />
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            {post.title}
          </Text>
          <Text numberOfLines={2}>{post.content}</Text>
        </View>
      </Link>
      <FavoriteButton
        isFavorite={isFavorite}
        onPress={() => onToggleFavorite(post)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 20,
          padding: 8,
        }}
      />
    </View>
  );
}
