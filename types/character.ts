export interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  faith: number;
  boldness: number;
  wisdom: number;
  level: number;
  xp: number;
  age?: number;
  churchName?: string;
  joinDate: string;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    date: string;
  }[];
  studyTopics: {
    id: string;
    title: string;
    progress: number;
    lastStudied: string;
  }[];
}
