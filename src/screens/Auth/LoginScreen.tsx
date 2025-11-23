import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    // Mock: cria usuário com skills iniciais
    await login({ id: "u1", name: name || "Usuário", email, skills: ["Python", "SQL"] });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 28, marginBottom: 12 }}>Upskill — Login</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 12, padding: 8 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 12, padding: 8 }} />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "#2b6cb0", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "#fff" }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
