import { fetchPosts } from "@/src/api/post";
import PostList from "@/src/components/posts/PostList";
import TextInput from "@/src/components/ui/TextInput";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostsScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    staleTime: 5 * 60 * 1000,
  });

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    return data.filter((post) => {
      const searchQuery = debouncedSearch.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery)
      );
    });
  }, [data, debouncedSearch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>News Feed</Text>
        </View>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by post title or content"
        />
        <PostList
          posts={filteredPosts}
          isLoading={isLoading}
          isError={isError}
        />
      </View>
    </SafeAreaView>
  );
}
