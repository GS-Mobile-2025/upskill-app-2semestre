import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { fetchRecommendedCourses } from "../services/aiService";
import { Course } from "../types";
import CourseCard from "./CourseCard";
import { useAuth } from "../contexts/AuthContext";

export default function RecommendationsCard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetchRecommendedCourses(user?.skills || []);
      setCourses(res);
    })();
  }, [user]);

  return (
    <View style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}>
      <Text style={{ fontWeight: "700", marginBottom: 8 }}>Sugestões de Cursos</Text>
      <FlatList data={courses} horizontal keyExtractor={c => c.id} renderItem={({item}) => <CourseCard course={item} />} />
    </View>
  );
}
