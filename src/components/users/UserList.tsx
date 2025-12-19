import { User } from "@/src/api/users";
import UserCard from "@/src/components/users/UserCard";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import Center from "../ui/Center";
import LoadingIndicator from "../ui/LoadingIndicator";
import Separator from "../ui/Separator";

interface UserListProps {
  users: User[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
}

export default function UserList({
  users,
  isLoading,
  isError,
  emptyMessage = "No users found",
}: UserListProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  const loadMore = () => {
    if (users && visibleCount < users.length) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  const visibleUsers = useMemo(
    () => users?.slice(0, visibleCount) || [],
    [users, visibleCount]
  );

  if (isLoading) {
    return <LoadingIndicator full />;
  }

  if (isError) {
    return (
      <Center full>
        <Text style={styles.errorText}>Error loading users</Text>
      </Center>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Center full>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </Center>
    );
  }

  return (
    <FlatList
      data={visibleUsers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <UserCard user={item} />}
      ItemSeparatorComponent={() => <Separator />}
      showsVerticalScrollIndicator={true}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      windowSize={5}
      maxToRenderPerBatch={10}
    />
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: Colors.error,
  },
  emptyText: {
    color: Colors.secondaryText,
    fontSize: 18,
  },
});
