export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  matchPercentage: number;
  status?: "completed" | "in-progress" | "not-started";
  image: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  matchPercentage: number;
  skills: string[];
  logo: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  status: "completed" | "in-progress";
}

export interface Insight {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Python para Análise de Dados",
    description: "Aprenda Python e bibliotecas essenciais para análise de dados",
    duration: "8 semanas",
    skills: ["Python", "Pandas", "NumPy"],
    matchPercentage: 92,
    status: "in-progress",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    description: "Fundamentos de aprendizado de máquina e IA",
    duration: "10 semanas",
    skills: ["Machine Learning", "Python", "TensorFlow"],
    matchPercentage: 88,
    status: "not-started",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
  },
  {
    id: "3",
    title: "Data Visualization com PowerBI",
    description: "Crie dashboards e visualizações impactantes",
    duration: "6 semanas",
    skills: ["PowerBI", "Data Visualization", "Analytics"],
    matchPercentage: 95,
    status: "not-started",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
  },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Analista de Marketing Digital Sênior",
    company: "Tech Solutions",
    location: "São Paulo, SP",
    salaryRange: "R$ 8.000 - R$ 12.000",
    matchPercentage: 87,
    skills: ["Marketing Digital", "SEO", "Google Ads", "Analytics"],
    logo: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    title: "Especialista em Growth Marketing",
    company: "StartupXYZ",
    location: "Remoto",
    salaryRange: "R$ 10.000 - R$ 15.000",
    matchPercentage: 82,
    skills: ["Growth Hacking", "SEO", "Marketing", "Analytics"],
    logo: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    title: "Coordenador de Marketing",
    company: "E-commerce Brasil",
    location: "São Paulo, SP",
    salaryRange: "R$ 7.000 - R$ 10.000",
    matchPercentage: 78,
    skills: ["Marketing Digital", "Gestão de Equipe", "E-commerce"],
    logo: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "4",
    title: "Analista de Dados de Marketing",
    company: "Data Insights",
    location: "Remoto",
    salaryRange: "R$ 9.000 - R$ 13.000",
    matchPercentage: 85,
    skills: ["Marketing Digital", "Analytics", "SQL", "Python"],
    logo: "https://i.pravatar.cc/100?img=4",
  },
];

export const mockRoadmap: RoadmapItem[] = [
  {
    id: "1",
    title: "Fundamentos de Análise de Dados",
    description: "Aprenda os conceitos básicos de análise de dados e estatística",
    duration: "4 semanas",
    skills: ["Excel", "Estatística Básica", "SQL"],
    status: "completed",
  },
  {
    id: "2",
    title: "Python para Dados",
    description: "Domine Python e bibliotecas essenciais como Pandas e NumPy",
    duration: "8 semanas",
    skills: ["Python", "Pandas", "NumPy"],
    status: "in-progress",
  },
  {
    id: "3",
    title: "Visualização de Dados",
    description: "Crie dashboards e visualizações impactantes",
    duration: "6 semanas",
    skills: ["PowerBI", "Tableau", "Data Visualization"],
    status: "in-progress",
  },
];

export const mockInsights: Insight[] = [
  {
    id: "1",
    icon: "trending-up",
    title: "Tendência de Mercado",
    description:
      "Profissionais com habilidades em IA estão em alta demanda, com aumento de 150% nas vagas nos últimos 6 meses.",
  },
  {
    id: "2",
    icon: "target",
    title: "Suas Lacunas de Habilidades",
    description:
      "Desenvolver conhecimentos em Python e Machine Learning pode aumentar seu match em 15-20% nas vagas de interesse.",
  },
  {
    id: "3",
    icon: "award",
    title: "Recomendação IA",
    description:
      "Com base no seu perfil, cursos de análise de dados combinados com suas habilidades de marketing podem abrir novas oportunidades.",
  },
];
