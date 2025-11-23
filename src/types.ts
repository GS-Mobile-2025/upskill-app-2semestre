export type Course = {
  id: string;
  title: string;
  provider: string;
  durationHours: number;
};

export type RoadmapItem = {
  id: string;
  title: string;
  month: number;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  requiredSkills: string[];
  compatibility: number;
  description?: string;
};
