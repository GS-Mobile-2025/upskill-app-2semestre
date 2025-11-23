import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { fetchJobs } from "../../services/aiService";
import { Job } from "../../types";

type RouteProps = RouteProp<RootStackParamList, "JobDetails">;

export default function JobDetailsScreen() {
  const route = useRoute<RouteProps>();
  const { jobId } = route.params;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    (async () => {
      const all = await fetchJobs([]);
      const found = all.find((j) => j.id === jobId) || null;
      setJob(found);
    })();
  }, [jobId]);

  if (!job) return <View style={{ padding: 16 }}><Text>Carregando...</Text></View>;

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>{job.title}</Text>
      <Text style={{ marginTop: 8 }}>{job.company}</Text>
      <Text style={{ marginTop: 8 }}>Compatibilidade: {job.compatibility}%</Text>
      <Text style={{ marginTop: 12 }}>{job.description}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Candidatar-se" onPress={() => alert("Candidatura enviada (mock)")} />
      </View>
    </ScrollView>
  );
}
