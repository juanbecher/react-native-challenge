import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Colors } from "../../constants/Colors";

export default function TextInput(props: TextInputProps) {
  return <RNTextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    borderColor: Colors.border,
    color: Colors.text,
  },
});
