import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Card } from "@/src/components/Card";
import { ScreenScrollView } from "@/src/components/ScreenScrollView";
import { SkillTag } from "@/src/components/SkillTag";
import { Avatar } from "@/src/components/Avatar";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "@/src/hooks/useTheme";
import { Colors, Spacing, BorderRadius, Typography } from "@/src/constants/theme";

export default function UserProfileScreen() {
  const { user, logout, updateUser } = useAuth();
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedRole, setEditedRole] = useState(user?.role || "");
  const [editedBio, setEditedBio] = useState(user?.bio || "");

  const handleLogout = async () => {
    try {
      console.log("Iniciando logout...");
      await logout();
      console.log("Logout concluído com sucesso");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleSave = async () => {
    if (!editedName || !editedRole) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios");
      return;
    }

    await updateUser({
      name: editedName,
      role: editedRole,
      bio: editedBio,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || "");
    setEditedRole(user?.role || "");
    setEditedBio(user?.bio || "");
    setIsEditing(false);
  };

  return (
    <ScreenScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: tabBarHeight + Spacing.xl },
      ]}
    >
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar name={user?.name} size={100} />
          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => (isEditing ? handleCancel() : setIsEditing(true))}
          >
            <Feather
              name={isEditing ? "x" : "edit-2"}
              size={16}
              color={isEditing ? theme.textSecondary : Colors.light.primary}
            />
            <Text
              style={[
                styles.editButtonText,
                { color: isEditing ? theme.textSecondary : Colors.light.primary },
              ]}
            >
              {isEditing ? "Cancelar" : "Editar Perfil"}
            </Text>
          </Pressable>
        </View>

        {isEditing ? (
          <View style={styles.form}>
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: "#000000" }]}>Nome</Text>
              <TextInput
                style={[styles.formInput, { color: "#000000", borderColor: "#E5E7EB" }]}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Seu nome"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: "#000000" }]}>Cargo Atual</Text>
              <TextInput
                style={[styles.formInput, { color: "#000000", borderColor: "#E5E7EB" }]}
                value={editedRole}
                onChangeText={setEditedRole}
                placeholder="Seu cargo"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: "#000000" }]}>Bio</Text>
              <TextInput
                style={[
                  styles.formInput,
                  styles.formTextArea,
                  { color: "#000000", borderColor: "#E5E7EB" },
                ]}
                value={editedBio}
                onChangeText={setEditedBio}
                placeholder="Sobre você"
                placeholderTextColor={theme.textSecondary}
                multiline
                numberOfLines={3}
              />
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text style={[styles.name, { color: "#000000" }]}>{user?.name}</Text>
            <Text style={[styles.role, { color: "#000000" }]}>
              {user?.role}
            </Text>
            <Text style={[styles.bio, { color: "#000000" }]}>{user?.bio}</Text>
          </View>
        )}
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: "#F3E8FF" }]}>
            <Feather name="award" size={20} color={Colors.light.primary} />
          </View>
          <Text style={[styles.statValue, { color: "#000000" }]}>
            {user?.completedCourses}
          </Text>
          <Text style={[styles.statLabel, { color: "#000000" }]}>
            Cursos Concluídos
          </Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: "#DBEAFE" }]}>
            <Feather name="briefcase" size={20} color={Colors.light.primaryBlue} />
          </View>
          <Text style={[styles.statValue, { color: "#000000" }]}>
            {user?.yearsExperience} anos
          </Text>
          <Text style={[styles.statLabel, { color: "#000000" }]}>
            Experiência
          </Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: "#D1FAE5" }]}>
            <Feather name="calendar" size={20} color={Colors.light.success} />
          </View>
          <Text style={[styles.statValue, { color: "#000000" }]}>
            {user?.memberSince}
          </Text>
          <Text style={[styles.statLabel, { color: "#000000" }]}>
            Membro desde
          </Text>
        </Card>
      </View>

      <Card style={styles.skillsCard}>
        <Text style={[styles.sectionTitle, { color: "#000000" }]}>
          Minhas Habilidades
        </Text>
        <View style={styles.skillsContainer}>
          {user?.skills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
          <Pressable style={styles.addSkillButton}>
            <Feather name="plus" size={14} color={Colors.light.primary} />
            <Text style={[styles.addSkillText, { color: Colors.light.primary }]}>
              Adicionar habilidade
            </Text>
          </Pressable>
        </View>
      </Card>

      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && { opacity: 0.8 },
        ]}
        onPress={handleLogout}
      >
        <Feather name="log-out" size={20} color={Colors.light.error} />
        <Text style={[styles.logoutText, { color: Colors.light.error }]}>Sair</Text>
      </Pressable>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  profileCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.lg,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  editButtonText: {
    ...Typography.small,
    fontWeight: "600",
  },
  name: {
    ...Typography.h1,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  role: {
    ...Typography.body,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  bio: {
    ...Typography.small,
    textAlign: "center",
  },
  form: {
    gap: Spacing.lg,
  },
  formField: {
    gap: Spacing.xs,
  },
  formLabel: {
    ...Typography.small,
    fontWeight: "600",
  },
  formInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    ...Typography.body,
  },
  formTextArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
  },
  saveButtonText: {
    ...Typography.body,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: Spacing.lg,
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statValue: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.tiny,
    textAlign: "center",
  },
  skillsCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h2,
    marginBottom: Spacing.lg,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  addSkillButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderStyle: "dashed",
  },
  addSkillText: {
    ...Typography.tiny,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.light.error,
  },
  logoutText: {
    ...Typography.body,
    fontWeight: "600",
  },
});
