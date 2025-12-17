import { TextInput as RNTextInput, TextInputProps } from "react-native";

export default function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      {...props}
      style={{
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 12,
      }}
    />
  );
}
