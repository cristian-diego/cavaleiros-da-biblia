export interface RankingUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  position: number;
  level: number;
}

export const mockWeeklyRankings: RankingUser[] = [
  {
    id: '1',
    name: 'João Silva',
    avatar: 'https://i.pravatar.cc/150?img=1',
    xp: 2500,
    position: 1,
    level: 5,
  },
  {
    id: '2',
    name: 'Maria Santos',
    avatar: 'https://i.pravatar.cc/150?img=2',
    xp: 2300,
    position: 2,
    level: 4,
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    avatar: 'https://i.pravatar.cc/150?img=3',
    xp: 2100,
    position: 3,
    level: 4,
  },
  {
    id: '4',
    name: 'Ana Costa',
    avatar: 'https://i.pravatar.cc/150?img=4',
    xp: 1900,
    position: 4,
    level: 3,
  },
  {
    id: '5',
    name: 'Lucas Pereira',
    avatar: 'https://i.pravatar.cc/150?img=5',
    xp: 1700,
    position: 5,
    level: 3,
  },
  {
    id: '6',
    name: 'Julia Ferreira',
    avatar: 'https://i.pravatar.cc/150?img=6',
    xp: 1500,
    position: 6,
    level: 3,
  },
  {
    id: '7',
    name: 'Rafael Almeida',
    avatar: 'https://i.pravatar.cc/150?img=7',
    xp: 1300,
    position: 7,
    level: 2,
  },
  {
    id: '8',
    name: 'Beatriz Souza',
    avatar: 'https://i.pravatar.cc/150?img=8',
    xp: 1100,
    position: 8,
    level: 2,
  },
  {
    id: '9',
    name: 'Gabriel Lima',
    avatar: 'https://i.pravatar.cc/150?img=9',
    xp: 900,
    position: 9,
    level: 2,
  },
  {
    id: '10',
    name: 'Isabela Santos',
    avatar: 'https://i.pravatar.cc/150?img=10',
    xp: 700,
    position: 10,
    level: 1,
  },
];
