import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/src/navigation/AuthNavigator";
import { Input } from "@/src/components/Input";
import { GradientButton } from "@/src/components/GradientButton";
import { useAuth } from "@/src/hooks/useAuth";
import { Spacing } from "@/src/constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      const errorMessage =
        error?.message || "Falha ao fazer login. Tente novamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }; // ← FALTAVA ESTA CHAVE!

  return (
    <LinearGradient
      colors={["#7C3AED", "#3B82F6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + Spacing.xl,
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/icon.png")}
                style={styles.logo}
              />
            </View>

            <Text style={[styles.title, { color: "#000000" }]}>
              Bem vindo de volta!
            </Text>

            <Text style={[styles.subtitle, { color: "#000000" }]}>
              Entre para continuar sua jornada de aprendizado
            </Text>
          </View>

          <View style={styles.formCard}>
            <Input
              label="Email"
              icon="mail"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textColor="#000000"
            />

            <Input
              label="Senha"
              icon="lock"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
              autoComplete="password"
              textColor="#000000"
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <GradientButton
              title="Entrar"
              onPress={handleLogin}
              loading={loading}
              style={styles.button}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não tem uma conta? </Text>

              <Pressable onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.link}>Cadastre-se</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: Spacing["2xl"],
    gap: Spacing.lg,
  },
  button: {
    marginTop: Spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.sm,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  link: {
    fontSize: 14,
    color: "#7C3AED",
    fontWeight: "600",
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
});
