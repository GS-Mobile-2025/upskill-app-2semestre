import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Course } from "../../types";
import { fetchRecommendedCourses } from "../../services/aiService";
import { useAuth } from "../../contexts/AuthContext";
import CourseCard from "../../components/CourseCard";

export default function CoursesScreen() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetchRecommendedCourses(user?.skills || []);
      setCourses(res);
    })();
  }, [user]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Cursos Recomendados</Text>
      <FlatList
        data={courses}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <CourseCard course={item} />}
      />
    </View>
  );
}
