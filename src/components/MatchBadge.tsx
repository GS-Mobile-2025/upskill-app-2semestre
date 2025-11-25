import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors, Spacing, BorderRadius } from "@/src/constants/theme";

interface MatchBadgeProps {
  percentage: number;
}

export function MatchBadge({ percentage }: MatchBadgeProps) {
  const isHighMatch = percentage >= 85;
  
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isHighMatch ? Colors.light.success : Colors.light.primary },
      ]}
    >
      <Feather name="trending-up" size={12} color="#FFFFFF" />
      <Text style={styles.text}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  text: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
