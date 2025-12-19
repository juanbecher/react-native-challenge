import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CenterProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  full?: boolean;
}

export default function Center({ children, style, full }: CenterProps) {
  return (
    <View style={[styles.center, full && styles.full, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  full: {
    minHeight: 200,
  },
});
