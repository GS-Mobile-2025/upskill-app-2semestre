import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { fetchRoadmap } from "../../services/aiService";
import { RoadmapItem } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

export default function RoadmapScreen() {
  const { user } = useAuth();
  const [items, setItems] = useState<RoadmapItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetchRoadmap(user?.skills || []);
      setItems(res);
    })();
  }, [user]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Roadmap</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10 }}>
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text>Mês: {item.month}</Text>
          </View>
        )}
      />
    </View>
  );
}
