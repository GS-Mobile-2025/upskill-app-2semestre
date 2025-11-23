import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import RecommendationsCard from "../../components/RecommendationsCard";
import MiniRoadmap from "../../components/MiniRoadmap";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>Bem-vindo, {user?.name}</Text>

      <RecommendationsCard />

      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 8 }}>Roadmap Rápido</Text>
      <MiniRoadmap />
    </ScrollView>
  );
}
