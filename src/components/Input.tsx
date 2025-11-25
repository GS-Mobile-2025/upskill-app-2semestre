import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TextInputProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors, Spacing, BorderRadius } from "@/src/constants/theme";
import { useTheme } from "@/src/hooks/useTheme";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Feather.glyphMap;
  error?: string;
  isPassword?: boolean;
  textColor?: string;
}

export function Input({
  label,
  icon,
  error,
  isPassword = false,
  textColor,
  ...props
}: InputProps) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.text }]}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && (
          <Feather
            name={icon}
            size={20}
            color={theme.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            { color: textColor || theme.text, borderColor: error ? Colors.light.error : theme.border },
          ]}
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
            hitSlop={8}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={theme.textSecondary}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: Spacing.md,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingLeft: Spacing["5xl"],
    paddingRight: Spacing.md,
    fontSize: 16,
  },
  passwordToggle: {
    position: "absolute",
    right: Spacing.md,
  },
  error: {
    fontSize: 12,
    color: Colors.light.error,
    marginTop: Spacing.xs,
  },
});
