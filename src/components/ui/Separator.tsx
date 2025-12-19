import { View } from "react-native";

interface SeparatorProps {
  height?: number;
}

export default function Separator({ height = 12 }: SeparatorProps) {
  return <View style={{ height }} />;
}
