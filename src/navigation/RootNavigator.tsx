import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./stacks/AuthSStack";
import MainTabs from "./stacks/MainTabs";
import JobDetailsScreen from "../screens/Home/JobDetailsScreen";
import { useAuth } from "../contexts/AuthContext";

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  JobDetails: { jobId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  // while loading you could return a splash
  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // Auth stack (login / signup)
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen
            name="JobDetails"
            component={JobDetailsScreen}
            options={{ headerShown: true, title: "Detalhes da Vaga" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
