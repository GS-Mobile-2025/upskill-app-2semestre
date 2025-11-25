import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Card } from "@/src/components/Card";
import { ScreenScrollView } from "@/src/components/ScreenScrollView";
import { MatchBadge } from "@/src/components/MatchBadge";
import { SkillTag } from "@/src/components/SkillTag";
import { useTheme } from "@/src/hooks/useTheme";
import { Colors, Spacing, BorderRadius, Typography } from "@/src/constants/theme";
import { mockCourses, mockInsights } from "@/src/data/mockData";

export default function RecommendationsScreen() {
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"match" | "duration">("match");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const uniqueSkills = [...new Set(mockCourses.flatMap(c => c.skills))];

  const filteredCourses = useMemo(() => {
    let result = mockCourses.filter((course) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.skills.some(s => s.toLowerCase().includes(searchLower));

      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.every(skill => course.skills.includes(skill));

      return matchesSearch && matchesSkills;
    });

    return result.sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "duration") {
        const durationA = parseInt(a.duration.split(" ")[0]);
        const durationB = parseInt(b.duration.split(" ")[0]);
        return durationA - durationB;
      }
      return 0;
    });
  }, [searchQuery, selectedSkills, sortBy]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setSortBy("match");
  };

  return (
    <ScreenScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: tabBarHeight + Spacing.xl },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Feather name="star" size={24} color={Colors.light.primary} />
        </View>
        <Text style={[styles.title, { color: "#FFFFFF" }]}>
          Recomendações Personalizadas
        </Text>
        <Text style={[styles.subtitle, { color: "#FFFFFF" }]}>
          Nossa IA analisou seu perfil e selecionou os melhores cursos
        </Text>
      </View>

      <View style={[styles.section, { marginTop: Spacing["2xl"] }]}>
        <Text style={[styles.sectionTitle, { color: "#FFFFFF", marginBottom: Spacing.xl }]}>
          Insights da IA
        </Text>
        {mockInsights.map((insight) => (
          <Card key={insight.id} style={[styles.insightCard, { marginBottom: Spacing["2xl"] }]}>
            <View
              style={[
                styles.insightIconContainer,
                {
                  backgroundColor:
                    insight.icon === "trending-up"
                      ? "#F3E8FF"
                      : insight.icon === "target"
                      ? "#DBEAFE"
                      : "#FEF3C7",
                },
              ]}
            >
              <Feather
                name={insight.icon as any}
                size={20}
                color={
                  insight.icon === "trending-up"
                    ? Colors.light.primary
                    : insight.icon === "target"
                    ? Colors.light.primaryBlue
                    : Colors.light.warning
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.insightTitle, { color: "#000000" }]}>
                {insight.title}
              </Text>
              <Text style={[styles.insightDescription, { color: "#000000" }]}>
                {insight.description}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: "#FFFFFF" }]}>
          Cursos Recomendados para Você
        </Text>

        <View style={[styles.searchContainer, { borderColor: theme.border }]}>
          <Feather name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: "#000000" }]}
            placeholder="Buscar cursos..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          <Pressable 
            style={[styles.filterButton, { borderColor: Colors.light.primary }]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Feather name="sliders" size={16} color={Colors.light.primary} />
            <Text style={[styles.filterText, { color: Colors.light.primary }]}>
              Filtros
            </Text>
          </Pressable>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.sortContainer}
          >
            {["match", "duration"].map((option) => (
              <Pressable
                key={option}
                onPress={() => setSortBy(option as any)}
                style={[
                  styles.sortButton,
                  {
                    backgroundColor: sortBy === option ? Colors.light.primary : Colors.light.cardBackground,
                    borderColor: theme.border,
                  }
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    { color: sortBy === option ? "#FFFFFF" : theme.text }
                  ]}
                >
                  {option === "match" ? "Compatibilidade" : "Duração"}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {showFilters && (
          <Card style={[styles.filtersPanel, { backgroundColor: Colors.light.cardBackground }]}>
            <View style={styles.filterHeader}>
              <Text style={[styles.filterTitle, { color: "#000000" }]}>Filtrar Cursos</Text>
              <Pressable onPress={resetFilters}>
                <Text style={[styles.resetText, { color: Colors.light.primary }]}>Limpar</Text>
              </Pressable>
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterSectionTitle, { color: "#000000" }]}>Habilidades</Text>
              <View style={styles.filterOptions}>
                {uniqueSkills.map(skill => (
                  <Pressable
                    key={skill}
                    style={[
                      styles.filterOption,
                      {
                        backgroundColor: selectedSkills.includes(skill)
                          ? Colors.light.primary
                          : Colors.light.cardBackground,
                        borderColor: theme.border,
                      }
                    ]}
                    onPress={() => toggleSkill(skill)}
                  >
                    <Text
                      style={{
                        color: selectedSkills.includes(skill) ? "#FFFFFF" : theme.text,
                        ...Typography.tiny,
                      }}
                    >
                      {skill}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Card>
        )}

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} style={[styles.courseCard, { marginBottom: Spacing["2xl"] }]}>
              <Image source={{ uri: course.image }} style={styles.courseImage} />
              <View style={styles.matchBadgeContainer}>
                <MatchBadge percentage={course.matchPercentage} />
              </View>
              <View style={styles.courseContent}>
                <Text style={[styles.courseTitle, { color: "#000000" }]}>
                  {course.title}
                </Text>
                <Text style={[styles.courseDescription, { color: "#000000" }]}>
                  {course.description}
                </Text>
                <View style={styles.skillsContainer}>
                  {course.skills.map((skill) => (
                    <SkillTag key={skill} label={skill} />
                  ))}
                </View>
                <View style={styles.courseInfo}>
                  <View style={styles.courseInfoItem}>
                    <Feather name="clock" size={14} color={theme.textSecondary} />
                    <Text style={[styles.courseInfoText, { color: "#000000" }]}>
                      {course.duration}
                    </Text>
                  </View>
                  <View style={styles.courseInfoItem}>
                    <Feather name="book" size={14} color={theme.textSecondary} />
                    <Text style={[styles.courseInfoText, { color: "#000000" }]}>
                      {course.skills.length} habilidades
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <Card style={[styles.emptyState, { backgroundColor: Colors.light.cardBackground }]}>
            <Feather name="search" size={48} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: "#000000" }]}>Nenhum curso encontrado</Text>
            <Text style={[styles.emptyText, { color: "#000000" }]}>
              Tente ajustar seus filtros ou busca
            </Text>
          </Card>
        )}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.small,
    textAlign: "center",
  },
  section: {
    marginBottom: Spacing["3xl"],
  },
  sectionTitle: {
    ...Typography.h2,
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.cardBackground,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    height: Spacing.inputHeight,
    marginBottom: Spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    ...Typography.body,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  filterText: {
    ...Typography.small,
    fontWeight: "600",
  },
  sortContainer: {
    flexGrow: 1,
  },
  sortButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  sortText: {
    ...Typography.small,
    fontWeight: "600",
  },
  filtersPanel: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  filterTitle: {
    ...Typography.h3,
    fontWeight: "600",
  },
  resetText: {
    ...Typography.small,
    fontWeight: "600",
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  filterSectionTitle: {
    ...Typography.body,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  filterOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  insightCard: {
    flexDirection: "row",
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  insightTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  insightDescription: {
    ...Typography.small,
  },
  courseCard: {
    marginBottom: Spacing.lg,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: 160,
  },
  matchBadgeContainer: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
  },
  courseContent: {
    padding: Spacing.lg,
  },
  courseTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  courseDescription: {
    ...Typography.small,
    marginBottom: Spacing.md,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  courseInfo: {
    flexDirection: "row",
    gap: Spacing.lg,
  },
  courseInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  courseInfoText: {
    ...Typography.tiny,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xl,
  },
  emptyTitle: {
    ...Typography.h3,
    marginTop: Spacing.md,
    fontWeight: "600",
  },
  emptyText: {
    ...Typography.small,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
});
