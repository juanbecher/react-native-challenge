import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../constants/Colors";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function FavoriteButton({
  isFavorite,
  onPress,
  style,
}: FavoriteButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.favoriteButton, style]}
      testID="favorite-button"
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? Colors.heart : Colors.heartEmpty}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
});
