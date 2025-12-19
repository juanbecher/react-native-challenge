import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { Colors } from "../../constants/Colors";
import Center from "./Center";

interface LoadingIndicatorProps extends ActivityIndicatorProps {
  full?: boolean;
}

export default function LoadingIndicator({
  size = "large",
  color = Colors.loader,
  full = false,
  ...props
}: LoadingIndicatorProps) {
  const indicator = (
    <ActivityIndicator
      size={size}
      color={color}
      accessibilityLabel="loading-indicator"
      {...props}
    />
  );

  if (full) {
    return <Center full>{indicator}</Center>;
  }

  return indicator;
}
