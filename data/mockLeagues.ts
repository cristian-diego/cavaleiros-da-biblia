export interface League {
  id: string;
  name: string;
  icon: string;
  minXp: number;
  maxXp: number;
  color: string;
  description: string;
}

export const leagues: League[] = [
  {
    id: 'bronze',
    name: 'Liga Bronze',
    icon: '🥉',
    minXp: 0,
    maxXp: 1000,
    color: '#CD7F32',
    description: 'Iniciante na jornada',
  },
  {
    id: 'silver',
    name: 'Liga Prata',
    icon: '🥈',
    minXp: 1001,
    maxXp: 2000,
    color: '#C0C0C0',
    description: 'Cavaleiro em ascensão',
  },
  {
    id: 'gold',
    name: 'Liga Ouro',
    icon: '🥇',
    minXp: 2001,
    maxXp: 3000,
    color: '#FFD700',
    description: 'Mestre dos cavaleiros',
  },
  {
    id: 'platinum',
    name: 'Liga Platina',
    icon: '💎',
    minXp: 3001,
    maxXp: 4000,
    color: '#E5E4E2',
    description: 'Lenda dos cavaleiros',
  },
  {
    id: 'diamond',
    name: 'Liga Diamante',
    icon: '✨',
    minXp: 4001,
    maxXp: 5000,
    color: '#B9F2FF',
    description: 'Guardião supremo',
  },
];
