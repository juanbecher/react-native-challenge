import { Ionicons } from "@expo/vector-icons";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

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
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "#ff4444" : "#000"}
      />
    </TouchableOpacity>
  );
}
