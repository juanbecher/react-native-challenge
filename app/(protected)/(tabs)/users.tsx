import { fetchUsers } from "@/src/api/users";
import TextInput from "@/src/components/ui/TextInput";
import UserList from "@/src/components/users/UserList";
import { Colors } from "@/src/constants/Colors";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UsersScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    staleTime: 5 * 60 * 1000,
  });

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    return data.filter((user) => {
      const searchQuery = debouncedSearch.toLowerCase();
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      return (
        fullName.includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
      );
    });
  }, [data, debouncedSearch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or email"
        />
        <UserList
          users={filteredUsers}
          isLoading={isLoading}
          isError={isError}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
