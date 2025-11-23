import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22 }}>Perfil</Text>
      <Text style={{ marginTop: 12 }}>Nome: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Skills: {user?.skills.join(", ")}</Text>

      <TouchableOpacity onPress={() => logout()} style={{ marginTop: 20, backgroundColor: "#e53e3e", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "#fff" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
