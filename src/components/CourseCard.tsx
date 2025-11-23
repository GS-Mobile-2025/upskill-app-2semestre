import React from "react";
import { View, Text } from "react-native";
import { Course } from "../types";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <View style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 }}>
      <Text style={{ fontWeight: "700" }}>{course.title}</Text>
      <Text>{course.provider} • {course.durationHours}h</Text>
    </View>
  );
}
