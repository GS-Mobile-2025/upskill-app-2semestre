import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Job } from "../../types";
import { fetchJobs } from "../../services/aiService";
import { useAuth } from "../../contexts/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootNavigator";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Main">;

export default function JobsScreen() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    (async () => {
      const res = await fetchJobs(user?.skills || []);
      setJobs(res);
    })();
  }, [user]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Vagas Compatíveis</Text>

      <FlatList
        data={jobs}
        keyExtractor={(j) => j.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("JobDetails", { jobId: item.id })}
            style={{ padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.title}</Text>
            <Text>{item.company}</Text>
            <Text style={{ marginTop: 4 }}>Compatibilidade: {item.compatibility}%</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
