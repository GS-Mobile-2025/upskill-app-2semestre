import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { BlurView } from "expo-blur";
import { Colors, BorderRadius, Shadows } from "@/src/constants/theme";

interface CardProps {
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  children?: React.ReactNode;
  useGlass?: boolean;
}

export function Card({
  children,
  style,
  useGlass = true,
  intensity = 85,
}: CardProps) {
  if (useGlass) {
    return (
      <BlurView intensity={intensity} tint="light" style={styles.blur}>
        <View style={[styles.glassCard, style]}>
          {children}
        </View>
      </BlurView>
    );
  }

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  card: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: BorderRadius.lg,
    ...Shadows.card,
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    ...Shadows.card,
  },
});
