import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Colors, BorderRadius, Typography } from "@/src/constants/theme";

interface AvatarProps {
  name?: string;
  photoUrl?: string;
  size?: number;
}

export function Avatar({ name = "", photoUrl, size = 100 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const backgroundColors = [
    "#7C3AED",
    "#3B82F6",
    "#8B5CF6",
    "#6366F1",
    "#EC4899",
  ];
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const backgroundColor =
    backgroundColors[hashCode(name) % backgroundColors.length];

  if (photoUrl) {
    return (
      <Image
        source={{ uri: photoUrl }}
        style={[styles.avatar, { width: size, height: size }]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatarContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.initials,
          { fontSize: size * 0.4, lineHeight: size * 0.4 },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: BorderRadius.full,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
});
