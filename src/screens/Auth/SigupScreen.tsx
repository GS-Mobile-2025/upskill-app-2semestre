import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function SignupScreen() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    await login({ id: "u2", name: name || "Novo", email, skills: [] });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 28, marginBottom: 12 }}>Criar Conta</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 12, padding: 8 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 12, padding: 8 }} />
      <TouchableOpacity onPress={handleSignup} style={{ backgroundColor: "#2b6cb0", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "#fff" }}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
