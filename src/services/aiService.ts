// Serviço que tenta espelhar a lógica do web project (mock).
// Se quiser usar os dados reais do web, eu posso transformar e importar os JSONs do /mnt/data/upskill_project/src

import { Course, Job, RoadmapItem } from "../types";

export const fetchRecommendedCourses = async (skills: string[]): Promise<Course[]> => {
  // Simulação (você pode integrar com OpenAI / API real)
  const base: Course[] = [
    { id: "c1", title: "Fundamentos de Python", provider: "Coursera", durationHours: 30 },
    { id: "c2", title: "Machine Learning Básico", provider: "Udemy", durationHours: 40 },
    { id: "c3", title: "SQL para Analistas", provider: "Alura", durationHours: 18 },
  ];
  return base;
};

export const fetchRoadmap = async (skills: string[]): Promise<RoadmapItem[]> => {
  return [
    { id: "r1", title: "Fundamentos: Python & SQL", month: 1 },
    { id: "r2", title: "Projetos Práticos (2 projetos)", month: 2 },
    { id: "r3", title: "Aprendizado em Machine Learning", month: 3 },
    { id: "r4", title: "Preparar CV e Portfólio", month: 4 },
  ];
};

export const fetchJobs = async (skills: string[]): Promise<Job[]> => {
  // Gera compatibilidade simples (mock)
  const all: Job[] = [
    { id: "j1", title: "Analista de Dados Jr", company: "Empresa A", requiredSkills: ["Python","SQL"], compatibility: 78, description: "Vaga para atuar com ETL, relatórios e dashboards." },
    { id: "j2", title: "Engenheiro ML Jr", company: "Empresa B", requiredSkills: ["Python","ML"], compatibility: 62, description: "Trabalhar com modelos supervisionados e pré-processamento." },
    { id: "j3", title: "Desenvolvedor Backend Jr", company: "Empresa C", requiredSkills: ["Node","API"], compatibility: 45, description: "APIs REST, testes e deploy." }
  ];
  return all;
};
