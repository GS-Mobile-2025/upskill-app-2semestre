import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { fetchRoadmap } from "../services/aiService";
import { RoadmapItem } from "../types";
import { useAuth } from "../contexts/AuthContext";

export default function MiniRoadmap() {
  const { user } = useAuth();
  const [items, setItems] = useState<RoadmapItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetchRoadmap(user?.skills || []);
      setItems(res.slice(0, 3));
    })();
  }, [user]);

  return (
    <FlatList
      data={items}
      horizontal
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginRight: 8 }}>
          <Text style={{ fontWeight: "600" }}>{item.title}</Text>
          <Text>Mês {item.month}</Text>
        </View>
      )}
    />
  );
}
