import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Colors, Spacing, BorderRadius, Shadows } from "@/src/constants/theme";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  useGlassEffect?: boolean;
}

export function GradientButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  useGlassEffect = false,
}: GradientButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.container,
        style,
        (pressed || disabled) && styles.pressed,
      ]}
    >
      {useGlassEffect ? (
        <BlurView intensity={80} tint="light" style={styles.blur}>
          <LinearGradient
            colors={[
              Colors.light.primary,
              Colors.light.primaryBlue,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
          </LinearGradient>
        </BlurView>
      ) : (
        <LinearGradient
          colors={[Colors.light.primary, Colors.light.primaryBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={[styles.text, textStyle]}>{title}</Text>
          )}
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
    ...Shadows.button,
  },
  blur: {
    borderRadius: BorderRadius.sm,
  },
  gradient: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: Spacing.buttonHeight,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.8,
  },
});
