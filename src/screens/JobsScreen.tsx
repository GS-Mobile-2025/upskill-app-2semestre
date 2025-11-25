import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Card } from "@/src/components/Card";
import { ScreenScrollView } from "@/src/components/ScreenScrollView";
import { SkillTag } from "@/src/components/SkillTag";
import { useTheme } from "@/src/hooks/useTheme";
import { Colors, Spacing, BorderRadius, Typography } from "@/src/constants/theme";
import { mockJobs } from "@/src/data/mockData";

interface Filters {
  location: string[];
  minMatch: number;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
}

export default function JobsScreen() {
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"match" | "salary" | "recent">("match");
  const [filters, setFilters] = useState<Filters>({
    location: [],
    minMatch: 0,
    salaryMin: 0,
    salaryMax: 20000,
    skills: [],
  });

  // Get unique locations and skills from jobs
  const uniqueLocations = [...new Set(mockJobs.map(j => j.location))];
  const uniqueSkills = [...new Set(mockJobs.flatMap(j => j.skills))];

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    let result = mockJobs.filter((job) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.skills.some(s => s.toLowerCase().includes(searchLower));

      // Location filter
      const matchesLocation = filters.location.length === 0 || 
        filters.location.includes(job.location);

      // Match percentage filter
      const matchesMatch = job.matchPercentage >= filters.minMatch;

      // Skills filter
      const matchesSkills = filters.skills.length === 0 ||
        filters.skills.every(skill => job.skills.includes(skill));

      // Salary filter (simple parsing)
      const salaryMin = parseInt(job.salaryRange.split(" ")[2].replace(/\./g, ""));
      const matchesSalary = salaryMin >= filters.salaryMin && salaryMin <= filters.salaryMax;

      return matchesSearch && matchesLocation && matchesMatch && matchesSkills && matchesSalary;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "salary") {
        const salaryA = parseInt(a.salaryRange.split(" ")[2].replace(/\./g, ""));
        const salaryB = parseInt(b.salaryRange.split(" ")[2].replace(/\./g, ""));
        return salaryB - salaryA;
      }
      return 0;
    });
  }, [searchQuery, filters, sortBy]);

  const toggleLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter(l => l !== location)
        : [...prev.location, location]
    }));
  };

  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: [],
      minMatch: 0,
      salaryMin: 0,
      salaryMax: 20000,
      skills: [],
    });
    setSearchQuery("");
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
        <Text style={[styles.title, { color: "#FFFFFF" }]}>Vagas Compatíveis</Text>
        <Text style={[styles.subtitle, { color: "#FFFFFF" }]}>
          {filteredJobs.length} vagas encontradas
        </Text>
      </View>

      <View style={[styles.searchContainer, { borderColor: theme.border }]}>
        <Feather name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: "#000000" }]}
          placeholder="Buscar vagas, empresas ou habilidades..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={[styles.filterRow, { marginTop: Spacing.lg, marginBottom: Spacing.lg }]}>
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
          {["match", "salary", "recent"].map((option) => (
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
                {option === "match" ? "Compatibilidade" : option === "salary" ? "Salário" : "Recente"}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {showFilters && (
        <Card style={[styles.filtersPanel, { backgroundColor: Colors.light.cardBackground, marginBottom: Spacing.xl }]}>
          <View style={styles.filterHeader}>
            <Text style={[styles.filterTitle, { color: "#000000" }]}>Filtrar Resultados</Text>
            <Pressable onPress={resetFilters}>
              <Text style={[styles.resetText, { color: Colors.light.primary }]}>Limpar</Text>
            </Pressable>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: "#000000" }]}>Localização</Text>
            <View style={styles.filterOptions}>
              {uniqueLocations.map(location => (
                <Pressable
                  key={location}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: filters.location.includes(location)
                        ? Colors.light.primary
                        : Colors.light.cardBackground,
                      borderColor: theme.border,
                    }
                  ]}
                  onPress={() => toggleLocation(location)}
                >
                  <Text
                    style={{
                      color: filters.location.includes(location) ? "#FFFFFF" : theme.text,
                      ...Typography.tiny,
                    }}
                  >
                    {location}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: "#000000" }]}>Compatibilidade Mínima</Text>
            <View style={styles.filterOptions}>
              {[70, 80, 90].map(match => (
                <Pressable
                  key={match}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: filters.minMatch === match
                        ? Colors.light.primary
                        : Colors.light.cardBackground,
                      borderColor: theme.border,
                    }
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, minMatch: match }))}
                >
                  <Text
                    style={{
                      color: filters.minMatch === match ? "#FFFFFF" : theme.text,
                      ...Typography.tiny,
                    }}
                  >
                    {match}%+
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: "#000000" }]}>Habilidades</Text>
            <View style={styles.filterOptions}>
              {uniqueSkills.slice(0, 6).map(skill => (
                <Pressable
                  key={skill}
                  style={[
                    styles.filterOption,
                    {
                      backgroundColor: filters.skills.includes(skill)
                        ? Colors.light.primary
                        : Colors.light.cardBackground,
                      borderColor: theme.border,
                    }
                  ]}
                  onPress={() => toggleSkill(skill)}
                >
                  <Text
                    style={{
                      color: filters.skills.includes(skill) ? "#FFFFFF" : theme.text,
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

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
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
              {job.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.detailsButton,
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={styles.detailsButtonText}>Ver detalhes da vaga</Text>
              <Feather name="arrow-right" size={16} color={Colors.light.primary} />
            </Pressable>
          </Card>
        ))
      ) : (
        <Card style={[styles.emptyState, { backgroundColor: Colors.light.cardBackground }]}>
          <Feather name="search" size={48} color={theme.textSecondary} />
          <Text style={[styles.emptyTitle, { color: "#000000" }]}>Nenhuma vaga encontrada</Text>
          <Text style={[styles.emptyText, { color: "#000000" }]}>
            Tente ajustar seus filtros ou busca
          </Text>
          <Pressable 
            style={[styles.resetButton, { backgroundColor: Colors.light.primary }]}
            onPress={resetFilters}
          >
            <Text style={styles.resetButtonText}>Limpar Filtros</Text>
          </Pressable>
        </Card>
      )}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.small,
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
    width: 56,
    height: 56,
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
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  detailsButtonText: {
    ...Typography.body,
    color: Colors.light.primary,
    fontWeight: "600",
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
  resetButton: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  resetButtonText: {
    ...Typography.body,
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  },
});
