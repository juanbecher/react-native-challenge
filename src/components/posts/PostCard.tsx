import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { Post } from "../../api/post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={{
        pathname: "/posts/[id]",
        params: { id: post.id.toString() },
      }}
    >
      <View
        style={{
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          marginBottom: 12,
          borderColor: "#e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <Image
          source={{
            uri: `https://picsum.photos/seed/${post.id}/400/200`,
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
  );
}
