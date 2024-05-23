import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../const/styles";

type RegularButtonProps = {
  style?: any;
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}

export function RegularButton({ title, style, disabled, onPress }: RegularButtonProps): React.JSX.Element {
  const fn = onPress || function() { return null; }; // TODO: WTF IS THIS CRAP

  return (
    <Pressable
      disabled={disabled || false}
      style={({ pressed }) => [styles.button, style, pressed ? styles.buttonPressed : {}, disabled ? styles.buttonDisabled : {}]}
      onPress={() => fn()}>

      {({ pressed }) => (
        <Text style={[styles.text, style, { opacity: pressed ? 0.5 : 1 }]}>
          {title}
        </Text>
      )}

    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 10
  },

  buttonPressed: {
    backgroundColor: "#333",
    transform: [{ scale: 1.05 }]
  },

  buttonDisabled: {
    backgroundColor: "#ddd",
  },

  text: {
    color: Colors.buttonTextColor,
    fontWeight: "700",
    textAlign: "center",
  }
});