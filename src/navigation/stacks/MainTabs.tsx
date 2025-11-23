import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/Home/HomeTabs";
import RoadmapScreen from "../../screens/Home/RoadmapScreen";
import CoursesScreen from "../../screens/Home/CoursesScreen";
import JobsScreen from "../../screens/Home/JobsScreen";
import ProfileScreen from "../../screens/Home/ProfileScreen";

export type MainTabParamList = {
  Home: undefined;
  Roadmap: undefined;
  Courses: undefined;
  Jobs: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        // customize style as needed
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Roadmap" component={RoadmapScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
