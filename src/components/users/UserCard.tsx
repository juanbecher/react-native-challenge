import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "../../api/users";
import { Colors } from "../../constants/Colors";
import { Config } from "../../constants/Config";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${Config.IMAGE_BASE_URL}/user-${user.id}/100/100`,
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: Colors.border,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  email: {
    color: Colors.secondaryText,
    marginBottom: 2,
  },
  phone: {
    color: Colors.secondaryText,
    fontSize: 12,
  },
});
