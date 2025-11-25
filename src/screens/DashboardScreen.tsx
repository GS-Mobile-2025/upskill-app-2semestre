import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Card } from "@/src/components/Card";
import { ScreenScrollView } from "@/src/components/ScreenScrollView";
import { SkillTag } from "@/src/components/SkillTag";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "@/src/hooks/useTheme";
import { Colors, Spacing, BorderRadius, Typography } from "@/src/constants/theme";
import { mockCourses, mockRoadmap, mockJobs } from "@/src/data/mockData";

export default function DashboardScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();

  const progressPercentage = 68;
  const coursesInProgress = mockCourses.filter((c) => c.status === "in-progress");
  const compatibleJobs = mockJobs.slice(0, 3);

  const glassIntensity = 80;

  return (
    <ScreenScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: tabBarHeight + Spacing.xl },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: "#FFFFFF" }]}>
            Olá, {user?.name?.split(" ")[0]}!
          </Text>
          <Text style={[styles.subtitle, { color: "#FFFFFF" }]}>
            Continue sua jornada de aprendizado e descubra novas oportunidades
          </Text>
        </View>
        <Image source={{ uri: user?.photo }} style={styles.avatar} />
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard} intensity={glassIntensity}>
          <View style={[styles.iconContainer, { backgroundColor: "#F3E8FF" }]}>
            <Feather name="trending-up" size={20} color={Colors.light.primary} />
          </View>
          <Text style={[styles.statLabel, { color: "#000000" }]}>
            Progresso Geral
          </Text>
          <Text style={[styles.statValue, { color: "#000000" }]}>
            {progressPercentage}%
          </Text>
        </Card>

        <Card style={styles.statCard} intensity={glassIntensity}>
          <View style={[styles.iconContainer, { backgroundColor: "#DBEAFE" }]}>
            <Feather name="book-open" size={20} color={Colors.light.primaryBlue} />
          </View>
          <Text style={[styles.statLabel, { color: "#000000" }]}>
            Cursos em Andamento
          </Text>
          <Text style={[styles.statValue, { color: "#000000" }]}>
            {coursesInProgress.length} cursos
          </Text>
        </Card>

        <Card style={styles.statCard} intensity={glassIntensity}>
          <View style={[styles.iconContainer, { backgroundColor: "#D1FAE5" }]}>
            <Feather name="briefcase" size={20} color={Colors.light.success} />
          </View>
          <Text style={[styles.statLabel, { color: "#000000" }]}>
            Vagas Compatíveis
          </Text>
          <Text style={[styles.statValue, { color: "#000000" }]}>
            {mockJobs.length} vagas
          </Text>
        </Card>
      </View>

      <View style={[styles.section, { marginTop: Spacing["2xl"] }]}>
        <Text style={[styles.sectionTitle, { color: "#FFFFFF", marginBottom: Spacing.xl }]}>
          Seu Roadmap de Aprendizado
        </Text>
        {mockRoadmap.slice(0, 2).map((item) => (
          <Card key={item.id} style={[styles.roadmapCard, { marginBottom: Spacing["2xl"] }]} intensity={glassIntensity}>
            <View style={styles.roadmapHeader}>
              <View style={{ flex: 1 }}>
                <View style={styles.roadmapTop}>
                  <Text style={[styles.roadmapTitle, { color: "#000000" }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.roadmapDuration, { color: "#000000" }]}>
                    {item.duration}
                  </Text>
                </View>
                <Text style={[styles.roadmapDescription, { color: "#000000" }]}>
                  {item.description}
                </Text>
              </View>
              <View
                style={[
                  styles.statusIcon,
                  {
                    backgroundColor:
                      item.status === "completed"
                        ? Colors.light.success
                        : Colors.light.warning,
                  },
                ]}
              >
                <Feather
                  name={item.status === "completed" ? "check" : "clock"}
                  size={16}
                  color="#FFFFFF"
                />
              </View>
            </View>
            <View style={styles.skillsContainer}>
              {item.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </View>
            {item.status === "completed" && (
              <View style={styles.completedBadge}>
                <Feather name="check-circle" size={14} color={Colors.light.success} />
                <Text style={[styles.completedText, { color: Colors.light.success }]}>
                  Concluído
                </Text>
              </View>
            )}
          </Card>
        ))}
      </View>

      <View style={[styles.section, { marginTop: Spacing["2xl"] }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: "#FFFFFF", marginBottom: Spacing.xl }]}>
            Vagas Compatíveis
          </Text>
          <Pressable>
            <Text style={[styles.seeAll, { color: Colors.light.primary }]}>
              Ver todas
            </Text>
          </Pressable>
        </View>
        {compatibleJobs.map((job) => (
          <Card key={job.id} style={[styles.jobCard, { marginBottom: Spacing["2xl"] }]}>
            <View style={styles.jobHeader}>
              <Image source={{ uri: job.logo }} style={styles.jobLogo} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.jobTitle, { color: "#000000" }]}>
                  {job.title}
                </Text>
                <Text style={[styles.jobCompany, { color: "#000000" }]}>
                  {job.company}
                </Text>
              </View>
              <View
                style={[
                  styles.matchBadge,
                  {
                    backgroundColor:
                      job.matchPercentage >= 85
                        ? Colors.light.success
                        : Colors.light.primary,
                  },
                ]}
              >
                <Feather name="trending-up" size={12} color="#FFFFFF" />
                <Text style={styles.matchText}>{job.matchPercentage}%</Text>
              </View>
            </View>
            <View style={styles.jobInfo}>
              <View style={styles.jobInfoItem}>
                <Feather name="map-pin" size={14} color={theme.textSecondary} />
                <Text style={[styles.jobInfoText, { color: "#000000" }]}>
                  {job.location}
                </Text>
              </View>
              <View style={styles.jobInfoItem}>
                <Feather name="dollar-sign" size={14} color={theme.textSecondary} />
                <Text style={[styles.jobInfoText, { color: "#000000" }]}>
                  {job.salaryRange}
                </Text>
              </View>
            </View>
            <View style={styles.skillsContainer}>
              {job.skills.slice(0, 3).map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </View>
          </Card>
        ))}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  greeting: {
    ...Typography.h1,
  },
  subtitle: {
    ...Typography.small,
    marginTop: Spacing.xs,
    maxWidth: "80%",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  statCard: {
    flex: 1,
    padding: Spacing.lg,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statLabel: {
    ...Typography.tiny,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.h3,
  },
  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h2,
  },
  seeAll: {
    ...Typography.small,
    fontWeight: "600",
  },
  roadmapCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  roadmapHeader: {
    flexDirection: "row",
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  roadmapTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xs,
  },
  roadmapTitle: {
    ...Typography.h3,
    flex: 1,
  },
  roadmapDuration: {
    ...Typography.tiny,
  },
  roadmapDescription: {
    ...Typography.small,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  completedText: {
    ...Typography.small,
    fontWeight: "600",
  },
  jobCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  jobHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  jobLogo: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
  },
  jobTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  jobCompany: {
    ...Typography.small,
  },
  matchBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  matchText: {
    ...Typography.tiny,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  jobInfo: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  jobInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  jobInfoText: {
    ...Typography.tiny,
  },
});

