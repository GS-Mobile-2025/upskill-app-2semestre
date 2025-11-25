import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors, Spacing, BorderRadius } from "@/src/constants/theme";

interface SkillTagProps {
  label: string;
  onRemove?: () => void;
  removable?: boolean;
}

export function SkillTag({ label, onRemove, removable = false }: SkillTagProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {removable && onRemove && (
        <Pressable onPress={onRemove} hitSlop={8}>
          <Feather name="x" size={14} color={Colors.light.primary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    backgroundColor: "transparent",
    gap: Spacing.xs,
  },
  text: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: "500",
  },
});
